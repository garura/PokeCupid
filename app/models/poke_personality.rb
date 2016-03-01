class PokePersonality < ActiveRecord::Base

  BOOLEAN_VALUES = [true, false]
  RARE_CANDY = [
    "Never",
    "Maybe before a big fight",
    "Anytime I find one!"
  ]

  validates :battling, :friendship, :breeding, :caught,
    inclusion: BOOLEAN_VALUES
  validates :pokerus, inclusion: BOOLEAN_VALUES, allow_nil: true
  validates :rarecandy, inclusion: RARE_CANDY, allow_nil: true
  validates :user_id, presence: true
  validate :min_level_valid
  validate :max_level_valid

  belongs_to :user

  private

  def min_level_valid
    if min_level && min_level < 18
      errors[:minimum_level] << "is 18"
    end
  end

  def max_level_valid
    if max_level
      if min_level && max_level < min_level
        errors[:maximum_level] << "must be higher than minimum level"
      elsif max_level > 100
        errors[:maximum_level] << "is 100"
      end
    end
  end

end
