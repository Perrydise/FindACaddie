class UsersController < ApplicationController
  wrap_parameters format:[]
  skip_before_action :authorized, only:[:create]
  
  

    def create  
      user_id = params[:user_id]  
      role = params[:role]
      begin  
        user = User.create!(user_params)  
        role_record = Role.create_role(user, role)  
        session[:user_id] = user.id  
        render json: user, status: :created  
      rescue ArgumentError => e  
        render json: { error: e.message }, status: :unprocessable_entity 
      end
    end

  def show
    current_user = User.find(session[:user_id])
    puts current_user
    render json: current_user
  end

  def index
    users = User.all
    render json: users
  end

  def update
    user = User.find_by(id: params[:id])
    # if user == session[:user_id]
        if user.update(user_params)
            render json: user
        else
            render json: { errors: user.errors.full_message }, status: :unprocessable_entity
        end
    # else
    #     render json: { message: "You are not authorized to update your skills "}, status: :unauthorized
    # end        
end

  private

  def user_params
    params.permit(:name, :password, :bio, :skills, :id)
  end


end
