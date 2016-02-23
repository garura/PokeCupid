class SessionsController < ApplicationController

  def new
    redirect_to root_url if current_user
  end

  def create
    user = User.find_by_credentials(params[:user][:username],
                                    params[:user][:password])
    if user
      log_in!(user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid Username/Password combination"]
      render :new
    end
  end

  def destroy
    log_out!
    redirect_to new_session_url
  end


end
