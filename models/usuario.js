
const {model, Schema} = require('mongoose')

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'] // si no coloco el nombre, se lanza ese mensaje.
    },

    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true 
    },

    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'] 
    },

    img: {
        type: String
    },
    
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE'] // SOLO ESTOS 2 ROLES se podrian elegir.
    },

    estado:{ // en el estado veo si se borro de la base de datos.
        type:Boolean ,
        default: true
    },

    google: {
        type: Boolean , 
        default: false
    },

})


usuarioSchema.methods.toJSON = function(){
 const {__v , password, _id, ...usuario} = this.toObject() 
 usuario.uid = _id // cambio en mongdb base de datos el id por el UID

 return usuario
}


module.exports = model('Usuario',  usuarioSchema)