class AddPokemonTypeUsers < ActiveRecord::Migration
  def change
    add_column :users, :type_one, :string, null: false
    add_column :users, :type_two, :string
  end
end
