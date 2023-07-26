class GolfCoursesUsersController < ApplicationController
   

    def create
        user_id = session[:user_id]
        course_name = params[:name]
      
        user = User.find(user_id)
        course = GolfCourse.find_or_create_by(name: course_name)
        puts session[:user_id]
        puts user_id
        # puts session.user_id
        puts session       
        if course.valid?
          user.golf_course << course
          render json: course, status: :created
        else
          render json: { errors: course.errors.full_messages }, status: :unprocessable_entity
        end
      end

    # def create
    #     user_id = session[:user_id]
    #     course_name = params[:name]
    
    #     begin
    #       user = User.find(user_id)
    #     rescue ActiveRecord::RecordNotFound
    #       render json: { error: "User not found with ID: #{user_id}" }, status: :not_found
    #       return
    #     end
    
    #     course = GolfCourse.find_or_create_by(name: course_name)
    
    #     # Rest of your code...
    
    #   end

end