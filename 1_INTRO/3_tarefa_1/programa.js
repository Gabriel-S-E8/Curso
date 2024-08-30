const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Digite o valor de a: ', (a) => {
    rl.question('Digite o valor de b: ', (b) => {
        const soma = parseInt(a, 10) + parseInt(b, 10);
        console.log(`A soma de a e b é: ${soma}`);
        rl.close();
    });
});
