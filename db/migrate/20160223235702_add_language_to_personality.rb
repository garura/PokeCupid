class AddLanguageToPersonality < ActiveRecord::Migration
  def change
    add_column :personalities, :languages, :string
  end
end
