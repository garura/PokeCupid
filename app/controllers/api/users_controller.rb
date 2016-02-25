class Api::UsersController < ApplicationController

  def new
    redirect_to root_url if current_user
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    birthday = Time.new(params[:year], params[:month], params[:day])
    @user.birthday = birthday
    if @user.save
      log_in!(@user)
      render :new
    else
      render :empty, status: :unauthorized
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
