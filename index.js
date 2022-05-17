const express = require('express');
const app = express() ;
const mysql = require("mysql"); 
const dotenv = require("dotenv");
var session = require('express-session');
dotenv.config({ path : './.env' });
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
})
let ejs = require('ejs');
app.use(express.static('public'));
app.set('view engine', 'ejs');
db.connect((err)=> {
       if(err){
         console.log(err)
       }else{
       console.log('database connected');
}})
// tjib data mel HTML  form ya gens 
app.use(express.urlencoded({ extended : false}));
// data li tjibha ml api tji json 
app.use(express.json());
// define routes 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use('/', require('./routes/pages')) ; 
app.use('/auth', require('./routes/auth')); 
app.listen(3000)