const { response } = require("express");

const path = require('path') // para saber la url completa.
const fs = require('fs')

//SUBIDA DE IMAGENES
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL) // autenticacion cloudinary , la env esta en su pagina web y hay que colocarla en el arhcivo .env

const { subirArchivo } = require("../helpers/subir-archivo");

const Usuario = require('../models/usuario')
const Producto = require('../models/producto')

const cargarArchivos = async(req,res = response) => {

          // Hay que colocarlo en un try/catch o revienta por ej reject del subir archivo.
      try {
       // const pathCompleto = await subirArchivo(req.files, ['txt', 'md'], 'textos') // llamamos al archivo solo con el nombre. / los argumentos, vienen de subir archivos.
       const pathCompleto = await subirArchivo(req.files, undefined, 'imgs')

        res.json({
          path: pathCompleto
        })

      } catch (error) {
        res.status(400).json({error})

      }

    }

    //ACTUALIZAR IMAGEN
    
    const actualizarImagen = async (req, res = response) => {


      const {id, coleccion} = req.params

     
      let modelo;

      switch (coleccion) {
        case 'usuarios':
          modelo = await Usuario.findById(id)
          if(!modelo){
            res.status(400).json({
              msg: `No existe el usuario con el id ${id}`
            })
          }
          break;
          
        case 'productos': 
        modelo = await Producto.findById(id)
        if(!modelo) {
          res.status(400).json({
            msg: `no existe este producto con el id ${id}`
          })
        }
        break;

      
        default:
          return res.status(500).json({msg: 'Se me olvido validar esto.'})
      }


      // limpiar imagen previa , osea borrar las fotos ANTERIORMENTE subidas.
      if(modelo.img){ // si el modelo tiene la imagen establecida.
        /*
         hay que borrar la imagen del servidor si ya existe la imagen.
        necesito saber si estoy borrando la img de un usuario o de un producto, por eso la coleccion , y necesito saber que imagen borrar.
        */
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img ) 
        if (fs.existsSync(pathImagen)){ // preguntamos si existe , y mandamos la ruta.
          fs.unlinkSync (pathImagen) // si  esta imagen existe , borramos la img.
        }
      }
      
      const nombre = await subirArchivo(req.files, undefined, coleccion) // volver a subir el archivo, tiene que ser con el modelo de coleccion, usuario,producto.
      modelo.img = nombre

      await modelo.save()

      res.json(modelo)

    }

    // CLOUDINARY
    const actualizarImagenCloudinary = async (req, res = response) => {


      const {id, coleccion} = req.params

     
      let modelo;

      switch (coleccion) {
        case 'usuarios':
          modelo = await Usuario.findById(id)
          if(!modelo){
            res.status(400).json({
              msg: `No existe el usuario con el id ${id}`
            })
          }
          break;
          
        case 'productos': 
        modelo = await Producto.findById(id)
        if(!modelo) {
          res.status(400).json({
            msg: `no existe este producto con el id ${id}`
          })
        }
        break;

      
        default:
          return res.status(500).json({msg: 'Se me olvido validar esto.'})
      }


      // "img": "https://res.cloudinary.com/dvsk71cr1/image/upload/v1706195608/r83ekyijgqshrwe0erv8.jpg" imagen para recortar con split
      if(modelo.img){ 
        const nombreArr = modelo.img.split('/') // separa por el /  y es como un array.
        const nombre = nombreArr [nombreArr.length -1] // accedemos al penultimo elemento, osea r83ekyijgqshrwe0erv8
        const [public_id] = nombre.split('.')
//sds

        console.log(public_id) // id de cloudinary que esta en su pagina web.

      }
      
   //    console.log(req.files.archivo) // de ahi viene el temfilepath
      const {tempFilePath} = req.files.archivo
      const {secure_url} = await cloudinary.uploader.upload( tempFilePath ) // subimos el temfilepath a cloudinary


      modelo.img = secure_url

      await modelo.save()

      res.json(modelo) 

    } 



    //MOSTRAR IMAGEN

    const mostrarImagen = async(req, res=response) => { // YA PODEMOS VER LA IMG localmente

      const {id, coleccion} = req.params

     
      let modelo;

      switch (coleccion) {
        case 'usuarios':
          modelo = await Usuario.findById(id)
          if(!modelo){
            res.status(400).json({
              msg: `No existe el usuario con el id ${id}`
            })
          }
          break;
          
        case 'productos': 
        modelo = await Producto.findById(id)
        if(!modelo) {
          res.status(400).json({
            msg: `no existe este producto con el id ${id}`
          })
        }
        break;

      
        default:
          return res.status(500).json({msg: 'Se me olvido validar esto.'})
      }

      if(modelo.img){ // si el modelo tiene la imagen establecida.
     
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img ) 
        if (fs.existsSync(pathImagen)){ // preguntamos si existe , y mandamos la ruta.
        return res.sendFile (pathImagen) // si  esta imagen existe , mandamos el archivo con el path
    
        }

      }
      

      // si no existe la imagen , mandamos una imagen not found
     const pathImagen = path.join(__dirname, '../assets/13.1 no-image.jpg.jpg')
     res.sendFile(pathImagen)
     
    }

module.exports = {
    cargarArchivos,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}