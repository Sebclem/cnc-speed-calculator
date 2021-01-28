const { Sequelize } = require('sequelize');
const logger = require('../config/winston')
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite',
    logQueryParameters: true,
    benchmark: true,
    logging: msg => logger.debug.bind(msg)
});

const modelDefiners = [
    require('./models/preset-cut.model'),
    require('./models/preset-step-down-factor.model'),
    require('./models/need-init.model'),
    require('./models/user.model')
];

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

module.exports = sequelize;