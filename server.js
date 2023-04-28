const express = require('express')
const fs = require('fs')
const mysql = require('mysql2')

const PORT = process.env.PORT || 3001;

const app = express();

//establishing connection to db
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'movie_db'
    },
    console.log('Connected to movie_db')
);

db.query('\. schema.sql', (err, results)=>{
    if(err){
      console.log(err)
    }
    console.log(results)
})

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes

app.post('/api/add-movie', (req,res)=>{
    console.log(req.body)
})

















app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });