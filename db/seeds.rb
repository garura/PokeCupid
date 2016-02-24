bday = Time.new(1989, 12, 7).to_s
User.create!(username: "Chris", password: "123123", email: "chris@chris.com", birthday: bday)
Personality.create!(user_id: 1)
Orientation.create!(personality_id: 1, orientation_type: "Straight")
Ethnicity.create!(personality_id: 1, ethnicity_type: "White")
Gender.create!(user_id: 1, gender_type: "Man")
