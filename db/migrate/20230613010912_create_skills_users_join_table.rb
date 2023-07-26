class CreateSkillsUsersJoinTable < ActiveRecord::Migration[6.1]
  def change
    create_table :skills_users do |t|
     t.belongs_to :user
     t.belongs_to :skill
      t.timestamps
    end
  
  end
end
