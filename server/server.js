require('dotenv').config()
const Twitter = require('twitter-lite')
const TwitterTwo = require('twitter-v2')
const express = require('express')
const cors = require('cors')
const path = require('path')

//set up server for async api calls and data retrieval
const app = express()
app.use(express.static('build'))
app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(path.resolve('build/index.html'))
})

//use twitter-v2 to get user info and profile img
app.get('/getUser/:user', (req, res) => {
    const userName = req.params.user

    //use api keys to authenticate twitter api
    const clientTwo = new TwitterTwo({
        consumer_key: process.env.REACT_APP_KEY,
        consumer_secret: process.env.REACT_APP_SECRET_KEY,
        access_token_key: process.env.REACT_APP_ACCESS_TOKEN,
        access_token_secret: process.env.REACT_APP_ACCESS_SECRET
    })

    //grab user information and profile pic via username endpoint
    clientTwo.get(`users/by/username/${userName}`, {
        user: {
            fields: 'profile_image_url'
        }
    })
    .then(user => {
        res.send(user)
    })
    .catch(err => {
        console.log('error getting user info', err)
        res.status(404).send("sorry can't find that user name")
    })
})

//use twitter lite to grab user defined last 10 liked tweets
app.get('/getTwits/:user', (req, res) => {
    const userName = req.params.user

    //use api keys in .env to access twitter api
    const client = new Twitter({
        consumer_key: process.env.REACT_APP_KEY,
        consumer_secret: process.env.REACT_APP_SECRET_KEY,
        access_token_key: process.env.REACT_APP_ACCESS_TOKEN,
        access_token_secret: process.env.REACT_APP_ACCESS_SECRET
    })

    //endpoint url and params here, then send data to client side if successful
    client.get('favorites/list', {
        count: 10,
        screen_name: userName,
        tweet_mode: 'extended'
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        console.log('error finding user likes', err)
        res.status(404).send("sorry can't find that user's likes")
    })
})

app.listen(3001, () => {
    console.log('server listening on port 3001')
})