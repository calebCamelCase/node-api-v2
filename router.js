// 1. import express; create instance of Router()
const express = require('express')
const router = express.Router()

// 3. create a fetch
const fetch = (...args)=> import('node-fetch').then(({default: fetch})=> fetch(...args))

// 4. create Port
const PORT = process.env.PORT || 3000

// 5. use public folder; gives us acces to public directory
router.use(express.static('public'))

// 6. create our pages
// 6a home page
router.get('/home', (req,res)=> {
    // render(path/page=> where we're rendering, obj=> what we're rendering)
    res.render('pages/home', {
        title:'Home',
        name: 'Wendigo Blockbuster'
    })
})

router.get('/movie', (req, res)=> {
    const url = `http://localhost:${PORT}/api/movie`

    fetch(url)
        .then(res => res.json())
        .then(data => res.render('pages/movie', {
            title: 'Movies',
            name: 'Movies',
            data: data
        }))
})

// single movie
router.get('/movie/:id', (req,res)=> {
    const id = req.params.id
    const url = `http://localhost:${PORT}/api/movie/${id}`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.render('pages/single_movie', {
                title: `${data.title}`,
                name: `${data.title}`,
                data
            })
        })
})

router.get('/actor', (req, res)=> {
    const url = `http://localhost:${PORT}/api/actor`

    fetch(url)
        .then(res => res.json())
        .then(data =>{
            console.log(data)
        res.render('pages/actor', {
            title: 'Actors',
            name: 'Actors',
            data: data
        })})
    
    })

router.get('/director', (req, res)=> {
    const url = `http://localhost:${PORT}/api/director`

    fetch(url)
        .then(res => res.json())
        .then(data =>{
            console.log(data)
        res.render('pages/director', {
            title: 'Directors',
            name: 'Directors',
            data: data
        })})
    
    })

router.get('/producer', (req, res)=> {
    const url = `http://localhost:${PORT}/api/producer`

    fetch(url)
        .then(res => res.json())
        .then(data =>{
            console.log(data)
        res.render('pages/producer', {
            title: 'Producers',
            name: 'Producers',
            data: data
        })})
    
    })

router.get('/genre', (req, res)=> {
    const url = `http://localhost:${PORT}/api/genre`

    fetch(url)
        .then(res => res.json())
        .then(data =>{
            console.log(data)
        res.render('pages/genre', {
            title: 'Genres',
            name: 'Genres',
            data: data
        })})
    
    })

// 6b error page
router.get('*', (req,res)=> {
    if(req.url == '/favicon.ico/') {
        res.end()
    } else {
        res.send('<h1>404 ERROR - this page does not exist!</h1>')
    }
})

// 2. Export router
module.exports = router