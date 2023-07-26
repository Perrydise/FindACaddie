# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'net/http'
require 'json'

User.delete_all
Skill.delete_all
Role.delete_all
GolfCourse.delete_all

Role.create(name: "caddie")
Role.create(name: "player")

u1 =User.create(name: "Joe Alby", password: "123456", bio: "I love golf!")
u2 = User.create(name: "Noah Spiely", password: "123456", bio: "I golf everyday!")
u3 = User.create(name: "Matt Kay", password: "123456", bio: "I am terrible at golf!")



s1 = Skill.create(name: "Reading Putts")
s2 = Skill.create(name: "Course Knowledge")
s3 = Skill.create(name: "Club Selection")
s4 = Skill.create(name: "Course Etiquette")
s5 = Skill.create(name: "High Energy")
s6 = Skill.create(name: "Here For The Win")

u1.skills << s1
u2.skills << s2
  
  def add_courses_to_table
    url = 'https://golf-course-finder.p.rapidapi.com/courses?radius=10&lat=39.0840&lng=-77.1528'
    uri = URI(url)
  
    request = Net::HTTP::Get.new(uri)
    request['X-RapidAPI-Key'] = '46f8d55528mshd3a0129a9e7faeep19f2acjsn2c5b764b8ef3'
    request['X-RapidAPI-Host'] = 'golf-course-finder.p.rapidapi.com'
  
    response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') do |http|
      http.request(request)
    end
  
    courses_data = JSON.parse(response.body)
  
    # Map over the courses data and add the names to the "golf_courses" table
    courses_data['courses'].each do |course_data|
      name = course_data['name']
      GolfCourse.create(name: name)
    end
  end

  add_courses_to_table