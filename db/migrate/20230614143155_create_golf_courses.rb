class CreateGolfCourses < ActiveRecord::Migration[6.1]
  def change
    create_table :golf_courses do |t|
      # t.string :location
      t.string :name

      t.timestamps
    end
  end
end
