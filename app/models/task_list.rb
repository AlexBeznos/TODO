class TaskList < ActiveRecord::Base
	has_many :tasks
	validate :name, presence: true
	validate :name, uniquiness: true
end
