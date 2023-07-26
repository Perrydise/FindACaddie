class SkillsUsersController < ApplicationController

  def create
    user_id = params[:user_id]
    skill_name_array = params[:skill_name]
  
    user = User.find(user_id)
    skills = []
    skill_name_array.each do |skill_name|
      puts skill_name
      # skill = Skill.new(user_id: user_id, skill_name: skill_name)
      found_skill = Skill.find_by(name: skill_name)
      puts found_skill 
      if found_skill
        user.skills << found_skill
        # new_user_skill = SkillsUser.new(user_id: user_id, skill_id: found_skill.id)
        # new_user_skill.save
      end
      # if skill.valid?
      #   skill.save
      #   skills << skill
      # else
      #   errors << skill.errors.full_messages
      # end
    end
    # if skills.present?
    #   render json: skills, status: :created
    # else
    #   render json: { errors: skills.map { |skill| skill.errors.full_messages } }, status: :unprocessable_entity
    # end
  end

      def index 
        skills = SkillUser.all
        render json: skills
      end
      

end