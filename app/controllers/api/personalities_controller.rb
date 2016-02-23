class Api::PersonalitiesController < ApplicationController

  def create
    # happens only when user signs up?
    # make and save personality object with no responses but user_id
  end

  def update
    @personality = Personality.find(params[:id])
    @personality.update
    render :show
  end

  def show
    @personality = Personality.find(params[:id])
    render :show # jbuilder
  end


  private

  def personality_params
    params.require(:personality).permit(:summary, :life, :skills,
                                        :favorites, :six, :friday,
                                        :message, :user_id)
  end
end
