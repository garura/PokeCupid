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
    params.require(:personality).
      permit(:user_id, :summary, :life, :skills, :favorites, :six, :friday,
             :message, :desired_gender, :min_age, :max_age, :desire_single,
             :new_friends, :long_term, :short_term, :casual, :status,
             :relationship_type, :feet, :inches, :centimeters, :body_type,
             :diet, :smoking, :drinking, :drugs, :religion, :sign,
             :edu_progress, :education, :offspring, :dogs, :cats)
  end
end
