class Role < ApplicationRecord
    
    belongs_to :user

    def self.create_role(user, role)
        # user = User.find_by(id: user_id)    
        #     raise ArgumentError, "Invalid user ID: #{user_id}" unless user    
            valid_roles = ['caddie', 'player']    
            unless valid_roles.include?(role)    
             raise ArgumentError, "Invalid role: #{role}. Valid roles are #{valid_roles.join(', ')}"    
        end   
        role_record = create(user: user, role: role)    
        role_record    
      end
    
end