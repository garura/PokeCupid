class Api::EthnicitiesController < ApplicationController

  def create

  end

  def update

  end

  def show
    @ethnicity = Ethnicity.find(params[:id])
    render :show
  end


  private

  def gender_params
    params.require(:ethnicity).permit(:personality_id, :ethnicity_type)
  end
end
