require 'spec_helper'


describe Task do
  it "should put false status to new task" do
    task = Task.new(description: "Some job")
    task.save
    task.status.should == false
  end

  it "should validate presence of description" do
  	Task.new(description: "").should_not be_valid
  end
end