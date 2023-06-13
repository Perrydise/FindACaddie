class CreateRole < ActiveRecord::Migration[6.1]
  def change
    create_table :roles do |t|
      t.integer :user_id, null: false
      t.string :role

      t.timestamps
    end
    add_foreign_key :roles, :users, column: :user_id, unique: true
    add_index :roles, :user_id, unique: true
  end
end
