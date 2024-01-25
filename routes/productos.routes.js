const {Router} = require('express')


const validarCampos = require('../middlewares/validarCampos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { check } = require('express-validator')
const { crearProducto, obtenerProducto, obtenerProductoPorId, actualizarProducto, eliminarProducto } = require('../controllers/productos')
const { existeCategoriaPorId, existeUsuarioPorID, existeProductoPorId } = require('../middlewares/validaciones')
const { esAdminRole } = require('../middlewares/validar-roles')



const router = Router()

// Obtener todas los productos - publico

router.get('/', obtenerProducto) 

// obtener producto por ID

router.get('/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeProductoPorId),
    validarCampos,
],obtenerProductoPorId)


// crear producto - privado - cualquier persona con token valido.
router.post('/', [
validarJWT ,
check('nombre', 'el nombre es obligatorio').not().isEmpty(),
check('categoria', 'No es un id de Mongo').isMongoId(),
check('categoria').custom( existeCategoriaPorId ),
validarCampos],
crearProducto) 

// Actualizar producto - privado - cualquier persona con token valido.
router.put('/:id',  [
    validarJWT,
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('id').custom( existeProductoPorId), // tiene que exixtir el producto por id que deseamos actualizar.
    validarCampos,
], actualizarProducto) 

// Borrar producto- privado - solo con ROL ADMIN
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId)
],eliminarProducto) 


module.exports = router