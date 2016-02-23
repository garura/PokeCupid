class DropSeekings < ActiveRecord::Migration
  def change
    drop_table :seekings
  end
end
