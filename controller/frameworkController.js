const express = require("express")
const router = express()

const connection = require("../connection")
const { json } = require("body-parser")

router.route("/projet")
    .get((req,res)=>{  calcule("select * from framework",null,(result)=>{ res.json(result) }) })
    .post((req,res)=>{calcule("insert into framework (name,version,info) values (?,?,?)",[req.body],(result)=>{ res.json(result)  })   })
    .put((req,res)=>{ calcule("update framework set name=?, version=?, info=? where name=?",[req.body],(result)=>{ res.json(result) }) })
    .delete((req,res)=>{ calcule("delete from framework where name=? ",[req.params.name],(result)=>{ res.json(result) })  })
    .get((req,res)=>{ calcule("select * from framework where name=?"[req.params.name],(result)=>{res.json(result)})})

function calcule(a,param,callBack){
     if(!param){ connection.query(a,(resultat,error)=>{error?callBack({result:false}):callBack({result:resultat}) })      }
     else if(param.method=="POST" || param.method=="PUT"){ connection.query(a,[param.name,param.version,param.info,param.name],(resultat,error)=>{ error?callBack({result:false}):callBack({result:true}) })  }
     else if(!param.method){  connection.query(a,[param.name],(result,error)=>{error?callBack({result:false}):callBack({result:true}) })  }
}
module.exports =router;

