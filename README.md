# capstone-expenses-app
Capstone Expenses APP

# Developer guide

### Prerequirements:

If node/nmp version mismatch is found, make use of [nvm](https://github.com/nvm-sh/nvm) to upgrade/downgrade

##### Minimum requirements

* node - `^14.0.0`
* npm - `^6.0.0`
* mongodb - `^4.0.0`

##### Node && NPM
  Install from [https://nodejs.org/en/download/current/](https://nodejs.org/en/download/current/)

##### Mongo
  Install from [https://docs.mongodb.com/manual/installation/](https://docs.mongodb.com/manual/installation/)

##### .evn file

- Create `server/.env` file containing
```
PORT=3000
JWT_SECRET="<whatever the secret is>"
NODE_ENV="development"
```
- do the same for `client` folder, but containing
```
PORT=8000
NODE_ENV="development"
```

### Runnign MongoDB

##### Mac

`$ brew services start mongodb-community`

`$ brew services list ' to verify`

##### Linux

###### service
`$ sudo service start mongod`

`$ sudo service status mongod ' to verify`

###### systemctl
`$ sudo systemctl start mongod`

`$ sudo systemctl status mongod ' to verify`

##### Windows

Open `C:\Program Files\MongoDB\Server\4.4\bin` or if you specified other location for installation use it

run `mongod.exe`

run MongoDB Compass and connect with `localhost:27017` to verify that the database server is running

### Run project

1. Open Termial
2. Go to the downloaded project folder
3. To run server go to the `server` folder in the project
4. Run
```
$ npm install
$ npm start
```
5. To Run the client open a new terminal window and navigate to the client folder of the project folder
6. Run
```
$ npm install
$ npm start
```
