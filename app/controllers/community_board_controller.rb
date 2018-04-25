class CommunityBoardController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
        render json: CommunityBoardImage.all
    end

    def show
        render json: CommunityBoardImage.find(params["id"])
    end

    def create
        render json: CommunityBoardImage.create(params["CommunityBoardImage"])
    end

    def delete
        render json: CommunityBoardImage.delete(params["id"])
    end

    def update
        render json: CommunityBoardImage.update(params["id"], params["CommunityBoardImage"])
    end
end
