class PokePreference < ActiveRecord::Base

  POKEMON_TYPES = [
    "Normal",
    "Fighting",
    "Flying",
    "Poison",
    "Ground",
    "Rock",
    "Bug",
    "Ghost",
    "Steel",
    "Fire",
    "Water",
    "Grass",
    "Electric",
    "Psychic",
    "Ice",
    "Dragon",
    "Dark",
    "Fairy"
  ]

  validates :user_id, :poke_type, presence: true
  validates :poke_type, inclusion: POKEMON_TYPES
  validates :user_id, uniqueness: { scope: :poke_type }

  belongs_to :user
  
end
