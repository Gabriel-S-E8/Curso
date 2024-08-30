const chalk = require("chalk");

const nota = 8;

if (nota >= 7) {
  console.log(chalk.green.bold("Parabéns, você passou!"));
} else {
  console.log(chalk.bgWhite("Você precisa fazer a prova final!"));
}