class User < ActiveRecord::Base
  attr_reader :password

  VALID_RESPONSES = [" ", "T", "F"]

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
    :birthday, :type_one, :photo_url, presence: true
  validates :username, :email, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :type_one, inclusion: POKEMON_TYPES, allow_nil: true
  validates :type_two, inclusion: POKEMON_TYPES, allow_nil: true
  validates :response, length: { is: 6 }
  validate :valid_response
  validate :valid_birthday
  validate :valid_types
  after_initialize :ensure_session_token

  has_one :poke_personality, dependent: :destroy
  has_many :poke_preferences, dependent: :destroy

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    return user if user && user.is_password?(password)
    nil
  end

  def self.match_points(user1, user2)
    points = 0
    6.times do |char|
      if (user1.response[char] != " " && user1.response[char] == user2.response[char])
        points += 1
      end
    end
    points
  end

  def matches(preferences = nil)
    # preferences ||= self.poke_preferences
    preferences = preferences.map { |pref| pref.poke_type }
    good_matches = []

    match_type_users = User.includes(:poke_personality).where("type_one IN (?) OR type_two IN (?)", preferences, preferences)
    match_type_users.each do |user|
      next if user == self
      points = User.match_points(self, user)
      good_matches << user if points >= 1
    end

    good_matches
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

  def valid_response
    response.length.times do |char|
      unless VALID_RESPONSES.include?(response[char])
        errors[:response] << "has invalid characters"
        return nil
      end
    end
  end

  def valid_birthday
    if birthday && (Time.now - birthday.to_time) < 567648000
      errors[:birthday] << "invalid. Must be at least level 18"
    elsif birthday && (Time.now - birthday.to_time) > 3153600000
      errors[:birthday] << "invalid. Maximum level is 100"
    end
  end

  def valid_types
    if (type_one && type_two) && type_one == type_two && type_one != ""
      errors[:type] << "combination invalid. No duplicate typing."
    end
  end

end
