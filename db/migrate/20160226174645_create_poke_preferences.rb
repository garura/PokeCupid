class CreatePokePreferences < ActiveRecord::Migration
  def change
    create_table :poke_preferences do |t|
      t.integer :user_id, null: false
      t.string :poke_type, null: false
      t.timestamps null: false
    end
    add_index :poke_preferences, [:poke_type, :user_id], unique: true
  end
end
