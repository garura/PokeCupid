bday = Time.new(1989, 12, 7).to_s
User.create!(username: "Chris", password: "123123", email: "chris@chris.com", birthday: bday, type_one: "Water")
PokePersonality.create!(user_id: 1)
