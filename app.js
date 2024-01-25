require('dotenv').config()
const express =  require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const app = express()
const routerUsuarios = require('./routes/usuarios.routes')
const routerAuth = require('./routes/auth.routes')
const routerCategorias = require('./routes/categorias.routes')
const routerProductos = require('./routes/productos.routes')
const routerBuscar = require('./routes/buscar.routes')
const routerUploads = require('./routes/uploads.routes')
const { dbConection } = require('./database/config')




//midlewares
app.use(cors())
app.use(express.static('public'))
app.use(express.json())

app.use(fileUpload({ // midlewares para las cargas de archivos.
    useTempFiles : true,
    tempFileDir : '/tmp/',
    createParentPath: true // es para crear carpetas, esta en la documentacion.
}));

//rutas
app.use('/api/usuarios', routerUsuarios )
app.use('/api/auth', routerAuth) 
app.use('/api/categorias', routerCategorias)
app.use('/api/productos', routerProductos) 
app.use('/api/buscar', routerBuscar)
app.use('/api/uploads', routerUploads)


app.listen(process.env.PORT,()=> {

    dbConection()    
    console.log("SERVIDOR UP")
})


