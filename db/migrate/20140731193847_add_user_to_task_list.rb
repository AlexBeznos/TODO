class AddUserToTaskList < ActiveRecord::Migration
  def change
    add_column :task_lists, :user_id, :integer
  end
end
