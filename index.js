const express = require('express');
const app = express();
require('dotenv').config();
const URI_PREFIX = process.env.URI_PREFIX;
const PORT = process.env.PORT || 3000;

const sequelize = require('./connection/database');

const clientRoutes = require('./routes/clients');
app.use(express.json());
app.use(URI_PREFIX, clientRoutes);

async function start()
{
    try {
        await sequelize.sync();
        app.listen(PORT);
    } catch (e) {
        console.log(e);
    }
}

start();