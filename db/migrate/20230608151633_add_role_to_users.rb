class AddRoleToUsers < ActiveRecord::Migration[6.1]
  def change
    # add_reference :users, :role, polymorphic: true, null: false
  end
end
