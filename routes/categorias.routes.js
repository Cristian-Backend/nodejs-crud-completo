const {Router} = require('express')


const validarCampos = require('../middlewares/validarCampos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { check } = require('express-validator')
const { crearCategoria, obtenerCategoria, obtenerCategoriaPorId, actualizarCategoria, eliminarCategoria } = require('../controllers/categorias')
const { existeCategoriaPorId, existeUsuarioPorID } = require('../middlewares/validaciones')
const { esAdminRole } = require('../middlewares/validar-roles')



const router = Router()

// Obtener todas las cateogrias - publico

router.get('/', obtenerCategoria) 

// obtener categoria por ID

router.get('/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeCategoriaPorId),
    validarCampos,
],obtenerCategoriaPorId)


// crear categoria - privado - cualquier persona con token valido.
router.post('/', [
validarJWT ,
check('nombre', 'el nombre es obligatorio').not().isEmpty(),
validarCampos],
crearCategoria) 

// Actualizar categoria - privado - cualquier persona con token valido.
router.put('/:id',  [
    validarJWT,
    check('nombre', 'el nombre es obligatorio.').not().isEmpty(),
    check('id').custom( existeCategoriaPorId), // tiene que exixtir la categoria por id que deseamos actualizar.
    validarCampos,
], actualizarCategoria) 

// Borrar categoria- privado - solo con ROL ADMIN
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId)
],eliminarCategoria) 


module.exports = router