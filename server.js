'use strict'

const app = require('../NoFood.api/bin/express');
const variables = require('../NoFood.api/bin/configuration/variables');

app.listen(variables.Api.port, () => {
    console.info(`Servidor api inicializado na porta 3000 ${variables.Api.port}`)
})