class SkillsController < ApplicationController

    def create
        user = User.find(params[:user_id])
        skill = user.skills.create!(skill_params)
        render json: skill, status: :created
      end
      

    private

    def skill_params
        params.permit(:skill_name, :skill, :user_id)
    end

end