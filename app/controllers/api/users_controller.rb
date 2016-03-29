require_relative '../../models/poke_personality.rb'

class Api::UsersController < ApplicationController


# User.where("type_one IN (?) OR type_two IN (?)", ["Dark", "Fighting"], ["Dark", "Fighting"])

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
    @age = {age: (Time.now - @user.birthday.to_time) / 60 / 60 / 24 / 365 }
    render :show
  end

  def session_info
    @user = User.find(params[:id])
    @age = {age: (Time.now - @user.birthday.to_time) / 60 / 60 / 24 / 365 }
    render :new
  end

  def response_text
    user = User.find(params[:user_id])
    user_response = user.response
    render json: {response: user_response}
  end

  def update_picture
    @user = User.find(params[:id])
    @user.update!(user_params)
    @age = {age: (Time.now - @user.birthday.to_time) / 60 / 60 / 24 / 365 }
    render :new
  end

  def update_response
    user = User.find(params[:id])
    user.update!(user_params)
    user_response = user.response
    render json: {response: user_response}
  end

  def matches
    @user = User.includes(:poke_preferences).find(params[:id])
    @matches = @user.matches(@user.poke_preferences) # save another query by passing preferences
    render :matches
  end


  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :type_one, :type_two, :response, :photo_url)
  end

end
