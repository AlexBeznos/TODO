module Api
  class TasksController < ApplicationController
    def index
      @tasks = Task.all
      render json: @tasks
    end

    def show
      @task = Task.find(params[:id])
      render json: @task
    end

    def create
      @task = Task.new(params[:task])

      if @task.save
        render json: @task, status: :created, location: @task
      else
        render json: @task.errors, status: :unprocessable_entity
      end
    end

    def update
      @task = Task.find(params[:id])

      if @task.update(params[:task])
        head :no_content
      else
        render json: @task.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @task = Task.find(params[:id])
      @task.destroy

      head :no_content
    end
    
  end
end