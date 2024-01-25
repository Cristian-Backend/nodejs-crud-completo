const { response } = require("express");
const Producto = require('../models/producto')

//obtener Producto
const obtenerProducto = async (req,res = response) => {


    const productos = await Producto.find({estado: true}) // trae a todos los usuarios, si esta en true, no aparece en el  contador

    .populate('usuario', 'nombre ') // El populate me dice detalladamente que usuario lo creo
    .populate('categoria', 'nombre');
    const contadorProducto = productos.length;

res.json({
    msg: 'Usuarios Get',
    total: contadorProducto,
    productos
            
})
}



// obtener categoria por ID

const obtenerProductoPorId = async (req,res= response) => {

    const { id } = req.params
    const producto = await Producto.findById( id ) 
    .populate('categoria', 'nombre') // populate me muestra la categoria del producto
    .populate('categoria', 'nombre')
    res.json(producto)

}

// crear producto
const crearProducto = async (req,res) => {

    const { estado , usuario, ...body} = req.body // no quiero que se vea el estado y usuario.

    const ProductoDB = await Producto.findOne({nombre : body.nombre})

    if (ProductoDB){ // validamos si existe en la base de datos
        return res.status(400).json({
            msg: `La categoria ${ProductoDB.nombre} ya existe en la base de datos.`
        })
    }


    const data = {
        ...body, // en este body se encuentra TODO EL MODELO de Producto, sacando estado y usuario.
        nombre: body.nombre.toUpperCase(), 
        usuario: req.usuario._id
    }

        const producto = new Producto(data)

    // guardar base de datos
    await producto.save(

        res.status(201).json(producto)
    )

}


//Actualizar producto
const actualizarProducto = async(req, res ) => {
    const {id} = req.params

    // evitar actualizar el usuario y el estado
    const {estado , usuario,  ...data } = req.body

    if(data.nombre){ // si existe el nombre , ponerlo en mayuscula y que se suscriba
        data.nombre = data.nombre.toUpperCase() // PONER lo actualizado en mayuscuyla
    }

    
    data.usuario = req.usuario._id // usuario dueño del token. / el que esta usando para actualizar.

    const producto = await Producto.findByIdAndUpdate(id, data, {new: true}) // el new en true, te manda el nuevo documento actualizado.

    res.json({
     
      producto
      
    })


}



// Eliminar Producto

const eliminarProducto = async(req,res) => {
    const {id} = req.params

    const producto = await Producto.findByIdAndUpdate(id, {estado:false}, {new: true})
    

    res.json(producto)
}




module.exports = {
    obtenerProducto,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}