class CreateSeekings < ActiveRecord::Migration
  def change
    create_table :seekings do |t|
      t.integer :min_age, null: false
      t.integer :max_age, null: false
      t.integer :user_id, null: false
      t.integer :gender, null: false
      t.boolean :single, default: true, null: false
      t.timestamps null: false
    end
    add_index :seekings, :user_id, unique: true
  end
end
