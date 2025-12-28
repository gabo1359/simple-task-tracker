class TasksController < ApplicationController
  def index
    @tasks = Task.order(created_at: :desc)
    render json: @tasks, status: :ok
  end

  def create
    @task = Task.new(task_params)

    if @task.save
      render json: @task, status: :created
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  private

  def task_params
    params.require(:task).permit(:description)
  end
end
