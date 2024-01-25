const {Router} = require('express')
const { login } = require('../controllers/auth')
const { check } = require('express-validator')
const validarCampos = require('../middlewares/validarCampos')
const {cargarArchivos, actualizarImagen, mostrarImagen, actualizarImagenCloudinary} = require('../controllers/uploads')
const { subirArchivo } = require('../helpers/subir-archivo')
const { coleccionesPermitidas } = require('../middlewares/validaciones')
const { validarArchivoSubir } = require('../middlewares/validarArchivoSubir')


const router = Router()


router.post('/', validarArchivoSubir, cargarArchivos)

router.put('/:coleccion/:id', [
    validarArchivoSubir, // lo mandamos antes para saber si hay archivo o no.
    check('id', 'tiene que ser un un id de Mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
            //], actualizarImagen)
 ], actualizarImagenCloudinary)

router.get('/:coleccion/:id', [
    check('id', 'tiene que ser un un id de Mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen)


module.exports = router