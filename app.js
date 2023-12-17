require('dotenv').config()
const express =  require('express')
const cors = require('cors')
const app = express()
const routerUsuarios = require('./routes/usuarios.routes')




//midlewares
app.use(cors())
app.use(express.static('public'))
app.use(express.json())

//rutas
app.use('/api/usuarios', routerUsuarios )


app.listen(process.env.PORT,()=> {
    console.log("SERVIDOR UP")
})


