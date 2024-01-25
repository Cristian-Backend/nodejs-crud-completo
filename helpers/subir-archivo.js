
const path = require('path')
const { v4: uuidv4 } = require('uuid'); // identificador unico, en este caso lo usamos para la imagen.

const subirArchivo = (files, extensionValidas = ['png', 'jpg', 'gif'], carpeta = '') => { // files es lo mismo que req.files

    return new Promise((resolve,reject) => { // hacemos una new promise para despues utilizarla en el archivo uploads nombrandole await subirarchivo()

        const {archivo} = files

        //SABER LAS EXTENSIONES DEL ARCHIVO.
        const nombreCortado = archivo.name.split('.') // las separaciones van a hacer por un punto.
        const extension = nombreCortado [nombreCortado.length -1]  // para saber la extension del archivo ej: jpg,txt,png.
    
    
                // VALIDAR EXTENSION // el argumento estan las extensiones.
            if(!extensionValidas.includes(extension)) {
              return reject(`las extension ${extension} no es valida, las extensiones validas son: ${extensionValidas} `) 
            }
    
    
        // creamos una carpeta llamada uploads que es donde se va archivar la imagen.
        const nombreFinal = uuidv4() + '.' + extension; // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed' // un uuid para la imagen para no subirla con el mismo nombre
        const  uploadPath = path.join (__dirname , '../uploads/', carpeta, nombreFinal); // aqui obtenemos toda la ruta + el uid de la imagen.
      
            // PATH significa ruta de todo el archivo.

        archivo.mv(uploadPath, (err) => { // donde se va a mover eso significa mv
          if (err) {
           reject(err)
          }
      
        // Devolver solo la URL relativa
        const urlRelativa = path.join(nombreFinal); // sin el path completo.
        resolve(urlRelativa);


    });
});
};

module.exports = {
    subirArchivo
}