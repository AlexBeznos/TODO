class Task < ActiveRecord::Base
  before_create :set_status
  before_update :add_position
  scope :position, lambda {|pos| where(:position => pos)}
 # validates :description, presence: true

  protected
	def set_status
	  self.status = false if self.status == nil
    add_position
	end

	def add_position
    puts "booooooo"
    puts self.position
    puts "booooooo"
  end
  
end
