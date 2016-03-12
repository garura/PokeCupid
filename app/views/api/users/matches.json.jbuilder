@matches.each do |match|
  personality = match.poke_personality
  age = {age: (Time.now - match.birthday.to_time) / 60 / 60 / 24 / 365 }
  points = {points: User.match_points(@user, match) }
  json.set! match.id do
    json.userInfo do
      json.extract! match, :username, :type_one, :type_two, :photo_url
      json.extract! age, :age
      json.extract! points, :points
    end
    json.personality do
      json.extract! personality, :summary, :daily, :skills, :favorites, :six, :friday,
             :message, :min_level, :max_level, :battling, :friendship,
             :breeding, :caught, :rarecandy, :pokerus
    end
  end
end
