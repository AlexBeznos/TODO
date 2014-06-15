require 'spec_helper'

describe Api::TasksController do
  it "get tasks index and return json" do
  	get :index, :task_list_id => 1
  	response.content_type.should == "application/json"
	end
end