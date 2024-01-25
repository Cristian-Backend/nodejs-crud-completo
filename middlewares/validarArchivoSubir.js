const { response } = require("express");

const validarArchivoSubir = (req,res=response, next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) { // si no hay archivos en la propiedad files // console.log(req.files)
        res.status(400).json({msg: 'No hay archivos que subir - ValidarArchivoSubir'}); // no hay archivos en la peticion.
        return;
      }

      next()


}


module.exports = {
    validarArchivoSubir
}