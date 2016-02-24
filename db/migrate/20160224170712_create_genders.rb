class CreateGenders < ActiveRecord::Migration
  def change
    create_table :genders do |t|
      t.integer :user_id, null: false
      t.string :gender_type, null: false
      t.timestamps null: false
    end
    add_index :genders, [:gender_type, :user_id], unique: true
  end
end
