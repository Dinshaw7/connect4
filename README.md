# Connect4 Game Backend

## Understanding all components

The Connect4 game consists of `Four` components :-
- **GameController** : It is the `Controller layer` for the connect4 game service.
- **GameService**: It is the `Service layer` to delegate incoming calls from controller to core components of the game.
- **GameRepository**: It is a `DAO` for GameDb.
- **Core**: Contains the logic for `Winner-identification` and `Move-making`.

---
## Setup everything from scratch
- Run `cd connect4`

  ### Setup node and npm
  - Run `sudo apt update`
  - Run `sudo apt install nodejs` and press `Y` when asked.
  - Run `sudo apt install npm` and press `Y` when asked.

- Run `npm i` to install all dependencies.

  ### Setup typescript and ts-node
  - Run `sudo npm i -g typescript`
  - Run `sudo npm i -g ts-node`

  ### Setup mongodb
  - follow the instruction mentioned here to setup mongodb `https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/`
---

## How to run

- Make sure mongodb is up and running.
- Copy everything from `.env.example` and paste them in `.env` file in project root.
- Make sure that `SERVER_PORT`, `MONGO_URL` and `DB_NAME` is correctly mentioned in the `.env` file in project root.
- Run `cd connect4/` followed by `npm i` followed by `npm run start` or `ts-node index.ts`

---

## How to test Running cloud instance
- Service is up and running on Amazon EC2 ubuntu instance at `http://ec2-13-232-189-189.ap-south-1.compute.amazonaws.com:8080/`
- Refer api document at `./api/swagger-doc.yaml` for information related to endpoints of connect4.

---

## Mandatory Environment variables for connect4 service
##### .env
```
SERVER_PORT=8080
MONGO_URL=mongodb://localhost:27017
DB_NAME=gameDB
```

---
#### Author : **Dinshaw Kothari**   ( dinshawkothari@gmail.com )
---
