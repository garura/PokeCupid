class ChangeDefaultPokePers < ActiveRecord::Migration
  def change
    change_column :poke_personalities, :rarecandy, :string, default: "Never"
  end
end
