# capstone-expenses-app
Capstone Expenses APP

# Developer guide

### Prerequirements:

##### Node && NPM
  Install from [https://nodejs.org/en/download/current/](https://nodejs.org/en/download/current/)

##### Mongo
  Install from [https://docs.mongodb.com/manual/installation/](https://docs.mongodb.com/manual/installation/)

##### .evn file

- Create `server/.env` file containing
```
PORT=3000
JWT_SECRET="<whatever the secret is>"
```
- do the same for `client` folder, but containing
```
PORT=8000
```

### Run project

0. Have MongoDB running on port `27017` (This is the default port, you do not have to change anything; just run)
1. Go to the project folder
2. Running Server
```
$ cd server/
$ npm install
$ npm start
```
3. Running React App
```
$ cd client/
$ npm install
$ npm start
```