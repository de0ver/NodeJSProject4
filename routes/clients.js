const { Router } = require('express');
const router = Router();
const Client = require('../models/client');

function backRes(code, text, res, e = null)
{
    if (e)
        console.log(e);

    return res.status(code).json(text);
}

function backError(res, e = null)
{
    if (e)
        console.log(e);

    return res.status(500).json({message: e.message !== null ? e.message : 'Server error'});
}

router.get('/', async (req, res) => {
    try {
        let clients = await Client.findAll();
        let queries = req.query;
        if (queries.name && queries.surname && queries.lastname)
        clients = clients.filter(({name, surname, lastname}) => name === queries.name && surname === queries.surname && lastname === queries.lastname);
        backRes(200, clients, res);
    } catch (e) {
        backError(res, e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        let clients = await Client.findByPk(+req.params.id);
        if (clients !== null)
            backRes(200, clients, res);
        else throw new Error('Client Not Found');
    } catch (e) {
        backError(res, e);
    }
});

router.post('/', async (req, res) => {
    try {
        const clients = await Client.create({
            createdAt: new Date(),
            updatedAt: new Date(),
            name: req.body.name,
            surname: req.body.surname,
            lastname: req.body.lastname,
            contacts: req.body.contacts,
        });

        clients.contacts = clients.contacts.replaceAll("'", '"'); //'' -> ""
        try
        {
            let check = JSON.parse(clients.contacts);
            if (!check.type) throw new Error('contacts: { type }\nНе указан тип контакта!');
            if (!check.value) throw new Error('contacts: { value }\nНе указаны данные контакта!');
        } catch (e) {
            throw new Error('Неправильно указаны контакты клиента!');
        }

        backRes(201, {clients}, res);
    } catch (e) {
        backError(res, e);
        /*console.log(e);
        let error = [];
        let messages = {};
        e.errors.forEach((error) => {
            error.push({
                field: error.path,
                message: error.message,
            });
        });
        messages['errors'] = error;
        res.status(422).json(messages);*/
    }
});

router.put('/:id', async (req, res) => {
    try {
        let clients = await Client.findByPk(+req.params.id);
        if (clients !== null)
        {
            await clients.update({
                name: req.body.name,
                surname: req.body.surname,
                lastname: req.body.lastname,
                contacts: req.body.contacts,
            });

            clients.contacts = clients.contacts.replaceAll("'", '"'); //'' -> ""
            try
            {
                let check = JSON.parse(clients.contacts);
                if (!check.type) throw new Error('contacts: { type }\nНе указан тип контакта!');
                if (!check.value) throw new Error('contacts: { value }\nНе указаны данные контакта!');
            } catch (e) {
                throw new Error('Неправильно указаны контакты клиента!');
            }

            backRes(200, {clients}, res);
        } else throw new Error('Client Not Found');
    } catch (e) {
        backError(res, e);
    } 
});

router.delete('/:id', async (req, res) => {
    try {
        let clients = await Client.findByPk(+req.params.id);
        if (clients !== null)
        {
            await clients.destroy();
            backRes(200, '{ }', res);
        } else throw new Error('Client Not Found');
    } catch (e) {
        backError(res, e);
    }
});

module.exports = router;