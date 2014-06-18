class TaskSerializer < ActiveModel::Serializer
  attributes :id, :description, :status
end
