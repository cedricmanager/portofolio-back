const express = require("express")
const router = express()

const connection = require("../connection")
const { json } = require("body-parser")

router.route("/projet")
    .get((req,res)=>{  calcule("select * from projet",null,(result)=>{ res.json(result) }) })
    .post((req,res)=>{calcule("insert into projet (title,resume,link) values (?,?,?)",[req.body],(result)=>{ res.json(result)  })   })
    .put((req,res)=>{ calcule("update projet set title=?, resume=?, link=? where id=?",[req.body],(result)=>{ res.json(result) }) })
    .delete((req,res)=>{ calcule("delete from projet where id=? ",[req.params.id],(result)=>{ res.json(result) })  })
    .get((req,res)=>{ calcule("select * from projet where id=?"[req.params.id],(result)=>{res.json(result)})})

function calcule(a,param,callBack){
     if(!param){ connection.query(a,(resultat,error)=>{error?callBack({result:false}):callBack({result:resultat}) })      }
     else if(param.method=="POST" || param.method=="PUT"){ connection.query(a,[param.title,param.resume,param.link,param.id],(resultat,error)=>{ error?callBack({result:false}):callBack({result:true}) })  }
     else if(!param.method || !param.method){  connection.query(a,[param.id],(result,error)=>{error?callBack({result:false}):callBack({result:true}) })  }
}