class CreateEthnicities < ActiveRecord::Migration
  def change
    create_table :ethnicities do |t|
      t.integer :personality_id, null: false
      t.string :ethnicity_type, null: false
      t.timestamps null: false
    end
    add_index :ethnicities, [:ethnicity_type, :personality_id], unique: true
  end
end
