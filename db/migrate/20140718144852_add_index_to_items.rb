class AddIndexToItems < ActiveRecord::Migration
  def change
  	add_index :items,:shop_id
  end
end
