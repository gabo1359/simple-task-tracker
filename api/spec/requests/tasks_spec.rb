require 'rails_helper'

RSpec.describe "TasksController", type: :request do
  let(:api_key) { ENV.fetch('API_KEY', 'test-api-key') }
  let(:headers) { { 'Authorization' => "Bearer #{api_key}" } }

  describe "GET /tasks" do
    context "when tasks exist" do
      before do
        3.times { |i| Task.create!(description: "Task #{i + 1}") }
      end

      it "returns all tasks" do
        get("/tasks", headers:)
        
        expect(response).to have_http_status(:ok)
        json_response = JSON.parse(response.body)
        expect(json_response.length).to eq(3)
      end

      it "returns tasks ordered by created_at desc" do
        get("/tasks", headers:)
        
        json_response = JSON.parse(response.body)
        expect(json_response[0]["description"]).to eq("Task 3")
        expect(json_response[1]["description"]).to eq("Task 2")
        expect(json_response[2]["description"]).to eq("Task 1")
      end

      it "includes task attributes" do
        get("/tasks", headers:)
        
        json_response = JSON.parse(response.body)
        task = json_response.first
        
        expect(task).to have_key("id")
        expect(task).to have_key("description")
        expect(task).to have_key("created_at")
        expect(task).to have_key("updated_at")
      end
    end

    context "when no tasks exist" do
      it "returns an empty array" do
        get("/tasks", headers:)
        
        expect(response).to have_http_status(:ok)
        json_response = JSON.parse(response.body)
        expect(json_response).to eq([])
      end
    end
  end

  describe "POST /tasks" do
    context "with valid parameters" do
      let(:params) { { task: { description: "New task" } } }


      it "returns 201 status" do
        post("/tasks", params:, headers:)
        expect(response).to have_http_status(:created)
      end

      it "creates a new task" do
        expect {
          post("/tasks", params:, headers:)
        }.to change(Task, :count).by(1)
      end

      it "returns the created task" do
        post("/tasks", params:, headers:)
        json_response = JSON.parse(response.body)    

        expect(json_response["description"]).to eq("New task")
        expect(json_response["id"]).to be_present
        expect(json_response["created_at"]).to be_present
      end
    end

    context "with invalid parameters" do
      let(:params) { { task: { description: "" } } }

      it "returns unprocessable entity status" do
        post("/tasks", params:, headers:)
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "does not create a task" do
        expect {
          post("/tasks", params:, headers:)
        }.not_to change(Task, :count)
      end

      it "returns error messages" do
        post("/tasks", params:, headers:)
        
        json_response = JSON.parse(response.body)
        expect(json_response["description"]).to include("can't be blank")
      end
    end
  end
end
