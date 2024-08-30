const express = require('express')
const exphbs = require('express-handlebars');

const app = express()

const hbs = exphbs.create({
    partialsDir: ["views/partials/"],
  });
  
  app.engine("handlebars", hbs.engine);
  app.set("view engine", "handlebars");

  app.use(express.static('public'))

app.get('/dashboard', (req, res) => {
    
    const items = ['item a', 'item b', 'item c']

    res.render('dashboard',{items})
})

app.get('/post', (req, res) => {
    const post = {
        title: 'Aprender Node.js',
        category: 'JavaScript',
        body: 'Este artigo vai te ajudar a aprender Node.js.....',
        comments: 4,
    }

    res.render('blogpost', {post})
})


app.get('/blog', (req, res) => {
    const posts = [
        {
            title: 'Aprender Node.js',
            category: 'JavaScript',
            body: 'Este artigo vai te ajudar a aprender Node.js.....',
            comments: 4,
        },
        {
            title: 'Como começar a programar',
            category: 'HTML',
            body: 'Este artigo vai te ajudar a começar a programar.....',
            comments: 2,
        },
        {
            title: 'Como utilizar Git',
            category: 'Versionamento',
            body: 'Este artigo vai te ajudar a utilizar Git.....',
            comments: 1,
        }
    ]
    
    res.render('blog', {posts})
})

app.get('/', (req, res) => {

    const user ={
        name: 'Gabriel',
        surname: ' Ferreira ',
        age: 21
    }

    const palavra = 'Teste'

    const auth = true

    const approved = false

    res.render('home', {user: user, palavra, auth,approved})    
})

app.listen(3000, ()=>{
    console.log('App Funcionando!')  // Mostra na console que o servidor está rodando
})