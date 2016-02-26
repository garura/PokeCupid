class User < ActiveRecord::Base
  attr_reader :password

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

  validates :username, :email, :session_token, :password_digest,
    :birthday, :type_one, presence: true
  validates :username, :email, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :type_one, inclusion: POKEMON_TYPES
  validates :type_two, inclusion: POKEMON_TYPES, allow_nil: true
  validate :valid_birthday
  validate :valid_types
  after_initialize :ensure_session_token

  has_one :personality, dependent: :destroy
  has_many :genders, dependent: :destroy
  has_many :poke_preferences, dependent: :destroy

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    return user if user && user.is_password?(password)
    nil
  end


  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end


  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end


  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
  end


  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  private

  def valid_birthday
    if birthday && (Time.now - birthday.to_time) < 567648000
      errors[:birthday] << "invalid. Must be at least 18 years old"
    end
  end

  def valid_types
    if (type_one && type_two) && type_one == type_two
      errors[:type] << "combination invalid. No duplicate typing."
    end
  end

end
