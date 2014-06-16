require 'spec_helper'

describe Api::TaskListsController do
  it "get task_lists index and return json" do
  	get :index
  	response.content_type.should == "application/json"
	end
  
  it "should have json with real data"	do
  	TaskList.create!(name: "Hello World")
    visit 'api/task_lists'
  	page.should have_content "Hello World" 
  end
end