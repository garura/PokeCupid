@matches.each do |match|
  personality = match.poke_personality
  age = {age: (Time.now - match.birthday.to_time) / 60 / 60 / 24 / 365 }
  json.set! match.id do
    json.userInfo do
      json.extract! match, :username, :type_one, :type_two
      json.extract! age, :age
    end
    json.personality do
      json.extract! personality, :summary, :daily, :skills, :favorites, :six, :friday,
             :message, :min_level, :max_level, :battling, :friendship,
             :breeding, :caught, :rarecandy, :pokerus
    end
  end
end
