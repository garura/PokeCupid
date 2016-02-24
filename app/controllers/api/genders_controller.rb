class Api::GendersController < ApplicationController

  def create

  end

  def update

  end

  def show
    gender_id = params[:id]
    @gender = Gender.find(gender_id)
    render :show
  end


  private

  def gender_params
    params.require(:gender).permit(:user_id, :gender_type)
  end
end
