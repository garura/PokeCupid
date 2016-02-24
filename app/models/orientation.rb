class Orientation < ActiveRecord::Base

  ORIENTATION_TYPE = [
    "Straight",
    "Gay",
    "Lesbian",
    "Bisexual",
    "Asexual",
    "Pansexual",
    "Questioning"
  ]

  validates :orientation_type, inclusion: ORIENTATION_TYPE
  validates :orientation_type, :personality_id, presence: true
  validates :personality_id, uniqueness: { scope: :orientation_type }

  belongs_to :personality

end
