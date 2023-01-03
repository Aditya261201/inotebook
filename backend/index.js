const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')  // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

connectToMongo();

const app = express()
const port = 5000
app.use(cors())    

// if we want to use req.body then we have to use a middleware ..and here its app.use(express.json())--here by this we can deal in json.
app.use(express.json())

// Available Routes.
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))



app.listen(port, () => {
    console.log(`INotebook backend listening at http://localhost:${port}`)
})