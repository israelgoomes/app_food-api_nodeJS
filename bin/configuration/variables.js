const variables = {
    Api: {
        port: process.env.port || 3000
    },
    Database: {
        //se tiver uma configuração já pré definida ele pega ela se não pega nossa configuração padrão.
        connection: process.env.connection || ('mongodb+srv://israel:88096672@cluster0-xzat1.mongodb.net/nofood')
        


    }
}

module.exports = variables;