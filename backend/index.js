const connectToMongo = require('./db')
const express = require('express')

connectToMongo();

const app = express()
const port = 3000

// if we want to use req.body then we have to use a middleware ..and here its app.use(express.json())--here by this we can deal in json.
app.use(express.json())

// Available Routes.
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})