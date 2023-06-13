class RenameSkillsUsersToSkills < ActiveRecord::Migration[6.1]
  def change
    rename_table :skills_users, :skills
  end
end
