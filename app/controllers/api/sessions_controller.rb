class Api::SessionsController < ApplicationController

  def new
    render :empty, status: :unauthorized
    # redirect_to root_url if current_user
  end

  def create
    @user = User.find_by_credentials(params[:user][:username],
                                     params[:user][:password])
    if @user
      log_in!(@user)
      render :show
    else
      render :empty, status: :unauthorized
    end
  end

  def destroy
    log_out!
    redirect_to root_url
  end


end
