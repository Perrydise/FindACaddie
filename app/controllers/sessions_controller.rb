class SessionsController < ApplicationController
    skip_before_action :authorized, only: :create
    
    def create
        user = User.find_by(name: params[:name])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: {error: {login: "Invalid username or password"}}, status: :unauthorized
        end
    end

    def destroy      
        session.clear        
        redirect_to '/' 
      end  
end
