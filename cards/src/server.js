const express = require('express')
const app = new express()
const cors = require('cors')
require('dotenv').config({path: '.env.local'})

const collectionRouter = require('./routes/collection.route')
const cardsRouter = require('./routes/cards.router')

const PORT = process.env.PORT || 5002

app.use(express.json())
app.use(cors())

app.use('/', collectionRouter)
app.use('/', cardsRouter)

app.listen(PORT, () => console.log("SERVER IS WORKING ON PORT: ", PORT))