class Task < ActiveRecord::Base
  before_create :set_status
  validates :description, presence: true

  protected
	def set_status
	  self.status = false
	end
end
