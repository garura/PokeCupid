Rails.application.routes.draw do
  root to: 'static_pages#root'
  resource :session, only: [:new, :create, :destroy]
  namespace :api, defaults: {format: :json} do
    resource :session, only: [:new, :create, :destroy]
    resources :personalities, only: [:create, :update, :show]
    resources :users, only: [:new, :create, :show]
    resources :genders, only: [:create, :show]
    resources :ethnicities, only: [:create, :show]
    resources :orientations, only: [:create, :show]
  end
end
