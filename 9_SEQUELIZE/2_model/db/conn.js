const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('nodesequelize2', 'root', '0887', {
  host: 'localhost',
  dialect: 'mysql'
})

/*
try {
    sequelize.authenticate()
    console.log('Conectado ao com sucesso com o sequelize')
    
} catch (err) {
    console.error('Não foi possivel conectar',error)
}
*/

module.exports = sequelize