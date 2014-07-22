class Task < ActiveRecord::Base
  before_create :set_status, :add_position
 # validates :description, presence: true

  protected
	def set_status
	  self.status = false if self.status == nil
	end

	def add_position
    pos = 0;
    Task.where(task_list_id: self.task_list_id).each do |task|
      pos = task.position if task.position > pos
    end
    pos += 1
    self.position = pos
  end
end
