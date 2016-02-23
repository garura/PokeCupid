class CreatePersonalities < ActiveRecord::Migration
  def change
    create_table :personalities do |t|
      t.text :summary
      t.text :life
      t.text :skills
      t.text :favorites
      t.text :six
      t.text :friday
      t.text :message
      t.integer :user_id, null: false
      t.timestamps null: false
    end
    add_index :personalities, :user_id, unique: true
  end
end
