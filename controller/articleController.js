const express = require("express")
const router = express()

const connection = require("../connection")

router.route("/article")
    .get((req,res)=>{  calcule("select * from article",null,(result)=>{ res.json(result) }) })
    .post((req,res)=>{calcule("insert into article (title,content,date) values (?,?,?)",[req.body],(result)=>{ res.json(result)  })   })
    .put((req,res)=>{ calcule("update article set title=?, content=?, date=? where id=?",[req.body],(result)=>{ res.json(result) }) })
    .delete((req,res)=>{ calcule("delete from article where id=? ",[req.params.id],(result)=>{ res.json(result) })  })
    .get((req,res)=>{ calcule("select * from article where id=?"[req.params.id],(result)=>{res.json(result)})})

function calcule(a,param,callBack){
     if(!param){ connection.query(a,(resultat,error)=>{error?callBack({result:false}):callBack({result:resultat}) })      }
     else if(param.method=="POST" || param.method=="PUT"){ connection.query(a,[param.title,param.content,param.date,param.id],(resultat,error)=>{ error?callBack({result:false}):callBack({result:true}) })  }
     else if(!param.method){  connection.query(a,[param.id],(result,error)=>{error?callBack({result:false}):callBack({result:true}) })  }
}