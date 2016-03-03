class Api::PokePreferencesController < ApplicationController

  def create

    # allow creation from an array in the params?

    @poke_preferences = PokePreference.new(poke_params)
    if @poke_preferences.save
      render :show
    end
  end

  def show
    user = User.includes(:poke_preferences).find(params[:id])
    @poke_preferences = user.poke_preferences
    render :show
  end

  def destroy

    # allow destruction from an array in the params?

  end

  private

  def poke_params
    params.require(:poke_preferences).permit(:user_id, :poke_type)
  end
end
