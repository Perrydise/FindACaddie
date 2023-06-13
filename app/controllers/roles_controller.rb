class RolesController < ApplicationController

    def update
        role = Role.find_by(id: params[:id])
        if role.user_id == session[:user_id]
            if role.update(role_params)
                render json: role
            else
                render json { errors: role.errors.full_message }, status: :unprocessable_entity
            end
        else
            render json: { message: "You are not authorized to update your role "}, status: :unauthorized
        end        
    end

end
