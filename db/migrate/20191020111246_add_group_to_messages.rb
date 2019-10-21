class AddGroupToMessages < ActiveRecord::Migration[5.0]
  def change
    add_reference :messages, :group, foreign_key: true
  end
end
