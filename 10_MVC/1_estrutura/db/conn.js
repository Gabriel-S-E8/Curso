const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('nodemvc2', 'root', '0887', {
    host: 'localhost',
    dialect: 'mysql',
});

try {

    sequelize.authenticate()
    console.log('Conectado ao banco de dados com sucesso')
    
} catch (error) {
    console.log('Não foi possível conectar');
}

exports.default = sequelize;