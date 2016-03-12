class UpdateDefaultPic < ActiveRecord::Migration
  def change
    change_column_default(:users, :photo_url, 'http://res.cloudinary.com/dxclocey3/image/upload/v1457745147/pokeDefault_zrssp4.png')
  end
end
