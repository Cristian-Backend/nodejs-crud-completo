const { response } = require("express")
const { ObjectId } = require('mongoose').Types
const Usuario = require ('../models/usuario')
const Categoria = require('../models/categoria')
const Producto = require('../models/producto')

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'producto',
    'roles'
]


// busco el usuario por ID , lo coloco en el switch
const buscarUsuarios = async (termino = '',res= response)=> {

    const esMongoID = ObjectId.isValid(termino) // true // busqueda por mongoID. 

    // si es un mongo ID 
    if(esMongoID) {
        const usuario = await Usuario.findById(termino) // el termino seria el ID
      return  res.json({
            results: (usuario) ? [usuario] : [] // si el usuario existe, me devuelve el usuario en un arreglo, sino me devuelve un arreglo vacio.
        })
    } 

    const regex = new RegExp(termino,'i') // significa es insensible a las mayusculas.

    const usuarios = await Usuario.find({   // el regex seria el termino con mayusculas insensibles.
            // terminos de mongo
        $or : [{nombre: regex}, {correo: regex}], // que me haga busqueda el nombre y correo con mayusculas insensibles.
        // y tambien que cumpla esta condicion.
        $and : [{estado: true}] // que el estado del usuario tiene que estara activo.
    }) 

    res.json({
        results: usuarios
    })

}


// buscar Categorias // http://localhost:8080/api/buscar/categorias/masitas ejemplo.
const buscarCategoria = async (termino = '', res=response)=> {

    const esMongoID = ObjectId.isValid(termino) // true // busqueda por mongoID. 

    // si es un mongo ID 
    if(esMongoID) {
        const categoria = await Categoria.findById(termino) // el termino seria el ID
      return  res.json({
            results: (categoria) ? [categoria] : [] // si la categoria existe, me devuelve la categoria en un arreglo, sino me devuelve un arreglo vacio.
        })
    } 


    const regex = new RegExp(termino,'i') // significa es insensible a las mayusculas.

    const categorias = await Categoria.find({   // el regex seria el termino con mayusculas insensibles.
            // terminos de mongo
        $or : [{nombre: regex}], // que me haga busqueda el nombre con mayusculas insensibles.
        // y tambien que cumpla esta condicion.
        $and : [{estado: true}] // que el estado la categoria tiene que estar activo.
    }) 

    res.json({
        results: categorias
    })

}


// buscar Productos


const buscarProducto = async (termino = '', res=response)=> {

    const esMongoID = ObjectId.isValid(termino) // true // busqueda por mongoID. 

    // si es un mongo ID 
    if(esMongoID) {
        const producto = await Producto.findById(termino)
                            .populate('categoria', 'nombre') // veo bien el nombre de las categorias , y no solo el ID
      return  res.json({
            results: (producto) ? [producto] : [] // si el producto existe, me devuelve  el producto en un arreglo, sino me devuelve un arreglo vacio.
        })
    } 


    const regex = new RegExp(termino,'i') // significa es insensible a las mayusculas.

    const productos = await Producto.find({ nombre: regex , estado: true   })// en una sola linea del ejemplo anterior.
                                    .populate('categoria', 'nombre')  // veo bien el nombre de las categorias , y no solo el ID

    res.json({
        results: productos
    })

}


const buscar = (req,res = response) => {

    const {coleccion , termino} = req.params

    if (!coleccionesPermitidas.includes(coleccion)){ // si no incluye las colecciones permitidas , entonces..
        return res.status(400).json(`Las colecciones permitidas son ${coleccionesPermitidas}`)
    } 

    // en caso que toque usuarios , en caso que sea categoria , en caso que sea producto.
    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res)
            break;

        case 'categorias':
            buscarCategoria(termino,res)
            break;
            
        case 'producto':
            buscarProducto(termino,res)
            break;
        
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta busqueda'
            })
           
    }

}

module.exports = {
    buscar
}