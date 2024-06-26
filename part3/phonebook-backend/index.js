require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

morgan.token('data', (request) => {
  return JSON.stringify(request.body)
})

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
)

// Getting the Phonebook Info
app.get('/info', async (req, res) => {
  const count = await Person.countDocuments({})
  console.log(count)
  res.send(
    `<p>Phonebook has info for ${count} people</p>  <p>${new Date()}</p>`
  )
})

// Getting all the persons
app.get('/api/persons', (req, res) => {
  Person.find({}).then((data) => res.json(data))
})

// Getting a single person
app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id)
    .then((person) => {
      res.json(person)
    })
    .catch((error) => next(error))
})

// Deleting a single person
app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch((error) => next(error))
})

// Posting a new person

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'content missing',
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const newPerson = {
    name: req.body.name,
    number: req.body.number,
  }
  Person.findByIdAndUpdate(req.params.id, newPerson, { new: true })
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((error) => next(error))
})

const unknownEndpoint = (req, resp) => {
  resp.status(404).send({
    error: 'unknown endpoint',
  })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

