const {response,request, query}  = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require ('../models/usuario');

const usuariosGet = async (req = request, res = response) =>{
  
    const {limite = 5, desde = 0} = req.query;
    const vigente = {estado:true};
    // const usuarios = await Usuario.find(vigente)
    // . skip(Number(desde))
    // . limit(Number(limite));
    // const totalRegistros = await Usuario.countDocuments(vigente);

    const [totalRegistros, usuarios] = await Promise.all ([
        Usuario.countDocuments(vigente),
        Usuario.find(vigente)
            . skip(Number(desde))
            . limit(Number(limite))

    ]);
    res.json({        
        totalRegistros,
        usuarios
    });
}

const usuariosPost = async (req, res = response) =>{
    
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

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

const usuariosPut = async (req, res = response) =>{
    const id = req.params.id;
    const {_id, password, google, correo, ...resto} = req.body;

    // Validar en base de datos

    if (password) {
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
        
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);



    res.json({
        msg: 'put API - Desde el controlador',
        id,
        usuario
    });
}

const usuariosPatch = (req, res = response) =>{
    res.json({
        msg: 'Patch API - Desde el controlador'

    });
}

const usuariosDelete = async (req, res = response) =>{

    const {id} = req.params;
    const uid = req.uid;
    // Borrado de la DB
    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});

    res.json(usuario);
}

module.exports = {
    usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete
}