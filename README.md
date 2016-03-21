# PokéCupid

[Live link][heroku]

[heroku]: pokecupid.herokuapp.com

PokéCupid is a Pokémon themed dating web app. PokéCupid allows users to create an account for the site, specifying the types they are interested in and what types they are. Alternatively, they can use the demo account. Users can update their personal info, answer up to six questions, and match with other users. The matches are made based on shared responses to the questions, as well as types. The user is able to see the profile pages of their matches.

## Overview
PokéCupid uses Ruby on Rails for the backend, satisfying the CRUD needs of the the application. The frontend uses React.js, using the Flux application architecture.

### Data
The app uses PostgreSQL, with the following tables:

**users**

| column name | data type | details |
| --- | :---: | --- |
| username | string | not null, unique |
| email | string | not null, unique |
| session_token | string | not null |
| password_digest | string | not null |
| birthday | string | not null |
| type_one | string | not null |
| type_two | string | |
| response | string | not null |
| photo_url | string | not null |
| created_at | datetime | not null |
| updated_at | datetime | not null |

**poke_preferences**

| column name | data type | details |
| --- | :---: | --- |
| user_id | integer | not null, unique in scope of poke_type |
| poke_type | string | not null |
| created_at | datetime | not null |
| updated_at | datetime | not null |

**poke_personalities**

| column name | data type | details |
| --- | :---: | --- |
| user_id | integer | unique |
| summary | text | |
| daily | text | |
| skills | text | |
| favorites | text | |
| six | text | |
| friday | text | |
| message | text | |
| min_level | integer | default: 18 |
| max_level | integer | default: 100 |
| battling | boolean | not null, default: false |
| friendship | boolean | not null, default: false |
| breeding | boolean | not null, default: false |
| caught | boolean | not null, default: false |
| rarecandy | string | default: "Never" |
| pokerus | boolean | default: false |
| created_at | datetime | not null |
| updated_at | datetime | not null |


