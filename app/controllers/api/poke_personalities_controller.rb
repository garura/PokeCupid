class Api::PokePersonalitiesController < ApplicationController

  def create
    # happens only when user signs up?
    # make and save personality object with no responses but user_id
  end

  def update
    @poke_personality = PokePersonality.find(params[:id])
    @poke_personality.update
    render :show
  end

  def show
    @poke_personality = PokePersonality.find(params[:id])
    render :show # jbuilder
  end


  private

  def personality_params
    params.require(:personality).
      permit(:user_id, :summary, :daily, :skills, :favorites, :six, :friday,
             :message, :min_level, :max_level, :battling, :friendship,
             :breeding, :caught, :rarecandy, :pokerus)
  end
end
