class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(params[:user][:username],
                                     params[:user][:password])
    if @user
      log_in!(@user)
      @age = {age: (Time.now - @user.birthday.to_time) / 60 / 60 / 24 / 365 }
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
