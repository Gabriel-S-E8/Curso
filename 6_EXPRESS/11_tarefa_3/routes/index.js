const express = require('express')
const router = express.Router()

const path = require('path') 
const basePath = path.join(__dirname, '../templates')

router.get('/contact', (req, res) =>{
    res.sendFile(`${basePath}/contact.html`)
})

module.exports = router