const {response} = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario')
const { restart } = require('nodemon')

const usuariosGet = async (req,res = response)=> {

    const usuarios = await Usuario.find({estado: true}) // trae a todos los usuarios, si esta en true, no aparece en el  contador
    const contadorUsuarios = usuarios.length;

res.json({
    msg: 'Usuarios Get',
    total: contadorUsuarios,
    usuarios
            

})
}


const usuariosPost = async (req,res) => {

const {nombre , correo, password , rol} = req.body

const usuario = new Usuario ({nombre , correo , password, rol}) // lo que quiero que se vea

const salt = bcryptjs.genSaltSync(); // numero de vueltas por defecto es 10
 usuario.password = bcryptjs.hashSync( password, salt );

    await usuario.save();

    res.status(201).json({
        msg: 'Usuario Creado',
        usuario 
    })

}


const usuariosPut = async (req,res) => {


    const {id} = req.params

    const {password, google, ...resto} = req.body // lo que no quiero que se actualice, lo que esta en resto se podra actualizar.


    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto) // buscar por el id y actualizarlo. el id es del req.params


    res.json({
        msg: "Usuario Actualizado",
        usuario
   })
    

}


const usuariosDelete = async (req,res) => { // ruta protegida con JWT


    const {id} = req.params

    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false}) // pone en la base de datos el estado en false.
   



    res.json({
      
        usuario 
      
})

}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}