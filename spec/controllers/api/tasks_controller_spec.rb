require 'spec_helper'

describe "Api.TasksController" do
  it "should put false status to new task" do
    task = Task.new(description: "Some job")
    task.save
    task.status.should == false
  end
end