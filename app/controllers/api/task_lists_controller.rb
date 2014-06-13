module Api
  class TaskListsController < ApplicationController
    # GET /task_lists
    # GET /task_lists.json
    def index
      @task_lists = TaskList.all

      render json: @task_lists
    end

    # GET /task_lists/1
    # GET /task_lists/1.json
    def show
      @task_list = TaskList.find(params[:id])

      render json: @task_list
    end

    # POST /task_lists
    # POST /task_lists.json
    def create
      @task_list = TaskList.new(params[:task_list])

      if @task_list.save
        render json: @task_list, status: :created, location: @task_list
      else
        render json: @task_list.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /task_lists/1
    # PATCH/PUT /task_lists/1.json
    def update
      @task_list = TaskList.find(params[:id])

      if @task_list.update(params[:task_list])
        head :no_content
      else
        render json: @task_list.errors, status: :unprocessable_entity
      end
    end

    # DELETE /task_lists/1
    # DELETE /task_lists/1.json
    def destroy
      @task_list = TaskList.find(params[:id])
      @task_list.destroy

      head :no_content
    end
  end
end