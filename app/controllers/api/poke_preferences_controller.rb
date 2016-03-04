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

  def update
    user = User.includes(:poke_preferences).find(params[:id])
    @poke_preferences = user.poke_preferences

    current_preferences = []
    @poke_preferences.each do |pref|
      current_preferences << pref.poke_type
    end
    preferences_to_delete = current_preferences - params[:preferences]
    preferences_to_add = params[:preferences] - current_preferences

    @poke_preferences.each do |pref|
      if preferences_to_delete.include?(pref.poke_type)
        pref.destroy
      end
    end

    preferences_to_add.each do |type|
      PokePreference.create(user_id: user.id, poke_type: type)
    end
    
    @poke_preferences = PokePreference.all.where(user_id: user.id)
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
