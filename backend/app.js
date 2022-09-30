const express = require('express')
const cors = require('cors')
const router = require('./routes')

const app = express()

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.use('/', router)

const port = 5000
app.listen(port, () => {
  console.log(`Server listen on port ${port}`)
})