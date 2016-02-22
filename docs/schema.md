# Schema Information

## personalities
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
q_n_answer  | integer   | questions will be multiple choice, users can
                          choose to leave them blank. number of questions TBD
age         | integer   | other attributes as well (race, height, orientations?)

user_id     | integer   | not null, foreign key (references users), indexed
visible     | boolean   | not null, default: true

## matches
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id_one | integer   | not null, foreign key (references users), indexed
user_id_two | integer   | not null, foreign key (references users), indexed

(what is the best way to have a table with two columns representing same info?)

## likes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
liker_id    | integer   | not null, foreign key (references users), indexed
likee_id    | integer   | not null, foreign key (references users), indexed

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
