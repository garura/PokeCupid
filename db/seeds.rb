User.create!(username: "Chris", password: "123123", email: "chris@chris.com")
Personality.create!(user_id: 1)
Orientation.create!(personality_id: 1, orientation_type: "Straight")
Ethnicity.create!(personality_id: 1, ethnicity_type: "White")
