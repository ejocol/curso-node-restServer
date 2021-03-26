const {Router} = require ('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

router.post('/login',[
    check('correo', 'El correo es cbligatorio y debe ser un correo valido').isEmail(),
    check('password', 'Debe ingresar una contraseña').not().isEmpty(),
    validarCampos
], login); 


module.exports = router;