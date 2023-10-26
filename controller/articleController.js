const express = require("express")
const router = express()

const connection = require("../connection")

router.get("/article",(req,res)=>{

    connection.query("select * from article desc",(error,result,fields)=>{

        if(error){
            console.log("Error affiche article :"+error);
        }
        else{
            res.json(result)
        }
    })
})

router.get("/articleid",(req,res)=>{
  connection.query("select * from article where id=?",[req.body.id],(error,result,fields)=>{
        if(error){
            console.log("Error affiche article id")
            res.json({result:false})
        }else{
            res.json(result)
        }
    })
})

router.post("/article",(req,res)=>{
    
    connection.query("insert into article (title,content,fk_framework,date) values (?,?,?,?)",[req.body.title,req.body.content,req.body.fk_framework,req.body.date],(error,result,fields)=>{
        if(error){
            console.log(" Error d\'enregistrement "+error)
            res.json({result:false})
        }else{
            res.json({result:true})
        }
    })
})

router.put("/article",(req,res)=>{
    connection.query("update article set title=?, content=?,fk_framework=?,date=? where id=?",[req.body.title,req.body.content,req.body.framework,req.body.date,req.body.id],(error,result,fields)=>{
        if(error){
            console.log("Error update "+error)
            res.json({result:false})
        }else{
            res.json({result:true})
        }
    })
})

router.delete("/article",(req,res)=>{
    connection.query("delete from article where id=?",[req.body.id],(error,result,fields)=>{
        if(error){
            console.log("Error Delete "+error)
            res.json({result:false})
        }else{
            res.json({result:true})
        }
    })
})
