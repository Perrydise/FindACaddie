class UsersController < ApplicationController
  wrap_parameters format:[]
  skip_before_action :authorized, only:[:create]
  


    def create  
      user_id = params[:user_id]  
      role_name = params[:role]
      begin 
        role = Role.find_by(name: role_name) 
        puts user_id
        puts role
        user = User.new(user_create_params)  
        user.role = role
        save = user.save!

         if !save
          user.errors.full_messages.each do |error_message|
            puts error_message
          end
        end
        puts user.id
        puts user 
        puts user.role 
        session[:user_id] = user.id  
        render json: user, status: :created  
      rescue ArgumentError => e  
        render json: { error: e.message }, status: :unprocessable_entity 
      end
    end

    # def create
    #   user_id = params[:user_id]
    #   role_name = params[:role]
    #   begin
    #     user = User.create!(user_params)
    #     role = Role.find_by(name: role_name)
        
    #     unless role
    #       render json: { error: "Invalid role: #{role_name}" }, status: :unprocessable_entity
    #       return
    #     end
        
    #     role_record = Role.create_role(user, role)
    #     session[:user_id] = user.id
    #     render json: user, status: :created
    #   rescue ArgumentError => e
    #     render json: { error: e.message }, status: :unprocessable_entity
    #   end
    # end
    

  def show
    current_user = User.find(session[:user_id])
    puts current_user
    render json: current_user, serializer: UserSerializer
  end

  

  def index
    users = User.all
    render json: users
  end

#   def update
#     user = User.find_by(id: params[:id])
#     # if user == session[:user_id]
#     bio = user.bio
#         if user.update(user_params)
#             render json: user
#         else
#             render json: { errors: user.errors.full_message }, status: :unprocessable_entity
#         end       
# end

def update
  user = User.find_by(id: params[:id])
  puts user
  # puts user.bio
  # puts user_update_params
  # puts user.id
  # puts params
  # puts user.password
  # user.bio = params[:bio]
  if user.update(user_update_params)
    render json: user
  else
    render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
  end
end



  private

  def user_create_params
    params.permit(:name, :password)
  end

  def user_update_params
    params.permit(:bio, :id)
  end


end
