# ===================================
# | community_boards controller     |
# ===================================
class CommunityBoardsController < ApplicationController
  skip_before_action :verify_authenticity_token

  # ====================
  # | index route      |
  # ====================
  def index
    render json: CommunityBoards.all
  end

  # ====================
  # | show route       |
  # ====================
  def show
    render json: CommunityBoards.find(params["id"])
  end

  # ====================
  # | create route     |
  # ====================
  def create
    # render json: params
    render json: CommunityBoards.create(params["community_board"])
  end

  # ====================
  # | delete route     |
  # ====================
  def delete
    render json: CommunityBoards.delete(params["id"])
  end

  # ====================
  # | update route     |
  # ====================
  def update
    render json: CommunityBoards.update(params["id"], params["community_board"])
  end
end
