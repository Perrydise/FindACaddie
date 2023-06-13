class User < ApplicationRecord
    has_secure_password

    validates :name, presence: :true
    has_one :role
    has_and_belongs_to_many :skills
    
end
