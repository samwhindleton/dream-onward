Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # |------------------------------|
  # | community_boards             |
  # |------------------------------|
  # ====================
  # | index route      |
  # ====================
  get '/community_boards', to: 'community_boards#index'
  # ====================
  # | show route       |
  # ====================
  get '/community_boards/:id', to: 'community_boards#show'
  # ====================
  # | create route     |
  # ====================
  post '/community_boards', to: 'community_boards#create'
  # ====================
  # | delete route     |
  # ====================
  delete '/community_boards/:id', to: 'community_boards#delete'
  # ====================
  # | update route     |
  # ====================
  put '/community_boards/:id', to: 'community_boards#update'

  # |------------------------------|
  # | users                        |
  # |------------------------------|
  # ====================
  # | index route      |
  # ====================
  get '/users', to: 'users#index'
  # ====================
  # | show route       |
  # ====================
  get '/users/:id', to: 'users#show'
  # ====================
  # | create route     |
  # ====================
  post '/users', to: 'users#create'
  # ====================
  # | delete route     |
  # ====================
  delete '/users/:id', to: 'users#delete'
  # ====================
  # | update route     |
  # ====================
  put '/users/:id', to: 'users#update'

  # |------------------------------|
  # | user_boards                  |
  # |------------------------------|
  # ====================
  # | index route      |
  # ====================
  get '/user_boards', to: 'user_boards#index'
  # ====================
  # | show route       |
  # ====================
  get '/user_boards/:id', to: 'user_boards#show'
  # ====================
  # | create route     |
  # ====================
  post '/user_boards', to: 'user_boards#create'
  # ====================
  # | delete route     |
  # ====================
  delete '/user_boards/:id', to: 'user_boards#delete'
  # ====================
  # | update route     |
  # ====================
end
