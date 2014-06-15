require 'spec_helper'

describe Api::TaskListsController do
  it "get task_lists index and return json" do
  	get :index
  	response.content_type.should == "application/json"
	end
end