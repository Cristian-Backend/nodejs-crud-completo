const {model, Schema} = require('mongoose')

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'] // si no coloco el nombre, se lanza ese mensaje.
    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    },
 
    usuario: { // necesito saber que usuario creo el producto.
        type: Schema.Types.ObjectId, 
        ref: 'Usuario', // nombro al schema Usuario
        required: true

    },
    precio: {
        type: Number,
        default: 0,
    },
    categoria: {  // vamos saber la informacion de que categoria viene el producto.
        type: Schema.Types.ObjectId, 
        ref: 'Categoria', // nombro al schema Categoria
        required: true
    } , 

    descripcion : {
        type: String,
        disponible: {type : Boolean, default: true}
    },

    img: {
        type: String
    }


})



ProductoSchema.methods.toJSON = function(){
    const {__v , estado,  ...data} = this.toObject() 
    return data
   }

    module.exports = model('Producto',ProductoSchema)