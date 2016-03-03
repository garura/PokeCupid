class Api::PokePersonalitiesController < ApplicationController

  def create
    # happens only when user signs up?
    # make and save personality object with no responses but user_id
  end

  def update
    user = User.includes(:poke_personality).find(params[:id])
    @poke_personality = user.poke_personality
    @poke_personality.update!(personality_params)
    render :show
  end

  def show
    user = User.includes(:poke_personality).find(params[:id])
    @poke_personality = user.poke_personality
    render :show
    # @poke_personality = PokePersonality.find(params[:id])
    # render :show # jbuilder
  end


  private

  def personality_params
    params.require(:personality).
      permit(:user_id, :summary, :daily, :skills, :favorites, :six, :friday,
             :message, :min_level, :max_level, :battling, :friendship,
             :breeding, :caught, :rarecandy, :pokerus)
  end
end
