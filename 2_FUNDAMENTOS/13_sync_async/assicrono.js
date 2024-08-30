const fs = require('fs');

console.log('inicio')

fs.writeFile("arquivo.txt", 'oi', function(err){
    setTimeout(() => {
        console.log('Arquivo criado')
        console.log('fim')
    }, 1000);
    setTimeout(() => {
        console.clear()
    }, 2000);
})

