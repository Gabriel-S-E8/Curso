const express = require('express');
const app = express();
const port = 3000 // variavel ambiente

const path = require('path');

const basePath = path.join(__dirname,'templates');


app.get('/users/:id',(req, res) =>{
    const id = req.params.id;

    //leitura da tavela users, resgatar um usuario do banco
    console.log(`Estamos buscando pelo usuario ${id}`);

    res.sendFile(`${basePath}/users.html`);

})

app.get('/',(req, res) =>{

    res.sendFile(`${basePath}/index.html`);

})

app.listen(port, () => {

    console.log(`Servidor rodando na porta ${port}`);

})