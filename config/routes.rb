Rails.application.routes.draw do
  
  resources :golf_courses, only: [:index, :show]
  resources :users, only: [:show, :create, :update]
  resources :skills, only: [:create, :index]
  resources :roles, only: [:update]
  resources :skills_users, only: [:create, :index]
  resources :golf_courses_users, only: [:create]
  resources :schedule_events, only: [:create]
  post "login", to: "sessions#create"
  delete "/logout" => "sessions#destroy"
  get "/auth", to: "users#show"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
