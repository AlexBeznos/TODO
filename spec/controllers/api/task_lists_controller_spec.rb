require 'spec_helper'

desribe TaskListController do 
  it "shoudl validate presence of name" do
    task_list = TaskList.new()
    task_list.should be_valid
  end
end
