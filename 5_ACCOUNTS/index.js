const inquirer = require('inquirer')
const chalk = require('chalk')

const fs = require('fs')

operation()

function operation() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
          'Criar conta',
          'Consultar Saldo',
          'Depositar',
          'Sacar',
          'Sair',
        ],
      },
    ])
    .then((answer) => {
      const action = answer['action']

      if (action === 'Criar conta') {
        createAccount()
      } else if (action === 'Depositar') {
        deposit()
      } else if (action === 'Consultar Saldo') {
        getAccountBalance()
      } else if (action === 'Sacar') {
        withdraw()
      } else if (action === 'Sair') {
        console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'))
        process.exit()
      }
    })
}

function createAccount() {
    console.log(chalk.bgGreen.black('Parabéns por escolher nosso banco!'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))
  
    buildAccount()
}

function buildAccount() {
    inquirer
      .prompt([
        {
          name: 'accountName',
          message: 'Digite um nome para a sua conta:',
        },
      ])
      .then((answer) => {
        console.info(answer['accountName'])
  
        const accountName = answer['accountName']
  
        if (!fs.existsSync('accounts')) {
          fs.mkdirSync('accounts')
        }
  
        if (fs.existsSync(`accounts/${accountName}.json`)) {
          console.log(
            chalk.bgRed.black('Esta conta já existe, escolha outro nome!'),
          )
          buildAccount(accountName)
        }
  
        fs.writeFileSync(
          `accounts/${accountName}.json`,
          '{"balance":0}',
          function (err) {
            console.log(err)
          },
        )
  
        console.log(chalk.green('Parabéns, sua conta foi criada!'))
        operation()
      })
}

function deposit(){
    inquirer
        .prompt([{
            name: 'accountName',
            message: 'Qual o nome da sua conta',
        }])
        .then((answer) => {
            const accountName = answer['accountName']
            // verify if acounts exists

            if (!checkAccount(accountName)){
                return deposit()
            }

            inquirer
               .prompt([{
                name: 'amount',
                message: 'Quanto você deseja depositar?',
               }])
               .then((answer) => {
                    const amount = answer['amount']
                    // add an amount to the account

                    addAmount(accountName, amount)
                    operation()
                })
                .catch((err) => console.log(err))

        })
        .catch((err) => console.log(err));
}

function checkAccount(accountName) {
    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('Esta conta não nexiste, escolha outro nome!'))
        return false
    }

    return true
}

function addAmount(accountName, amount){

    const accountData = getAccount(accountName)
    
    if (!amount) {
        console.log('Ocorreu um erro, tente novaente mais tarde!')
        return deposit()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)
    
    fs.writeFileSync(`accounts/${accountName}.json`, 
        JSON.stringify(accountData), 
        function (err) {
            console.log(err)
        },
    )

    console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta!`))
}

function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`,{
        encoding: 'utf8',
        flag: 'r'
    })

    return JSON.parse(accountJSON)

}


// show account balance
function getAccountBalance() {
    inquirer
        .prompt([{
            name: 'accountName',
            message: 'Qual o nome da sua conta?',
        }
        ])
        .then((answer) => {
            const accountName = answer['accountName']
            
            if (!checkAccount(accountName)) {
                return getAccountBalance()
            }
            
            const accountData = getAccount(accountName)
            
            console.log(chalk.black
                (`Seu saldo é R$${accountData.balance}`)
            )
            operation()
        })
        .catch(err => console.log(err))
}

function withdraw() {
    inquirer
       .prompt([
            {
                name: 'accountName',
                message: 'Qual o nome da sua conta?',
            },
        ])
       .then((answer) => {

            const accountName = answer['accountName']

            if (!checkAccount(accountName)) {
                return withdraw()
            }
            
            inquirer
                .prompt([{
                    name: 'amount',
                    message: 'Quanto você deseja sacar?',
                }])
                .then((answer) => {
                    const amount = answer['amount']
                    
                    removeAmount(accountName,amount)
                })
                .catch(err => console.log(err))
       })    
        .catch(err => console.log(err))
}


function removeAmount(accountName,amount) {
    const accountData = getAccount(accountName)

    if (!amount) {
        console.log(chalk.bgWhite.black('Ocorreu um erro, tente novaente mais tarde!'))
        return withdraw()
    }

    if (accountData.balance < amount) {
        console.log(chalk.bgBlue.black('Valor indisponivel'))
        return withdraw()
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)
    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err) {
            console.log(err)
        })


    console.log(chalk.green(`Foi sacado o valor de R$${amount} da sua conta!`))
    operation()
}