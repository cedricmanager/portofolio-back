const express = require("express")
const router = express()

const connection = require("../connection")
const { json } = require("body-parser")

router.route("/projetFrame")
    .get((req,res)=>{  calcule("select * from projetFrameWork",null,(result)=>{ res.json(result) }) })
    .post((req,res)=>{calcule("insert into projetframeWork (fk_project,fk_framework,date) values (?,?,?)",[req.body],(result)=>{ res.json(result)  })   })
    .put((req,res)=>{ calcule("update projetFrameWork set fk_projet=?, fk_framework=?, date=? where id=?",[req.body],(result)=>{ res.json(result) }) })
    .delete((req,res)=>{ calcule("delete from projetFramework where id=? ",[req.params.id],(result)=>{ res.json(result) })  })
    .get((req,res)=>{ calcule("select * from projetFramework where id=?"[req.params.id],(result)=>{res.json(result)})})

function calcule(a,param,callBack){
     if(!param){ connection.query(a,(resultat,error)=>{error?callBack({result:false}):callBack({result:resultat}) })      }
     else if(param.method=="POST" || param.method=="PUT"){ connection.query(a,[param.projet,param.framework,param.date,param.id],(resultat,error)=>{ error?callBack({result:false}):callBack({result:true}) })  }
     else if(!param.method){  connection.query(a,[param.id],(result,error)=>{error?callBack({result:false}):callBack({result:true}) })  }
}
module.exports=router