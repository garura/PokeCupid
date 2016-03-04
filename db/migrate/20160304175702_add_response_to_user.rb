class AddResponseToUser < ActiveRecord::Migration
  def change
    add_column :users, :response, :string, null: false, default: "      "
  end
end
