
const Role = require('../models/role');
const Usuario = require ('../models/usuario');

const esRoleValido = async (rol = '')=>{
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error(`El rol: ${ rol } no existe!!!`)
    }
}

//Verificar si el correo existe
const emailExiste = async (correo = '')=>{
    const existeEmail  = await Usuario.findOne({correo});
    if (existeEmail) {
        //return res.status(400).json({
            throw new Error (`El correo ${ correo } ya existe`)
            //msg: 'El correo ya existe!!!'
    }        
}

//Verificar si el Usuario existe
const existeusuarioPorId = async (id = '')=>{
    const existeusuario  = await Usuario.findById(id);
    if (!existeusuario) {
        //return res.status(400).json({
            throw new Error (`El usuario ${ id } no existe`)
            //msg: 'El correo ya existe!!!'
    }        
}




module.exports = {
    esRoleValido,
    emailExiste,
    existeusuarioPorId
}