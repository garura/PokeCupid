class CreateOrientations < ActiveRecord::Migration
  def change
    create_table :orientations do |t|
      t.integer :user_id, null: false
      t.string :orientation_type, null: false
      t.timestamps null: false
    end
    add_index :orientations, [:user_id, :orientation_type], unique: true
  end
end
