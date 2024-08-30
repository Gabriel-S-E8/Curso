const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql2')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    res.render('home')
})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0887',
    database: 'nodemysql2'
})

conn.connect((err) => {
    if (err){
        console.error(err)
    } 


    app.listen(3000, () => {
        console.log('Server running on port 3000')
    })

    console.log('Connected to MySQL')
    
})