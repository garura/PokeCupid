Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]
    resources :poke_personalities, only: [:create, :update, :show]
    resources :users, only: [:create, :show]
    resources :poke_preferences, only: [:create, :show, :update, :destroy]
    get '/response/:user_id', to: 'users#response_text'
    post '/response/:id', to: 'users#update_response'
    get '/user/session/:id', to: 'users#session_info'
  end
end
