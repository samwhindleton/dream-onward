# ===================================
# | community_boards controller     |
# ===================================
class UserBoardsController < ApplicationController
  skip_before_action :verify_authenticity_token

  # ====================
  # | index route      |
  # ====================
  def index
    render json: UserBoards.all
  end

  # ====================
  # | show route       |
  # ====================
  def show
    render json: UserBoards.find(params["id"])
  end

  # ====================
  # | create route     |
  # ====================
  def create
    # render json: params
    render json: UserBoards.create(params["user_board"])
  end

  # ====================
  # | delete route     |
  # ====================
  def delete
    render json: UserBoards.delete(params["id"])
  end

  # ====================
  # | update route     |
  # ====================
  def update
    render json: UserBoards.update(params["id"], params["user_board"])
  end
end
