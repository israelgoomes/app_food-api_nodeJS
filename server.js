'use strict'

const app = require('../app_food-api_nodeJS/bin/express');
const variables = require('../app_food-api_nodeJS/bin/configuration/variables');

app.listen(variables.Api.port, () => {
    console.info(`Servidor api inicializado na porta: ${variables.Api.port}`)
})