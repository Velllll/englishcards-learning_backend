const express = require('express')
const app = new express()
const cors = require('cors')
require('dotenv').config({path: '.env.local'})

const authRouter = require('./routes/auth.router')

const PORT = process.env.PORT || 5001

app.use(express.json())
app.use(cors())

app.use('/', authRouter)

app.listen(PORT, () => console.log("SERVER IS WORKING ON PORT: ", PORT))