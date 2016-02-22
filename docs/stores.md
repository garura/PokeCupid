# Flux Stores

### MatchStore

Holds all persisted match data.

##### Actions:
- `receiveAllMatches`
- `receiveSingleMatch`
- `removeMatch`

##### Listeners:
- `UserMatchIndex`
- `UserMatchDetail`


### LikeStore

Holds all persisted like data.

##### Actions:
- `receiveAllLikes`
- `receiveSingleLike`
- `removeLike`

##### Listeners:
- `UserLikeIndex`
- `UserLikeDetail`

### PersonalityFormStore

Holds un-persisted personality data to send to the API.

##### Actions:
- `receivePersonalityFormParams`

##### Listeners:
- `PersonalityForm`
