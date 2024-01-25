const Usuario = require('../models/usuario')
const Role = require('../models/role')
const Categoria = require('../models/categoria')
const Producto = require('../models/producto')

//verificar si el email existe en la base de datos.
const EmailValido = async(correo = '')=> {

    const EmailExiste = await Usuario.findOne({correo})

        if(EmailExiste){
            throw new Error (`el correo ${correo} ya esta registrrado en la Base de datos`)
        }


}


// role si existe en base de datos.
const RoleValido = async (rol = '') => {
    const RolExiste = await Role.findOne({ rol })
    if (!RolExiste) { 
        throw new Error(`Este rol no existe en la Base de datos`)
    }
}




      //Verificamos si existe el Usuario por ese  ID
      const existeUsuarioPorID = async(id)=> {
      
        const usuarioExiste = await Usuario.findById(id) // traemos al usuario por ID
        if (!usuarioExiste){
           throw new Error (`el id  ${id} no existe ` )
            }
        }


    const existeCategoriaPorId = async(id) => {
        const categoriaExiste = await Categoria.findById(id)

        if (!categoriaExiste){
            throw new Error (`el id  ${id} no existe ` )
             }


    }

    const existeProductoPorId = async(id)=> {
        const productoExiste = await Producto.findById(id)

        if (!productoExiste) {
            throw new Error (`el id ${id} no existe`)
        }
    }

    //VALIDAR colecciones permitidas
    const coleccionesPermitidas  = (coleccion = '', colecciones = []) => { // estos argumentos estan en las rutas.
       
        const incluida = colecciones.includes(coleccion)
        if (!incluida) {
            throw new Error (`la coleccion ${coleccion} no es permitida`, `${colecciones}`)
        }
            return true
    }

module.exports = {
    EmailValido,
    RoleValido,
    existeUsuarioPorID,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}