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

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes

app.get('/api/movies', (req,res)=>{
    db.query('SELECT movie_name FROM movie_info', (err,results)=>{
        if(err){
            console.log(err);
        }
        res.send(results)
    })
})

app.post('/api/add-movie', (req,res)=>{
    if(req.body){
        console.log(req.body.movie_name)
        let newMovie = req.body.movie_name

        db.query(`INSERT INTO movie_info (movie_name) VALUE (?)`, newMovie, (err,results)=>{
            if(err){
                console.log(err)
            } else{
                console.log('movie successfully added into db')
            }
        })
        db.query('SELECT movie_name FROM movie_info', (err,results)=>{
            if(err){
                console.log(err);
            }
            res.send(results)
        })
    }
})

app.delete('/api/movie/:id',(req,res)=>{
    let movieId = req.params.id

    db.query(`DELETE FROM movie_info WHERE id = ?`, movieId, (err,results)=>{
        if(err){
            console.log(err)
        }else{
            console.log(`movie with the id of ${movieId} has been deleted`)
        }
        // console.log(results)
    })
    db.query('SELECT * FROM movie_info', (err,results)=>{
        if(err){
            console.log(err);
        }
        res.send(results)
    })
})

app.get('/api/movie-reviews',(req,res)=>{
    db.query('SELECT movie_name, review_info.review AS review FROM movie_info INNER JOIN review_info ON movie_info.id = review_info.movie_id', (err,results)=>{
        if(err){
            console.log(err);
        }
        res.send(results)
    })
})

app.put('/api/review/:id',(req,res)=>{
    let movieId = req.params.id
    let reviewChange = req.body.updatedReview

    db.query(`UPDATE review_info SET review = ? WHERE id = ?`, [reviewChange, movieId],(err,results)=>{
        if(err){
            console.log(err)
        }else{
            console.log(`movie with the id of ${movieId}'s review has been updated`)
        }
    })
    db.query('SELECT movie_name, review_info.review AS review FROM movie_info INNER JOIN review_info ON movie_info.id = review_info.movie_id', (err,results)=>{
        if(err){
            console.log(err);
        }
        res.send(results)
    })
})















app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });