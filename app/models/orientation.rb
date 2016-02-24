class Orientation < ActiveRecord::Base
  validates :orientation_type, inclusion: ORIENTATION_TYPE
  validates :orientation_type, :personality_id, presence: true
  validates :orientation_type, uniqueness: { scope: :personality_id }
# validates :personality_id, uniqueness: { scope: :orientation_type }

  belongs_to :personality

  ORIENTATION_TYPE = [
    "Straight",
    "Gay",
    "Lesbian",
    "Bisexual",
    "Asexual",
    "Pansexual",
    "Questioning"
  ]


end
