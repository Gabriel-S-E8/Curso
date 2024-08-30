const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})

readline.question('Qaul a sua linguagem preferida? ',(language)=>{
    if (language === 'Python') {
        console.log('Isso nem é linguegem')
    }else{
        console.log('Parabéns essa é uma boa linguagem')
    }
    console.log(`A minha linguagem preferida é: ${language}.`)
    readline.close()  // Fecha a interface
})

