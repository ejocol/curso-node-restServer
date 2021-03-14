const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Conexion a la DB
        this.conectarDB();
        // Middlewares
        this.middlewares();
        // Rutas de la aplicación
        this.routes();
    }  

    async conectarDB(){
        await dbConnection();
    }

    middlewares (){
        //Cors
        this.app.use(cors());

        // Parseo y lectura del body
        this.app.use(express.json());
        
        //Directorio público
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usuariosPath, require ('../routes/usuarios'));
    }




    listen(){
        this.app.listen(this.port, ()=>{
        console.log(`Corriendo en el puerto: `, this.port)
        });
    }
}
module.exports = Server;