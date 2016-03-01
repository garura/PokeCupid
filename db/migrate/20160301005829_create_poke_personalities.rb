class CreatePokePersonalities < ActiveRecord::Migration
  def change
    create_table :poke_personalities do |t|
      t.integer :user_id
      t.text :summary
      t.text :daily
      t.text :skills
      t.text :favorites
      t.text :six
      t.text :friday
      t.text :message
      t.integer :min_level, default: 18
      t.integer :max_level, default: 100
      t.boolean :battling, default: false, null: false
      t.boolean :friendship, default: true, null: false
      t.boolean :breeding, default: false, null: false
      t.boolean :caught, default: false, null: false
      t.string :rarecandy, default: "never"
      t.boolean :pokerus, default: false
      t.timestamps null: false
    end
    add_index :poke_personalities, :user_id, unique: true
  end
end
