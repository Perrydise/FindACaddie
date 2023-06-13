Rails.application.routes.draw do
  
  resources :users, only: [:show, :create, :update]
  resources :skills, only: [:create]
  resources :roles, only: [:update]
  post "login", to: "sessions#create"
  delete "/logout" => "sessions#destroy"
  get "/auth", to: "users#show"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
