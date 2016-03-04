# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160304175702) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ethnicities", force: :cascade do |t|
    t.integer  "personality_id", null: false
    t.string   "ethnicity_type", null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "ethnicities", ["ethnicity_type", "personality_id"], name: "index_ethnicities_on_ethnicity_type_and_personality_id", unique: true, using: :btree

  create_table "genders", force: :cascade do |t|
    t.integer  "user_id",     null: false
    t.string   "gender_type", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "genders", ["gender_type", "user_id"], name: "index_genders_on_gender_type_and_user_id", unique: true, using: :btree

  create_table "orientations", force: :cascade do |t|
    t.integer  "personality_id",   null: false
    t.string   "orientation_type", null: false
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  add_index "orientations", ["personality_id", "orientation_type"], name: "index_orientations_on_personality_id_and_orientation_type", unique: true, using: :btree

  create_table "personalities", force: :cascade do |t|
    t.text     "summary"
    t.text     "life"
    t.text     "skills"
    t.text     "favorites"
    t.text     "six"
    t.text     "friday"
    t.text     "message"
    t.integer  "user_id",                              null: false
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "desired_gender"
    t.integer  "min_age"
    t.integer  "max_age"
    t.boolean  "desire_single",     default: true
    t.boolean  "new_friends",       default: true
    t.boolean  "long_term",         default: true
    t.boolean  "short_term",        default: true
    t.boolean  "casual",            default: false
    t.string   "status",            default: "Single", null: false
    t.string   "relationship_type"
    t.integer  "feet"
    t.integer  "inches",            default: 0
    t.integer  "centimeters",       default: 0
    t.string   "body_type"
    t.string   "diet"
    t.string   "smoking"
    t.string   "drinking"
    t.string   "drugs",             default: "Never"
    t.string   "religion"
    t.string   "sign"
    t.string   "edu_progress"
    t.string   "education"
    t.string   "offspring"
    t.boolean  "dogs",              default: false
    t.boolean  "cats",              default: false
    t.string   "languages"
  end

  add_index "personalities", ["user_id"], name: "index_personalities_on_user_id", unique: true, using: :btree

  create_table "poke_personalities", force: :cascade do |t|
    t.integer  "user_id"
    t.text     "summary"
    t.text     "daily"
    t.text     "skills"
    t.text     "favorites"
    t.text     "six"
    t.text     "friday"
    t.text     "message"
    t.integer  "min_level",  default: 18
    t.integer  "max_level",  default: 100
    t.boolean  "battling",   default: false,   null: false
    t.boolean  "friendship", default: true,    null: false
    t.boolean  "breeding",   default: false,   null: false
    t.boolean  "caught",     default: false,   null: false
    t.string   "rarecandy",  default: "Never"
    t.boolean  "pokerus",    default: false
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
  end

  add_index "poke_personalities", ["user_id"], name: "index_poke_personalities_on_user_id", unique: true, using: :btree

  create_table "poke_preferences", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.string   "poke_type",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "poke_preferences", ["poke_type", "user_id"], name: "index_poke_preferences_on_poke_type_and_user_id", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",                           null: false
    t.string   "session_token",                      null: false
    t.string   "password_digest",                    null: false
    t.string   "email",                              null: false
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.string   "birthday",                           null: false
    t.string   "type_one",                           null: false
    t.string   "type_two"
    t.string   "response",        default: "      ", null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
