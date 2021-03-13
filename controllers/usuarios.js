const {response,request, query}  = require('express');

const usuariosGet = (req = request, res = response) =>{
    const query = req-query;   
    res.json({
        msg: 'get API desde el controlador',
        query
    });
}

const usuariosPost = (req, res = response) =>{

    const body = req.body;
    res.json({
        msg: 'post API - Desde el controlador',
        body
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