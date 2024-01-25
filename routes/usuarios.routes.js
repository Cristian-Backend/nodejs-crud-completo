const express = require('express')

const {check} = require('express-validator')
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios')

const validarCampos = require('../middlewares/validarCampos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { EmailValido, RoleValido, existeUsuarioPorID } = require('../middlewares/validaciones')
const { esAdminRole, tieneRole } = require('../middlewares/validar-roles')

const router = express.Router()


router.get('/', usuariosGet)

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), // significa que no tiene que estar vacio
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( EmailValido ),
    check('password', 'La contraseña debe tener al menos 6 letras').isLength({min:6}),
    check('rol').custom( RoleValido )
  

], validarCampos ,
usuariosPost)

 router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(), //Usuario de mongoID 
    check('id'). custom ( existeUsuarioPorID ),
    check('rol').custom( RoleValido),
    validarCampos,
 ], usuariosPut)


  
router.delete('/:id', [ // ruta protegida con JWT
    validarJWT,
   // esAdminRole, solo para 1 rol
     tieneRole('ADMIN_ROLE', 'NOSE_ROLE' , 'VENTAS_ROLE'),
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom( existeUsuarioPorID ),
    validarCampos


],usuariosDelete)






module.exports = router