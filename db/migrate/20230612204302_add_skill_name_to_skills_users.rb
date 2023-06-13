class AddSkillNameToSkillsUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :skills_users, :skill_name, :string
  end
end
