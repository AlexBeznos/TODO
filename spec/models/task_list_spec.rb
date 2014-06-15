require 'spec_helper'

describe TaskList do
  it "should validate presence of name" do
    TaskList.new(name: "").should_not be_valid
  end
end
