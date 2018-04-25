# ===================================
# | community_boards controller     |
# ===================================
class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  # ====================
  # | index route      |
  # ====================
  def index
    render json: Users.all
  end

  # ====================
  # | show route       |
  # ====================
  def show
    render json: Users.find(params["id"])
  end

  # ====================
  # | create route     |
  # ====================
  def create
    # render json: params
    render json: Users.create(params["user"])
  end

  # ====================
  # | delete route     |
  # ====================
  def delete
    render json: Users.delete(params["id"])
  end

  # ====================
  # | update route     |
  # ====================
  def update
    render json: Users.update(params["id"], params["user"])
  end
end
