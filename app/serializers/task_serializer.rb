class TaskSerializer < ApplicationSerializer
  attributes :id, :description, :status, :task_list_id
end
