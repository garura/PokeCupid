class RemoveOldTables < ActiveRecord::Migration
  def change
    drop_table :ethnicities
    drop_table :genders
    drop_table :orientations
    drop_table :personalities
  end
end
