const fs = require('fs');

const arqAntigo = 'arquivo.txt'
const arqNovo = 'novo.txt'

fs.rename(arqAntigo, arqNovo,function(err){

    if (err) {
        console.log(err)
    }

    console.log(`o Nome do arquivo ${arqAntigo} 
    Foi alterado para ${arqNovo} com sucesso!`)

})