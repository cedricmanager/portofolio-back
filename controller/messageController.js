const express = require("express")
const router = express()
const connection = require("../connection")

router.route("/message")
.get((req, res) => {  if (req.query.type == "projet") {  calcule("select * from message where fk_project=? order by date desc", [req.params.id], (result) => {   res.json(result);  });    
                   } else {calcule("select * from message where fk_article=? order by date desc", [req.params.id], (result) => {res.json(result);});     
    }})
.post((req,res)=>{calcule("insert into message (pseudo,message,date) values (?,?,?)",[req.body],(result)=>{ res.json(result)  })   })
.delete((req,res)=>{ calcule("delete from message where id=? ",[req.params.id],(result)=>{ res.json(result) })  })

function calcule(a,param,callBack){
    if(param.method=="POST" || param.method=="PUT"){ connection.query(a,[param.pseudo,param.message,param.date,param.id],(resultat,error)=>{ error?callBack({result:false}):callBack({result:true}) })  }
     else if(!param.method){  connection.query(a,[param.id],(result,error)=>{error?callBack({result:false}):callBack({result:true}) })  }
}