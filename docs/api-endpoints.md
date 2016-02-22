# API Endpoints

## HTML API

### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

### Personalities

- `GET /api/users/:user_id/personalities/:id` #show
- `PATCH /api/users/:user_id/personalities/:id` #update

### Matches

- `POST /api/matches` #create
- `GET /api/matches/:id` #show
- `PATCH /api/matches/:id` #update
- `DELETE /api/matches/:id` #destroy
- `GET /api/users/:user_id/matches` index of all matches for a user

### Likes

- `GET /api/likes` #index
- `POST /api/likes` #create
- `DELETE /api/likes/:id` #destroy
- `GET /api/users/:user_id/likes` index of all likes for a user
