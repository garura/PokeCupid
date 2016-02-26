class Api::PokePreferencesController < ApplicationController

  def create
    @poke_preferences = PokePreference.new(poke_params)
    if @poke_preferences.save
      render :show
    end
  end

  def show
    @poke_preferences = PokePreference.find(params[:id])
  end

  def destroy

  end

  private

  def poke_params
    params.require(:poke_preferences).permit(:user_id, :poke_type)
  end
end
