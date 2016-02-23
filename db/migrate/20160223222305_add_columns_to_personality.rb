class AddColumnsToPersonality < ActiveRecord::Migration
  def change
    add_column :personalities, :desired_gender, :string
    add_column :personalities, :min_age, :integer
    add_column :personalities, :max_age, :integer
    add_column :personalities, :desire_single, :boolean, default: true
    add_column :personalities, :new_friends, :boolean, default: true
    add_column :personalities, :long_term, :boolean, default: true
    add_column :personalities, :short_term, :boolean, default: true
    add_column :personalities, :casual, :boolean, default: false
    add_column :personalities, :status, :string, default: "Single", null: false
    add_column :personalities, :relationship_type, :string
    add_column :personalities, :feet, :integer
    add_column :personalities, :inches, :integer, default: 0
    add_column :personalities, :centimeters, :integer, default: 0
    add_column :personalities, :body_type, :string
    add_column :personalities, :diet, :string
    add_column :personalities, :smoking, :string
    add_column :personalities, :drinking, :string
    add_column :personalities, :drugs, :string, default: "Never"
    add_column :personalities, :religion, :string
    add_column :personalities, :sign, :string
    add_column :personalities, :edu_progress, :string
    add_column :personalities, :education, :string
    add_column :personalities, :offspring, :string
    add_column :personalities, :dogs, :boolean, default: false
    add_column :personalities, :cats, :boolean, default: false
  end
end
