require 'spec_helper'


describe Task do
  it "should put false status to new task" do
    task = Task.new(description: "Some job")
    task.save
    task.status.should == false
  end

  it "should put position to new task" do
  	task = Task.new(description: "Hello")
  	task.save
  	task.position.should == 1
  end
end