class CreateScheduleEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :schedule_events do |t|
      t.string :message
      t.datetime :event_date
      t.references :caddie_user, null: true
      t.references :player_user, null: false

      t.timestamps
    end
    add_foreign_key :schedule_events, :users, column: :caddie_user_id
    add_foreign_key :schedule_events, :users, column: :player_user_id
  end
end
