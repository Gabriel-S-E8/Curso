const express = require('express');
const app = express();
const port = 3000 // variavel ambiente

const path = require('path');

const basePath = path.join(__dirname,'templates');

const checkAuth = function(req, res, next) {
    req.authStatus = false

    if (req.authStatus) {
        console.log('Está logado, pode consinuar')
        next()
    }else{
        console.log('Você não está logado, faça login para continuar')
        next()
    }
}

app.use(checkAuth)

app.get('/',(req, res) =>{

    res.sendFile(`${basePath}/index.html`);

})

app.listen(port, () => {

    console.log(`Servidor rodando na porta ${port}`);

})