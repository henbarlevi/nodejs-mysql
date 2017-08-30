import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as config from 'config';

import appRoutes from './routes/appRoutes';

import { MySqldb } from './db/mysql';
const ENV: string = process.env.ENV || 'local';
const envConfig: any = config.get(`${ENV}`);
const connectionString: string = envConfig.connectionString || 'mongodb://localhost/mydb';

//const connectionString: string = process.env.DB_CONNECTION_STRING || 'mongodb://localhost/mydb';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express(); //THE APP
    this.middleware();
    this.routes();
    mongoose.connect(connectionString);
    //MTSql 
    let mysql = new MySqldb();
    mysql.createConnection();
    mysql.connect();
    //mysql.createdb('mysqldb');
    //creating table exmaple:
    const usersTable = `CREATE TABLE Users
    (
      userId int AUTO_INCREMENT,
      FirstName varchar(30) not null,
      LastName varchar(30) not null,
      HomeTown varchar(30),
      Workplace varchar(30),
      PhoneNumber varchar(30),
      RelationshipWithUser int references Users(UserID),
      primary key(userId) 
    )`;
    mysql.query(usersTable)
      .then(result => {
        console.log('table created!');
        console.log(result);
      })
      .catch(err => console.log('ERR' + err));
    //create new user:
    let sql = `insert into Users (FirstName,LastName,HomeTown,PhoneNumber) values('Hen','Bar-Levi','Bat-Yam','052-4771068') `;
    mysql.query(sql)
      .then(result => {
        console.log('user created!');
        console.log(result);
      })
      .catch(err => console.log('ERR' + err));
    //get users
    mysql.query(`SELECT * FROM Users WHERE FirstName ='Hen' `)
      .then(result => {
        console.log('user named hen home town :');
        console.log(result[0].HomeTown);
      })
      .catch(err => console.log('ERR' + err));
  }

  // Configure Express middleware.
  private middleware(): void {

    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));

  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    this.express.use('/', appRoutes);
  }



}

export default new App().express; //export instance of new app