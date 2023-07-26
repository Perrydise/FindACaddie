class User < ApplicationRecord
  
    has_secure_password

    has_and_belongs_to_many :skills

  belongs_to :role
  has_and_belongs_to_many :golf_course

  validates :name, presence: true
  validates_presence_of :password, if: :password_digest_changed?
  validates_length_of :password, within: 5..20, if: :password_digest_changed?

  validates :bio, length: { maximum: 500 }

  
    
end
