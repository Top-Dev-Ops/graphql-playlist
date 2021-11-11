const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const schema = require('./schema/schema')
const cors = require('cors')

const app = express()

mongoose
  .connect('mongodb+srv://benjamin:longma19931221@cluster0.4gxhm.mongodb.net/graphql-playlist')
  .then(() => {})
mongoose
  .connection
  .once('open', () => {
    console.log('connected to database')
  })

app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('Listening on port 4000!')
})
