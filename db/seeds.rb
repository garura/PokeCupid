User.create!(username: "Chris", password: "123123")
Personality.create!(user_id: 1)
Orientation.create!(personality_id: 1, orientation_type: "Straight")
