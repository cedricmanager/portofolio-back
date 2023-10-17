const express = require('express')
const app= express()
const bodyParser = require('body-parser')




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}))

const frameworkController = require("./controller/frameworkController");
app.use('/',frameworkController)

const server =app.listen(8080,()=>{
    console.log("server en marche :"+server.address().address+" port: "+server.address().port)
})

    
