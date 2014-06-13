require 'spec_helper'

describe TaskList do
  let(:list) { TaskList.create() }
  
  it "Name shoulde be presente" do
  	list.should be_valid
  end
end
