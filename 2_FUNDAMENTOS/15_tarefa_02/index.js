const inquirer = require('inquirer')
const chalk = require('chalk')
 
inquirer.prompt([{
    name: 'nome',
    message: 'Informe o nome: ',
},
{
    name: 'idade',
    message: 'Informe a idade: ',
}]).then((answers) => {
    console.log(chalk.bgYellow.black(`${answers.nome} tem ${answers.idade} anos`))
}).catch(err => console.log(`Erro: `, err))