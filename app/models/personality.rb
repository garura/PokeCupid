class Personality < ActiveRecord::Base

  RELATIONSHIP_STATUS = [
    "Single",
    "Seeing someone",
    "Married",
    "In an open relationship"
  ]

  RELATIONSHIP_TYPE = ["Monogamous", "Non-monogamous"]

  FEET = [3, 4, 5, 6, 7]

  INCHES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

  BODY_TYPE = ["Rather not say", "Thin", "Overweight", "Average build"]

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

  EDU_PROGRESS = ["Working on", "Dropped out of"]

  EDUCATION = [
    "High school",
    "Two-year college",
    "University",
    "Space camp",
    "Post grad"
  ]

  OFFSPRING = ["Has kid(s)", "Doesn't have kids"]

  LANGUAGES = ["English", "Other", "Multiple"]

  validates :user_id, :status, presence: true
  validates :user_id, uniqueness: true
  validates :status, inclusion: RELATIONSHIP_STATUS, allow_nil: true
  validates :relationship_type, inclusion: RELATIONSHIP_TYPE, allow_nil: true
  validates :feet, inclusion: FEET, allow_nil: true
  validates :inches, inclusion: INCHES, allow_nil: true
  validates :body_type, inclusion: BODY_TYPE, allow_nil: true
  validates :diet, inclusion: DIET, allow_nil: true
  validates :smoking, inclusion: SMOKING, allow_nil: true
  validates :drinking, inclusion: DRINKING, allow_nil: true
  validates :drugs, inclusion: DRUGS, allow_nil: true
  validates :religion, inclusion: RELIGION, allow_nil: true
  validates :sign, inclusion: SIGN, allow_nil: true
  validates :edu_progress, inclusion: EDU_PROGRESS, allow_nil: true
  validates :education, inclusion: EDUCATION, allow_nil: true
  validates :offspring, inclusion: OFFSPRING, allow_nil: true
  validates :languages, inclusion: LANGUAGES, allow_nil: true
  validate :min_age_valid
  validate :max_age_valid

  belongs_to :user
  has_many :orientations, dependent: :destroy
  has_many :ethnicities, dependent: :destroy





  private

  def min_age_valid
    if min_age && min_age < 18
      errors[:minimum_age] << "is 18"
    end
  end

  def max_age_valid
    if max_age && max_age < min_age
      errors[:maximum_age] << "must be higher than minimum age"
    end
  end

end
