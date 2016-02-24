class RenameOrientationColumn < ActiveRecord::Migration
  def change
    rename_column :orientations, :user_id, :personality_id
  end
end
