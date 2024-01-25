const {model, Schema} = require('mongoose')

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'] // si no coloco el nombre, se lanza ese mensaje.
    },

    estado: {
        type: Boolean,
        default: true,
        required: true
    },

    usuario: { // necesito saber que usuario creo esa categoria.
        type: Schema.Types.ObjectId, 
        ref: 'Usuario', // nombro al schema Usuario
        required: true

    }

})

CategoriaSchema.methods.toJSON = function(){
    const {__v , estado,  ...data} = this.toObject()
    return data
}

    module.exports = model('Categoria', CategoriaSchema)