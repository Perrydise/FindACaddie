class SkillsController < ApplicationController

    def create
        puts params
        user_id = params[:user_id]
        skill_name_array = params[:skill_name]

        user = User.find(user_id)
        new_skill = Skill.create!(user_id: user_id, skill_name: skill_name_array)
        skill = user.skills.create!(skill_params)
        render json: skill, status: :created
      end

    
    

    # def create
    #     user_id = params[:user_id]
    #     skill_names = params[:skill_name]
      
    #     user = User.find(user_id)
      
    #     skills = skill_names.map { |name| Skill.new(user_id: user_id, skill_name: name) }
      
    #     if skills.all?(&:valid?)
    #       skills.each(&:save!)
    #       render json: skills, status: :created
    #     else
    #       render json: { errors: skills.map { |skill| skill.errors.full_messages } }, status: :unprocessable_entity
    #     end
    #   end
      

      def index
        skills = Skill.all
        render json: skills
      end
      

    private

    def skill_params
        params.permit(:user_id, skill_name:[])
    end

end