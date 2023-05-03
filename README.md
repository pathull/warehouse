# warehouse

Event Planner App is a platform where you can create, manage, track, and update events seamlessly. Invite friends, colleagues, or family to event pages where you can chat and organize event resources all in one place. No more spreadsheets and unorganized group chats. 

## Screenshot

<p align="center">

<img src="https://user-images.githubusercontent.com/94504789/235816596-84db7471-8f26-4ee3-98d9-57816f167578.png" />

</p>

## Getting started
1. Clone the repo
```shell
git clone https://github.com/pathull/warehouse.git
cd warehouse
```

2. Run command to install dependencies backend and frontend
```shell
cd client
npm install
```
```shell
cd server
npm install
```

### Backend
1. Server is using PSQL database, You should create a postgres database with the name of your preferences and create a .env file with the following keys
```js
// SERVER APPLICATION
PORT=3001


PGUSER=
PGHOST=
PGPASSWORD=
PGDATABASE=
PGPORT=

2. Run development server
```shell
npm start
```

### Frontend
1. Run react in developer mode
```shell
npm start
```
