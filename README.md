# PokéCupid

[Live link][heroku]

[heroku]: pokecupid.herokuapp.com

PokéCupid is a Pokémon themed dating web app. PokéCupid allows users to create an account for the site, specifying the types they are interested in and what types they are. Alternatively, they can use the demo account. Users can update their personal info, answer up to six questions, and match with other users. The matches are made based on shared responses to the questions, as well as types. The user is able to see the profile pages of their matches.

## Overview
PokéCupid uses Ruby on Rails for the backend, satisfying the CRUD needs of the the application. The frontend uses React.js, using the Flux application architecture.

### Backend

The app uses PostgreSQL to save and serve data for user info and matches, with the following tables:

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

### Frontend
The views are created with React.js. The app follows the Flux application architecture, and is organized into the following sections:
  - Actions
    - Action events created by user interatctions or component functions that trigger a dispatch to the stores with updated information (often from API requests)
  - Components
    - React components that are response for encapsulating the necessary internal logic of the element, and for responding to updates to stores they listen to
  - Dispatcher
    - The single dispatcher that pulses new information to all stores. Triggered by actions
  - Stores
    - Stores information that React components utilize. Different stores exist to hold different information.
  - Util
    - Contains the different API request methods.
  
The entry file ('ok_chris.jsx') defines the routes of the website, and contains checks that only allows users to see certain pages while logged in.
