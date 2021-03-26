

const {Router} = require ('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');
const { esRoleValido, emailExiste,existeusuarioPorId } = require('../helpers/db-validators');
const {validarCampos, validarJWT, esAdminRol, tieneRol} = require('../middlewares/index')

const router = Router();

router.get('/', usuariosGet); 

router.post('/',[
    check('nombre', 'El nombre el obligatorio').not().isEmpty(),
    check('password', 'El password debe tener minimo 6 caracteres').isLength({min:6}),
    check('correo', 'Debe ingresar un correo válido').isEmail(),
    check('correo').custom(emailExiste),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROL', 'USER_ROL']),
    check('rol').custom( esRoleValido),
    validarCampos
], usuariosPost);

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeusuarioPorId),
    check('rol').custom( esRoleValido),
    validarCampos
], usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id', [
    validarJWT,
    //esAdminRol,
    tieneRol('ADMIN_ROL','VENTAS_ROL'),   
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeusuarioPorId),
    validarCampos

],usuariosDelete);






module.exports = router;