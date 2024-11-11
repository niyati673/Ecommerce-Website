const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config');

const api = process.env.API_URL;
const productsRouter = require('./routes/productRoutes')
const cartRouter = require('./routes/cartRoutes')

app.use(cors());
app.options('*',cors())
//middleware
app.use(bodyParser.json())
app.use(morgan('tiny'))

//routers
app.use(`${api}/products`,productsRouter)
app.use(`${api}/cart`,cartRouter)

mongoose.connect(process.env.CONNECTION_STRING,{
    dbName:'Kora'
}).then(()=>{
    console.log('Database Connection is ready...')
}).catch((err)=>{
    console.log(err)
})

app.listen(3000,()=>{
    console.log('server is running http://localhost:3000')
})