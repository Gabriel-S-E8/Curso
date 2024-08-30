const fs = require('fs');

fs.stat('novoarquivo.txt', function (err, stat) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`Arquivo: ${stat.isFile()}`);
    console.log(`Diretório: ${stat.isDirectory()}`);
    console.log(`Permissões: ${stat.mode}`);
    console.log(`É simbolico? ${stat.isSimbolicLink}`);
    console.log(`Data de criação: ${stat.birthtime}`);
    console.log(`��ltima modificação: ${stat.mtime}`);
    console.log(`Tamanho: ${stat.size} bytes`);
})