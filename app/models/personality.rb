class Personality < ActiveRecord::Base
  validates :user_id, presence: true, uniqueness: true

  belongs_to :user




end

# TODO seeking table, details table