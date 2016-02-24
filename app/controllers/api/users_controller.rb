class Api::UsersController < ApplicationController

  def new
    redirect_to root_url if current_user
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in!(@user)
      # create personality (, etc.) objects with user_id = @user.id?
      # create gender
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end


  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end

end
