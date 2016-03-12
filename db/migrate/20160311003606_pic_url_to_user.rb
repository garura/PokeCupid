class PicUrlToUser < ActiveRecord::Migration
  def change
    add_column :users, :photo_url, :string, null: false, default: 'http://res.cloudinary.com/dxclocey3/image/upload/v1457656687/pq_225_fyogsr.png'
  end
end
