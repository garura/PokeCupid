class User < ActiveRecord::Base
  attr_reader :password

  validates :username, :email, :session_token, :password_digest,
    :birthday, presence: true
  validates :username, :email, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validate :valid_birthday
  after_initialize :ensure_session_token

  has_one :personality, dependent: :destroy
  has_many :genders, dependent: :destroy

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

end
