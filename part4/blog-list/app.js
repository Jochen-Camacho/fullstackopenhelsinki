const {PORT, MONGO_URL} = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blog')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const logger = require('./utils/logger')


mongoose.set('strictQuery', false)

logger.info('connecting to: ', MONGO_URL)

mongoose.connect(MONGO_URL).then(() => {
    logger.info(`connected to PORT ${PORT}`)
}).catch(error => logger.error(error.message));

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)

module.exports = app