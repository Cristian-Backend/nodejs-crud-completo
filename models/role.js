const {model, Schema} = require('mongoose')

const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio'] // si no coloco el nombre, se lanza ese mensaje.
    }})


    module.exports = model('Role',RoleSchema)