class Personality < ActiveRecord::Base
  validates :user_id, :status, presence: true
  validates :user_id, uniqueness: true
  validates :relationship_type, :body_type, :diet, :smoking, :drinking,
    :drugs, :religion, :sign, :edu_progress, :education, :offspring,
    :languages, allow_nil: true
  validates :status, inclusion: RELATIONSHIP_STATUS
  validates :relationship_type, inclusion: RELATIONSHIP_TYPE
  validates :feet, inclusion: FEET
  validates :inches, inclusion: INCHES
  validates :body_type, inclusion: BODY_TYPE
  validates :diet, inclusion: DIET
  validates :smoking, inclusion: SMOKING
  validates :drinking, inclusion: DRINKING
  validates :drugs, inclusion: DRUGS
  validates :religion, inclusion: RELIGION
  validates :sign, inclusion: SIGN
  validates :edu_progress, inclusion: EDU_PROGRESS
  validates :education, inclusion: EDUCATION
  validates :offspring, inclusion: OFFSPRING
  validates :languages, inclusion: LANGUAGES
  validate :min_age_valid
  validate :max_age_valid

  belongs_to :user
  has_many :orientations

  RELATIONSHIP_STATUS = [
    "Single",
    "Seeing someone",
    "Married",
    "In an open relationship"
  ]

  RELATIONSHIP_TYPE = ["Monogamous", "Non-monogamous"]

  FEET = [3, 4, 5, 6, 7]
  INCHES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

  BODY_TYPE = ["Rather not say", "Thin", "Overweight", "Average Build"]

  DIET = ["Vegetarian", "Vegan", "Kosher", "Halal"]

  SMOKING = ["Yes", "Sometimes", "No"]

  DRINKING = ["Often", "Socially", "Not at all"]

  DRUGS = ["Never", "Sometimes", "Often"]

  RELIGION = [
    "Agnosticism",
    "Atheism",
    "Christianity",
    "Judaism",
    "Catholicism",
    "Islam",
    "Hinduism",
    "Buddhism",
    "Sikh",
    "Other"
  ]

  SIGN =[
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces"
  ]

  EDU_PROGRESS = ["Working On", "Dropped out of"]

  EDUCATION = [
    "High school",
    "Two-year college",
    "University",
    "Space camp",
    "Post grad"
  ]

  OFFSPRING = ["Has kid(s)", "Doesn't have kids"]

  LANGUAGES = ["English", "Other"]

  private

  def min_age_valid
    if min_age && min_age < 18
      errors[:min_age] << "Minimum age is 18"
    end
  end

  def max_age_valid
    if max_age && max_age < min_age
      errors[:max_age] << "Max age must be higher than min age"
    end
  end

end


# TODO orientation model
# TODO gender model
# TODO orientation, gender, birthdate forms on sign up
