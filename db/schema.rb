# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_06_15_165357) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "golf_courses", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "golf_courses_users", id: false, force: :cascade do |t|
    t.bigint "golf_course_id", null: false
    t.bigint "user_id", null: false
    t.index ["golf_course_id", "user_id"], name: "index_golf_courses_users_on_golf_course_id_and_user_id"
    t.index ["user_id", "golf_course_id"], name: "index_golf_courses_users_on_user_id_and_golf_course_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "schedule_events", force: :cascade do |t|
    t.string "message"
    t.datetime "event_date"
    t.bigint "caddie_user_id"
    t.bigint "player_user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["caddie_user_id"], name: "index_schedule_events_on_caddie_user_id"
    t.index ["player_user_id"], name: "index_schedule_events_on_player_user_id"
  end

  create_table "skills", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "skills_users", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "skill_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["skill_id"], name: "index_skills_users_on_skill_id"
    t.index ["user_id"], name: "index_skills_users_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "password_digest"
    t.text "bio"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "role_id", null: false
    t.index ["role_id"], name: "index_users_on_role_id"
  end

  add_foreign_key "schedule_events", "users", column: "caddie_user_id"
  add_foreign_key "schedule_events", "users", column: "player_user_id"
  add_foreign_key "users", "roles"
end
