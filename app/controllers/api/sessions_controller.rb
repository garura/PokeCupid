class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(params[:user][:username],
                                     params[:user][:password])
    if @user
      log_in!(@user)
      render :show
    else
      render json: {errors: ["Invalid Username/Password combination"]}, status: :unauthorized
    end
  end

  def destroy
    log_out!
    redirect_to root_url
  end


end
