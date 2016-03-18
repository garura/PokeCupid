days = (1..28).to_a
months = (1..12).to_a
years = (1917..1997).to_a

types = %w(Normal Fighting Flying Poison Ground Rock Bug Ghost Steel Fire Water Grass Electric Psychic Ice Dragon Dark Fairy)

bday = Time.new(1989, 12, 7).to_s
User.create!(username: "Chris", password: "123123", email: "chris@chris.com", birthday: bday, type_one: "Water", response: "      ")
PokePersonality.create!(user_id: 1)
PokePreference.create!(user_id: 1, poke_type: "Fire")
PokePreference.create!(user_id: 1, poke_type: "Grass")
PokePreference.create!(user_id: 1, poke_type: "Dragon")

bday = Time.new(years.sample, months.sample, days.sample)
User.create!(username: "Eevee", password: "123123", email: "eevee@poke.com", birthday: bday, type_one: "Normal", response: "TTFTFF", photo_url: "http://res.cloudinary.com/dxclocey3/image/upload/v1458077777/latest_toto97.png")
PokePersonality.create!(user_id: 2, summary: "I'm pretty new, but I'm glad to be here! Can't wait to explore my options.", daily: "I think about my future a lot... there's so many different options for me!", skills: "I can sand-attack really well!", favorites: "I love curling up in the sun :)", six: "I love my naps.", friday: "Exploring a mysterious dungeon!", message: "You don't mind that I'm still learning.", min_level: 18, max_level: 100, battling: false, friendship: true, breeding: false, rarecandy: "Never", pokerus: false, caught: false)
types.sample(6).each do |type|
  PokePreference.create!(user_id: 2, poke_type: type)
end

bday = Time.new(years.sample, months.sample, days.sample)
User.create!(username: "Machamp", password: "123123", email: "machamp@poke.com", birthday: bday, type_one: "Fighting", response: "TFFTTF", photo_url: "http://res.cloudinary.com/dxclocey3/image/upload/v1458257157/latest_uidzcy.png")
PokePersonality.create!(user_id: 3, summary: "I want to win the Pokken Tournament.", daily: "I train at the Saffron fighting dojo a lot.", skills: "I never miss a punch!", favorites: "I really enjoy the opera.", six: "My favorite belt!", friday: "Practicing my fighting moves.", message: "You want to spar.", min_level: 18, max_level: 100, battling: true, friendship: true, breeding: true, rarecandy: "Never", pokerus: false, caught: true)
types.sample(6).each do |type|
  PokePreference.create!(user_id: 3, poke_type: type)
end

bday = Time.new(years.sample, months.sample, days.sample)
User.create!(username: "Koffing", password: "123123", email: "koffing@poke.com", birthday: bday, type_one: "Poison", response: "FFFTFF", photo_url: "http://res.cloudinary.com/dxclocey3/image/upload/v1458078394/250px-109Koffing_fzibbm.png")
PokePersonality.create!(user_id: 5, summary: "I'm a cool guy if you don't mind the smell.", daily: "Still deciding what I want to do.", skills: "Telling jokes.", favorites: "I love surprising people... BOOM!", six: "James <3", friday: "Protecting the world from devastation!", message: "You like jokes... I'm a gas!", min_level: 18, max_level: 100, battling: true, friendship: true, breeding: true, rarecandy: "Never", pokerus: false, caught: false)
types.sample(6).each do |type|
  PokePreference.create!(user_id: 5, poke_type: type)
end

bday = Time.new(years.sample, months.sample, days.sample)
User.create!(username: "Dugtrio", password: "123123", email: "dugtrio@poke.com", birthday: bday, type_one: "Ground", response: "FFFTTF", photo_url: "http://res.cloudinary.com/dxclocey3/image/upload/v1458078436/250px-051Dugtrio_cimqau.png")
PokePersonality.create!(user_id: 6, summary: "You've heard the saying 'Three heads are better than one'?", daily: "Working on a new tunnel, Victory Road was annoying.", skills: "Digging, tunneling, and making holes, respectively.", favorites: "The smell of earth after rain.", six: "My other 2 heads... They really get me.", friday: "Hanging out with my buddy Geodude!", message: "You like to get a little dirty every now and then ;)", min_level: 18, max_level: 100, battling: true, friendship: true, breeding: false, rarecandy: "Anytime I find one!", pokerus: false, caught: true)
types.sample(6).each do |type|
  PokePreference.create!(user_id: 6, poke_type: type)
end

bday = Time.new(years.sample, months.sample, days.sample)
User.create!(username: "Geodude", password: "123123", email: "geodude@poke.com", birthday: bday, type_one: "Rock", type_two: "Ground", response: "TTFTFF", photo_url: "http://res.cloudinary.com/dxclocey3/image/upload/v1458078649/250px-074Geodude_iilbax.png")
PokePersonality.create!(user_id: 7, summary: "I don't like to brag, but I'm a pretty cool d- I mean guy.", daily: "Just trying to level up.", skills: "I always win at rock competitions.", favorites: "Granite, maybe sandstone.", six: "My lucky pebble!", friday: "Already in bed... I sleep like a log.", message: "You don't mind my tough exterior.", min_level: 18, max_level: 100, battling: true, friendship: true, breeding: false, rarecandy: "Never", pokerus: false, caught: false)
types.sample(6).each do |type|
  PokePreference.create!(user_id: 7, poke_type: type)
end

bday = Time.new(years.sample, months.sample, days.sample)
User.create!(username: "Weedle", password: "123123", email: "weedle@poke.com", birthday: bday, type_one: "Bug", type_two: "Poison", response: "TFFTTF", photo_url: "http://res.cloudinary.com/dxclocey3/image/upload/v1458078688/250px-013Weedle_ysmul8.png")
PokePersonality.create!(user_id: 8, summary: "I'm a cool guy. I wish people didn't think bugs were so gross, though.", daily: "Living in Viridian Forest, don't plan on moving anytime soon.", skills: "I can dance really well. My best move is the worm!", favorites: "I love the woods in the morning, before anyone else wakes up.", six: "My running shoes!", friday: "Munching on some leaves.", message: "You like bugs :)", min_level: 18, max_level: 100, battling: true, friendship: true, breeding: false, rarecandy: "Never", pokerus: false, caught: false)
types.sample(6).each do |type|
  PokePreference.create!(user_id: 8, poke_type: type)
end

bday = Time.new(years.sample, months.sample, days.sample)
User.create!(username: "Gengar", password: "123123", email: "gengar@poke.com", birthday: bday, type_one: "Ghost", type_two: "Poison", response: "FFTTTF", photo_url: "http://res.cloudinary.com/dxclocey3/image/upload/v1458078728/250px-094Gengar_zxmcuv.png")
PokePersonality.create!(user_id: 9, summary: "Boo!", daily: "I'm not sure that I'm considered 'alive'...", skills: "I can disappear into the shadows!", favorites: "Lavender Town, it's beautiful.", six: "The night! I'm definitely not a morning person.", friday: "Pranking my friends.", message: "You want a little excitement in your life.", min_level: 18, max_level: 100, battling: true, friendship: true, breeding: true, rarecandy: "Never", pokerus: false, caught: false)
types.sample(6).each do |type|
  PokePreference.create!(user_id: 9, poke_type: type)
end

bday = Time.new(years.sample, months.sample, days.sample)
User.create!(username: "Aggron", password: "123123", email: "aggron@poke.com", birthday: bday, type_one: "Steel", type_two: "Rock", response: "TTTFTF", photo_url: "http://res.cloudinary.com/dxclocey3/image/upload/v1458079162/250px-306Aggron_ymoalj.png")
PokePersonality.create!(user_id: 10, summary: "I'm actually a pretty sensitive pokémon. People judge me too quickly.", daily: "Training to fight the elite four. I think I'll get it this time!", skills: "Keeping a watchful eye on my friends.", favorites: "I love battling to get stronger and gardening.", six: "Alone time. Sometimes I need to just get away and reflect.", friday: "Training. Got to get stronger!", message: "You're nice.", min_level: 18, max_level: 100, battling: true, friendship: true, breeding: true, rarecandy: "Never", pokerus: false, caught: true)
types.sample(6).each do |type|
  PokePreference.create!(user_id: 10, poke_type: type)
end

bday = Time.new(years.sample, months.sample, days.sample)
User.create!(username: "Charizard", password: "123123", email: "charizard@poke.com", birthday: bday, type_one: "Fire", type_two: "Flying", response: "TFFTTT", photo_url: "http://res.cloudinary.com/dxclocey3/image/upload/v1458079400/250px-006Charizard_jm9wm7.png")
PokePersonality.create!(user_id: 11, summary: "I'm definitely the strongest pokémon here.", daily: "Looking for a new opponent to beat.", skills: "Melting boulders, flying high.", favorites: "Fire blast!", six: "The flame on my tail.", friday: "Searching for powerful opponents.", message: "You want to fight!", min_level: 18, max_level: 100, battling: true, friendship: false, breeding: false, rarecandy: "Never", pokerus: false, caught: true)
types.sample(6).each do |type|
  PokePreference.create!(user_id: 11, poke_type: type)
end

bday = Time.new(years.sample, months.sample, days.sample)
User.create!(username: "Squirtle", password: "123123", email: "squirtle@poke.com", birthday: bday, type_one: "Fighting", response: "TFFFTF", photo_url: "http://res.cloudinary.com/dxclocey3/image/upload/v1458079571/250px-007Squirtle_mkagyv.png")
PokePersonality.create!(user_id: 12, summary: "I'm just a 'mon with cool style. People seem to like me.'", daily: "I'm the leader of a pretty cool gang.", skills: "Break-dancing, jokes, bubblebeam.", favorites: "I love hanging out with my squad!", six: "My squad!", friday: "Getting into trouble, running away from Officer Jenny.", message: "You like swimming.", min_level: 18, max_level: 100, battling: true, friendship: true, breeding: false, rarecandy: "Never", pokerus: false, caught: false)
types.sample(6).each do |type|
  PokePreference.create!(user_id: 12, poke_type: type)
end

bday = Time.new(years.sample, months.sample, days.sample)
User.create!(username: "Ivysaur", password: "123123", email: "ivysaur@poke.com", birthday: bday, type_one: "Grass", type_two: "Poison", response: "TFTTTF", photo_url: "http://res.cloudinary.com/dxclocey3/image/upload/v1458079625/250px-002Ivysaur_jv8agw.png")
PokePersonality.create!(user_id: 13, summary: "Just evolved! Still getting used to my new strength.", daily: "Trying to get this flower to grow bigger!", skills: "Vine whipping, mostly. Working on my solar beam!", favorites: "I love a nice sunny day.", six: "Natural scenery. I love the forest too much!", friday: "Reading a nice book.", message: "You have a green thumb!", min_level: 18, max_level: 100, battling: true, friendship: true, breeding: false, rarecandy: "Never", pokerus: false, caught: false)
types.sample(6).each do |type|
  PokePreference.create!(user_id: 13, poke_type: type)
end

bday = Time.new(years.sample, months.sample, days.sample)
User.create!(username: "Pikachu", password: "123123", email: "pikachu@poke.com", birthday: bday, type_one: "Electric", response: "TTTTTT", photo_url: "http://res.cloudinary.com/dxclocey3/image/upload/v1458264168/504387-main_image__ash_s_pikachu_character_page__krbgqb.png")
PokePersonality.create!(user_id: 14, summary: "Hey I'm Pikachu! Pika-Power!", daily: "I thundershock things.", skills: "Shocking things! One time I took down an Onix!", favorites: "My anti-favorite is my pokéball - I HATE it!", six: "Ash <3", friday: "Getting charged.", message: "You know how to party.", min_level: 18, max_level: 100, battling: true, friendship: true, breeding: false, rarecandy: "Never", pokerus: false, caught: true)
types.sample(6).each do |type|
  PokePreference.create!(user_id: 14, poke_type: type)
end

bday = Time.new(years.sample, months.sample, days.sample)
User.create!(username: "Alakazam", password: "123123", email: "alakazam@poke.com", birthday: bday, type_one: "Psychic", response: "FFTFTT", photo_url: "http://res.cloudinary.com/dxclocey3/image/upload/v1458079890/250px-065Alakazam_soqhnt.png")
PokePersonality.create!(user_id: 15, summary: "I have an IQ of over 5000!", daily: "Always learning new things. It's my passion!", skills: "I can bend a spoon with my mind!", favorites: "Teleport... I hardly use my legs these days.", six: "My twisted spoon. It's special to me.", friday: "Practicing my arts.", message: "You don't mind that I can read minds :)", min_level: 18, max_level: 100, battling: true, friendship: true, breeding: true, rarecandy: "Never", pokerus: false, caught: false)
types.sample(6).each do |type|
  PokePreference.create!(user_id: 15, poke_type: type)
end

bday = Time.new(years.sample, months.sample, days.sample)
User.create!(username: "Pidgey", password: "123123", email: "pidgey@poke.com", birthday: bday, type_one: "Normal", type_two: "Flying", response: "TTTTTF", photo_url: "http://res.cloudinary.com/dxclocey3/image/upload/v1458078346/250px-016Pidgey_azp1cy.png")
PokePersonality.create!(user_id: 4, summary: "Just left the nest, out on my own!", daily: "Learning from my mistakes everyday.", skills: "Gust, sand-attack, peck... hope to learn Fly soon!", favorites: "I love caterpie, so cute (and tasty)!", six: "I miss home...", friday: "I like saying hi to people leaving Pallet Town.", message: "You have HM02!", min_level: 18, max_level: 100, battling: true, friendship: true, breeding: false, rarecandy: "Maybe before a big fight", pokerus: false, caught: false)
types.sample(6).each do |type|
  PokePreference.create!(user_id: 4, poke_type: type)
end

bday = Time.new(years.sample, months.sample, days.sample)
User.create!(username: "Articuno", password: "123123", email: "articuno@poke.com", birthday: bday, type_one: "Ice", type_two: "Flying", response: "FFFTFT", photo_url: "http://res.cloudinary.com/dxclocey3/image/upload/v1458079929/250px-144Articuno_czkcru.png")
PokePersonality.create!(user_id: 16, summary: "I'm a pretty secluded pokémon. You won't likely see me too often.", daily: "Currently taking a vacation in the Seafoam Islands.", skills: "Creating a beautiful blanket of snow.", favorites: "I love the smell of winter.", six: "My alone time.", friday: "Watching the currents flow around my islands.", message: "You think you have what it takes.", min_level: 18, max_level: 100, battling: true, friendship: true, breeding: false, rarecandy: "Never", pokerus: false, caught: false)
types.sample(6).each do |type|
  PokePreference.create!(user_id: 16, poke_type: type)
end

bday = Time.new(years.sample, months.sample, days.sample)
User.create!(username: "Dragonite", password: "123123", email: "dragonite@poke.com", birthday: bday, type_one: "Dragon", type_two: "Flying", response: "FFFFFF", photo_url: "http://res.cloudinary.com/dxclocey3/image/upload/v1458080108/250px-149Dragonite_arj8sc.png")
PokePersonality.create!(user_id: 17, summary: "I'm a pretty kindhearted pokémon - if I see you in trouble, I'll lend a hand!", daily: "", skills: "Flying at EXTREME SPEED and hyper beam, of course.", favorites: "There's an old lighthouse by the sea that is very special to me.", six: "The ocean. I find it very soothing.", friday: "Flying around the world!", message: "You're a kindhearted person as well.", min_level: 18, max_level: 100, battling: false, friendship: true, breeding: false, rarecandy: "Never", pokerus: false, caught: false)
types.sample(6).each do |type|
  PokePreference.create!(user_id: 17, poke_type: type)
end

bday = Time.new(years.sample, months.sample, days.sample)
User.create!(username: "Umbreon", password: "123123", email: "umbreon@poke.com", birthday: bday, type_one: "Dark", response: "FTFFTT", photo_url: "http://res.cloudinary.com/dxclocey3/image/upload/v1458080293/250px-197Umbreon_bet3nv.png")
PokePersonality.create!(user_id: 18, summary: "I come from a pretty large family. We're all pretty different, however.", daily: "Training to get stronger.", skills: "I'm pretty good at sneaking around in the dark!", favorites: "I like staying up late. My brother is the morning person, not me.", six: "The moon. It really energizes me!", friday: "Full of energy! Hit me up!", message: "You're up late.", min_level: 18, max_level: 100, battling: true, friendship: true, breeding: true, rarecandy: "Never", pokerus: false, caught: false)
types.sample(6).each do |type|
  PokePreference.create!(user_id: 18, poke_type: type)
end

bday = Time.new(years.sample, months.sample, days.sample)
User.create!(username: "Clefable", password: "123123", email: "clefable@poke.com", birthday: bday, type_one: "Fairy", response: "TTFTTF", photo_url: "http://res.cloudinary.com/dxclocey3/image/upload/v1458080399/250px-036Clefable_uqcuxt.png")
PokePersonality.create!(user_id: 19, summary: "I tend to keep to myself. I guess I'm a bit mysterious.", daily: "Living every day the way I want to.", skills: "I can walk on water! (My wings help a little)", favorites: "I love metronome. I'm so spontaneous!", six: "I could never leave Mt. Moon. It's lovely!", friday: "Going for a moonlit walk.", message: "You're in the area!", min_level: 18, max_level: 100, battling: false, friendship: true, breeding: false, rarecandy: "Never", pokerus: false, caught: false)
types.sample(6).each do |type|
  PokePreference.create!(user_id: 19, poke_type: type)
end
