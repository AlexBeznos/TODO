class HomeController < ApplicationController
  def index
  end

  def isUser
  	if current_user
  	  render json: true
  	else
  	  render json: false
  	end
  end
end
