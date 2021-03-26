const bcryptjs = require ('bcryptjs');
const { response } = require("express");
const { generarJWT } = require('../helpers/generar-jwt');

const Usuario = require('../models/usuario');



const login = async (req, res=response)=>{
    const {correo, password} = req.body;

    try {

        //Verificar si el correo existe

        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg: 'El usuario o la contraseña no son correctos - correo'
            });
            
        }

        //Verificar si el usuario está vigente
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'El usuario o la contraseña no son correctos - estado: false'
            });
            
        }
        //Verificar la contraseña
        const validarPassword = bcryptjs.compareSync(password, usuario.password)
        if (!validarPassword) {
            return res.status(400).json({
                msg: 'El usuario o la contraseña no son correctos - password'
            });            
        }

        //Generar JWT 
        const token =await generarJWT(usuario.id);
        

        res.json({      
            usuario,
            token
            //msg: 'Hola Login desde Controller'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador del sistema'
        })
        
    }   
}

module.exports= {
    login
}