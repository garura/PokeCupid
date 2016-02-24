class AddBirthdayToUser < ActiveRecord::Migration
  def change
    add_column :users, :birthday, :string, null: false
  end
end
