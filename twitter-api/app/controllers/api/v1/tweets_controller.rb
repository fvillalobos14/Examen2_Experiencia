module Api::V1
    class TweetsController < ApplicationController
      def index
        @tweets = Tweet.all
        render json: @tweets
      end
  
      def new 
        @tweet = Tweet.new
        render json: @tweet
      end
  
      def create
        @tweet = Tweet.create(tweet_params)
        render json: @tweet
      end
  
      def show
        @tweet = Tweet.find(params[:id])
        render json: @tweet
      end
  
      def update 
        @tweet = Tweet.find(params[:id])
        @tweet.update(tweet_params)
        render json: @tweet
      end
  
      def destroy
        @tweet = Product.find(params[:id])
        @tweet.destroy
      end
  
      private
        def tweet_params
          params.require(:tweet).permit(:username, :body)
        end
    end
  end
