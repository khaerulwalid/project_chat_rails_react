class AddUsernameToMessages < ActiveRecord::Migration[8.0]
  def change
    add_column :messages, :username, :string
  end
end
