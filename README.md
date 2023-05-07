# warehouse

User creates a warehouse and warehouse layout, adding shelves to zones. The UI let's users see where shelves are being assigned within the 12 zones in a warehouse. Users can add as many shelves to a warehouse as they want, but each zone only holds 10 shelves. Therefor, the app does not let users submit more than 10 shelves to a zone. Shelf names must be unique, and the app will not let users submit a warehouse layout containing duplicate shelf names. 

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
1. Server is using PSQL database. You should create a postgres database with the name of your preferences and create a .env file with the following keys
```js
// SERVER APPLICATION
PORT=3001


PGUSER=
PGHOST=
PGPASSWORD=
PGDATABASE=
PGPORT=
```

2. For reference, here are the queries I used for the SQL tables/relations
```shell
CREATE TABLE shelves (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    warehouse_id INTEGER REFERENCES warehouses(id),
    zone INTEGER NOT NULL check(zone >= 1 and zone <= 12)
);

CREATE TABLE warehouses (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);
```

3. Run development server
```shell
cd server
npm start
```


### Frontend
1. Run react in developer mode
```shell
cd client
npm start
```
