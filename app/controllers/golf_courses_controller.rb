class GolfCoursesController < ApplicationController

    def index
        golf_courses = GolfCourse.all
        render json: golf_courses
    end

    def show
        golf_course = GolfCourse.find(params[:id])
        caddies = golf_course.users.includes(:skills)
      
        caddies_with_skills = caddies.map do |caddy|
          { 
            caddy: caddy,
            skills: caddy.skills
          }
        end
      
        render json: { golf_course: golf_course, caddies: caddies_with_skills }
      end
      
      
      

end
