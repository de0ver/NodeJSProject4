const Sequelize = require('sequelize');
const sequelize = require('../connection/database');

const client = sequelize.define('Client', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Не указано имя клиента!' },
        },
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Не указана фамилия клиента!' },
        },
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Не указано отчества клиента!' },
        },
    },
    contacts: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Не указаны контакты клиента!' },
        },
    },
});

module.exports = client;