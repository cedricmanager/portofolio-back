const express = require("express")
const router = express()

const connection = require("../connection")

router.get("/article",()=>{

    connection.query("select * from article desc",(error,result,fields)=>{

        if(error){
            console.log("Error affiche article :"+error);
        }
        else{
            res.json(result)
        }
    })
})

