class TaskSerializer < ApplicationSerializer
  attributes :id, :description, :status, :position, :task_list_id
end
