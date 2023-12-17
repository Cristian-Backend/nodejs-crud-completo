const {response} = require('express')

const usuariosGet = (req,res = response)=> {

    const {nombre, apellido, } = req.query

    res.json({
        msg: 'get API',
        nombre, apellido
    })

}


const usuariosPost = (req,res) => {

const {nombre , edad} = req.body



    res.status(201).json({
        msg: "POST- API",
        nombre, edad
    })

}


const usuariosPut = (req,res) => {


    const {id} = req.params


    res.json({
        msg: "PUT- API",
        id
   })
    

}


const usuariosDelete = (req,res) => {

    res.json({
        msg: "DELETE- API"
})

}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}