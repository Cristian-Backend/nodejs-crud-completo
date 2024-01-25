const {Router} = require('express')
const { login } = require('../controllers/auth')
const { check } = require('express-validator')
const validarCampos = require('../middlewares/validarCampos')



const router = Router()

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
     validarCampos
],login) 


module.exports = router