# OkChris

[Heroku link][heroku]

[heroku]: MyWebsite...ComingSoon

## Minimum Viable Product

OkChris is a web application inspired by OkCupid built using Ruby on Rails and
React.js. OkChris allows users to:

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Personalize user profile and answer personality questionnaire
- [ ] Match with other users based on questionnaire answers
- [ ] View profiles of matched users
- [ ] Like users and view users who like you

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Stores][stores]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[stores]: ./docs/stores.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [ ] create new project
- [ ] create `User` model
- [ ] authentication
- [ ] user signup/signin pages
- [ ] blank landing page after signin

### Phase 2: Personality Model, API, and basic APIUtil (1.5 days)

**Objective:** Personalities can be edited and read through the API.

- [ ] create `Personality` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for notes (`PersonalitiesController`)
- [ ] jBuilder views for personalities
- [ ] setup Webpack & Flux scaffold
- [ ] setup `APIUtil` to interact with the API
- [ ] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1.5 days)

**Objective:** Personalities can be edited and read with the
user interface.

- [ ] setup the flux loop with skeleton files
- [ ] setup React Router
- implement each user and personality component, building out the flux loop as
  needed.
  - [ ] `UserIndex`
  - [ ] `UserIndexItem`
  - [ ] `UserDetails`
  - [ ] `PersonalityForm`
- [ ] Creating an account will present the PersonalityFrom.

### Phase 4: Start Styling (0.5 days)

**Objective:** Existing pages (including signup/signin) will look good.

- [ ] create a basic style guide
- [ ] position elements on the page
- [ ] add basic colors & styles

### Phase 5: Matches (1.5 days)

**Objective:** Matches belong to two Users, and a user can view their matches.

- [ ] create `Match` model
- build out API, Flux loop, and components for:
  - [ ] Match create, read, delete
  - [ ] matches require being logged in
  - [ ] viewing users through match associations
- Use CSS to style new views

### Phase 6: Likes (1.5 days)

**Objective:** Users can like other users (allow unmatched likes?)

- [ ] create `Like` model and join table
- build out API, Flux loop, and components for:
  - [ ] fetching likes for user
  - [ ] adding likes to user
  - [ ] removing likes from user
  - [ ] viewing users who like you
- [ ] Style new elements


### Phase 7: Styling Cleanup and Seeding (1 day)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] Allow messaging between users (if matched?)
- [ ] Location

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
