require_relative '../../models/poke_personality.rb'

class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    if @user.type_one == ""
      @user.type_one = nil
    end
    if @user.type_two == ""
      @user.type_two = nil
    end

    @user.birthday = Time.new(params[:year], params[:month], params[:day])

    if @user.save
      PokePersonality.create!(user_id: @user.id)
      preferences = params[:preferences]
      preferences.each do |preference|
        PokePreference.create!(user_id: @user.id, poke_type: preference)
      end
      @age = {age: (Time.now - @user.birthday.to_time) / 60 / 60 / 24 / 365 }
      log_in!(@user)
      render :new
    else
      @errors = @user.errors.full_messages
      render json: {errors: @errors}, status: :unauthorized
    end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end


  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :type_one, :type_two)
  end

end
