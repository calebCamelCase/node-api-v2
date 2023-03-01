const express = require ('express')
const server = express()
// import ./router
const router = require('./router')
const PORT = 3000 || process.env.PORT

const mysql = require('mysql')
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: "movieDB"
})

con.connect((error)=> {
    if(!error) {
        console.log('Database is connected...')
    } else {
        console.log('Database Connection Error', error)
    }
})

server.get('/', (req,res)=> {
    res.json({
        'All Movies': `http://localhost:${PORT}/api/movie`,
        'All Actors': `http://localhost:${PORT}/api/actor`,
        'All Directors': `http://localhost:${PORT}/api/director`,
        'All Producers': `http://localhost:${PORT}/api/producer`,
        'All Genres': `http://localhost:${PORT}/api/genre`,
    })
})

server.get('/api/movie', (req,res)=> {
    con.query(
        'select * from movie',
/*         `SELECT m.title, m.duration, m.rating, m.year, m.description, m.image,
        CONCAT(d.fName, " ", d.lName) as director, 
        p.producer,
        g.genre,
        CONCAT(a.fName, " ", a.lName) as actor
        FROM movie m
        INNER JOIN director d
        ON m.director_id = d.director_id
        INNER JOIN producer p 
        ON m.producer_id = p.producer_id
        INNER JOIN movie_genre mg
        ON m.movie_id = mg.movie_id
        INNER JOIN genre g 
        ON mg.genre_id = g.genre_id
        INNER JOIN movie_actor ma 
        ON m.movie_id
        INNER JOIN actor a 
        ON ma.actor_id = a.actor_id;`,
 */        (error, rows)=> {
            if(!error) {
                if(rows.length === 1){
                    res.json(...rows)
                } else {
                    res.json(rows)
                }
            } else {
                console.log('Error', error)
            }
        }
    )
})
server.get('/api/actor', (req,res)=> {
    con.query(
        'select * from actor',
        (error, rows)=> {
            if(!error) {
                if(rows.length === 1){
                    res.json(...rows)
                } else {
                    res.json(rows)
                }
            } else {
                console.log('Error', error)
            }
        }
    )
})

//fill in later...

server.get('/api/movie/:id', (req,res)=>{
    const id = req.params.id
    con.query(
        `select * from movie where movie_id = ${id}`,
        (error,rows)=>{
            if(!error) {
                if(rows.length === 1) {
                    res.json(...rows)
                } else {
                    res.json(rows)
                }
            } else {
                console.log('Error', error)
            }
        }
    )
})

server.get('/api/actor/:id', (req,res)=>{
    const id = req.params.id
    con.query(
        `select * from actor where movie_id = ${id}`,
        (error,rows)=>{
            if(!error) {
                if(rows.length === 1) {
                    res.json(...rows)
                } else {
                    res.json(rows)
                }
            } else {
                console.log('Error', error)
            }
        }
    )
})

server.get('/api/director/:id', (req,res)=>{
    const id = req.params.id
    con.query(
        `select * from director where movie_id = ${id}`,
        (error,rows)=>{
            if(!error) {
                if(rows.length === 1) {
                    res.json(...rows)
                } else {
                    res.json(rows)
                }
            } else {
                console.log('Error', error)
            }
        }
    )
})

server.get('/api/producer/:id', (req,res)=>{
    const id = req.params.id
    con.query(
        `select * from producer where movie_id = ${id}`,
        (error,rows)=>{
            if(!error) {
                if(rows.length === 1) {
                    res.json(...rows)
                } else {
                    res.json(rows)
                }
            } else {
                console.log('Error', error)
            }
        }
    )
})

server.get('/api/genre/:id', (req,res)=>{
    const id = req.params.id
    con.query(
        `select * from genre where movie_id = ${id}`,
        (error,rows)=>{
            if(!error) {
                if(rows.length === 1) {
                    res.json(...rows)
                } else {
                    res.json(rows)
                }
            } else {
                console.log('Error', error)
            }
        }
    )
})

server.set('view engine', 'ejs')

server.use('/', router)

server.listen(PORT, ()=> console.log(`Port ${PORT} is listening...`))