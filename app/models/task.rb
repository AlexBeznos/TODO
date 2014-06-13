class Task < ActiveRecord::Base
  before_create :set_status

  protected
	def set_status
	  self.status = false
	end
end
