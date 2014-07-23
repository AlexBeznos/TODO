class Task < ActiveRecord::Base
  before_create :add_position
  scope :position, lambda {|pos| where(:position => pos)}
 # validates :description, presence: true

  protected

	def add_position
    pos = 0;
    Task.where(task_list_id: self.task_list_id).each do |task|
      pos = task.position if task.position > pos
    end
    pos += 1
    self.position = pos
  end
end
