class AddAvatarToItems < ActiveRecord::Migration
  def change
    add_attachment :items, :avatar
  end
end
