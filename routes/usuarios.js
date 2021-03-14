

const {Router} = require ('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');
const { validarCampos } = require('./middlewares/validarCampos');
const router = Router();

router.get('/', usuariosGet); 

router.post('/',[
    check('nombre', 'El nombre el obligatorio').not().isEmpty(),
    check('password', 'El password debe tener minimo 6 caracteres').isLength({min:6}),
    check('correo', 'Debe ingresar un correo válido').isEmail(),
    check('rol', 'No es un rol válido').isIn(['ADMIN_ROL', 'USER_ROL']),
    validarCampos
], usuariosPost);

router.put('/:id', usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);






module.exports = router;