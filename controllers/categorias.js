const { response } = require("express");

const Categoria = require('../models/categoria')


//obtener categoria
const obtenerCategoria = async (req,res = response) => {


    const categorias = await Categoria.find({estado: true}) // trae a todos los usuarios, si esta en true, no aparece en el  contador

    .populate('usuario', 'nombre '); // El populate me dice detalladamente que usuario lo creo
    const contadorCategoria = categorias.length;

res.json({
    msg: 'Usuarios Get',
    total: contadorCategoria,
    categorias
            

})
}

// obtener categoria por ID

const obtenerCategoriaPorId = async (req,res= response) => {

    const { id } = req.params

    const categoria = await Categoria.findById( id ) .populate('usuario', 'nombre') // populate me muestra el usuario que lo creo.

    res.json(categoria)



}


//Crear Categoria
const crearCategoria = async(req, res = response) =>{

const nombre = req.body.nombre.toUpperCase() // los nombres de las categorias en mayuscula.

const categoriaDB = await Categoria.findOne({nombre})

if (categoriaDB){ // validamos si existe en la base de datos
    return res.status(400).json({
        msg: `La categoria ${categoriaDB.nombre} ya existe en la base de datos.`
    })
}


// generar la data al guardar en la BD
const data = {
    nombre, 
    usuario: req.usuario._id
}

const categoria = new Categoria (data) // creamos la nueva categoria

// guardamos en la base de datos

await categoria.save()

res.status(201).json({
    categoria
})

}


//Actualizar categoria
const actualizarCategoria = async (req,res = response) => {

    const {id} = req.params
    // evitar actualizar el usuario y el estado
    const {estado , usuario,  ...data } = req.body

    data.nombre = data.nombre.toUpperCase() // PONER lo actualizado en mayuscuyla
    data.usuario = req.usuario._id // usuario dueño del token. / el que esta usando para actualizar.

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true}) // el new en true, te manda el nuevo documento actualizado.

    res.json({
     
        categoria
      
    })


}

// Eliminar categoria.
const eliminarCategoria = async (req,res=response) => {

    const { id } = req.params
    const categoria = await Categoria.findByIdAndUpdate(id, {estado:false} , {new: true})  // para ver los resultados reflejados.

    res.json(categoria)

}



module.exports = {
    crearCategoria,
    obtenerCategoria,
    obtenerCategoriaPorId,
    actualizarCategoria,
    eliminarCategoria
}