const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const route = require('./route')

const app = express()
app.use(bodyparser.json())
app.use(cors())
app.use('/', route)

app.listen(5000, () => {
    console.log('Server running at PORT 5000')
})