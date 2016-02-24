class Ethnicity < ActiveRecord::Base

  ETHNICITY_TYPE = [
    "Asian",
    "Middle Eastern",
    "Black",
    "Native American",
    "Hispanic/Latin",
    "Pacific Islander",
    "Indian",
    "White",
    "Other"
  ]

  validates :ethnicity_type, :personality_id, presence: true
  validates :ethnicity_type, inclusion: ETHNICITY_TYPE
  validates :personality_id, uniqueness: { scope: :ethnicity_type }

  belongs_to :personality

end
