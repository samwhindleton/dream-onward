Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/community_board', to: 'community_board#index'
  get '/community_board/:id', to: 'coummunity_board#show'
  post '/community_board', to: 'community_board#create'
  delete '/community_board/:id', to: 'community_board#delete'
  put '/community_board/:id', to: 'community_board#update'
end
