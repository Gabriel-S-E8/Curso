const path = require('path');

//path absoluto

console.log(path.resolve('teste.txt'))

// formar parth
const midFolder = 'relatorios'
const fileName = 'Gabriel.txt'

const finalPath = path.join('/', 'arquivos', midFolder, fileName)

console.log(finalPath)