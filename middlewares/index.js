const validaJWT = require('../middlewares/validar-jwt');
const validaCampos = require('../middlewares/validarCampos');
const validaRoles = require ('../middlewares/validar-roles');

module.exports={
    ...validaCampos,
    ...validaJWT,
    ...validaRoles
}