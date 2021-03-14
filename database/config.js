const mongooose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongooose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Exito al conectar a la base de datos!!!');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexión a la base de datos');
    }

}

module.exports={
    dbConnection
}