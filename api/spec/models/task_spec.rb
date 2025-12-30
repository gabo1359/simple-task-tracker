require 'rails_helper'

RSpec.describe Task, type: :model do
  describe "validations" do
    describe "description" do
      it "is valid with a description" do
        task = Task.new(description: "Valid task")
        expect(task).to be_valid
      end

      it "is invalid without a description" do
        task = Task.new(description: nil)
        expect(task).not_to be_valid
        expect(task.errors[:description]).to include("can't be blank")
      end

      it "is invalid with an empty description" do
        task = Task.new(description: "")
        expect(task).not_to be_valid
        expect(task.errors[:description]).to include("can't be blank")
      end
    end
  end

  describe "database operations" do
    describe "#save" do
      it "saves a valid task" do
        task = Task.new(description: "Test task")
        expect(task.save).to be true
        expect(task.persisted?).to be true
      end

      it "does not save an invalid task" do
        task = Task.new(description: "")
        expect(task.save).to be false
        expect(task.persisted?).to be false
      end
    end
  end
end
