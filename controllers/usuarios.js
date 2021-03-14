const {response,request, query}  = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require ('../models/usuario');

const usuariosGet = (req = request, res = response) =>{
    const query = req-query;   
    res.json({
        msg: 'get API desde el controlador',
        query
    });
}

const usuariosPost = async (req, res = response) =>{
    
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) {
        return res.status(400).json({
            msg: 'El correo ya existe!!!'
        });
        
    }
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    //Gurardar el usuario en cafeDB
    await usuario.save();

    res.json({
        //msg: 'post API - Desde el controlador',
        usuario
    });
}

const usuariosPut = (req, res = response) =>{
    const id = req.params.id;

    res.json({
        msg: 'put API - Desde el controlador',
        id
    });
}

const usuariosPatch = (req, res = response) =>{
    res.json({
        msg: 'Patch API - Desde el controlador'
    });
}

const usuariosDelete = (req, res = response) =>{
    res.json({
        msg: 'delete API - Desde el controlador'
    });
}

module.exports = {
    usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete
}