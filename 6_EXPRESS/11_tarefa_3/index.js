const express = require('express')
const app = express()
const path = require('path')

const port = 5000

const routes = require('./routes')
const basePath = path.join(__dirname, 'templates')

app.use('/routes', routes)
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () =>{
    console.log(`Ouvindo a porta ${port}`)
})

