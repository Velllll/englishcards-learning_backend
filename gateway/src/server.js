const express = require('express')
const cors = require('cors')
const proxy = require('express-http-proxy')
require('dotenv').config({path: '.env.local'})

const PORT = process.env.PORT || 5000

const app = new express()

app.use(express.json())
app.use(cors())

app.use('/auth', proxy('http://localhost:5001'))
app.use('/api', proxy('http://localhost:5002'))

app.listen(PORT, () => console.log("SERVER IS WORKING ON PORT: ", PORT))