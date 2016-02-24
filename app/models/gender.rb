class Gender < ActiveRecord::Base

  GENDER_TYPES = [
    "Woman",
    "Man",
    "Gender Nonconforming",
    "Trans Woman",
    "Trans Man",
    "Other"
  ]

  validates :user_id, :gender_type, presence: true
  validates :user_id, uniqueness: { scope: :gender_type }
  validates :gender_type, inclusion: GENDER_TYPES

  belongs_to :user

end
