class CreateJoinTableGolfCoursesUsers < ActiveRecord::Migration[6.1]
  def change
    create_join_table :golf_courses, :users do |t|
      t.index [:golf_course_id, :user_id]
      t.index [:user_id, :golf_course_id]
    end
  end
end
