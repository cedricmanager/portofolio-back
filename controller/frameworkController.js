const express = require('express')
const router= express()

const connection = require("../connection")

    router.get('/framework',(req,res)=>{
        console.log(req)
        connection.query('select * from framework', (error,results,fields)=>{
            if (error){console.log(" error "+error); }
                
        
            else{
                console.log(results);
                res.end(JSON.stringify(results))
            }
        })
    })

    router.post('/ajoutFramework', function(req,res){

        console.log(req.body.id)
        connection.query('insert into framework (nom,version,info) values (?,?,?)',[req.body.nom,req.body.version,req.body.info],(error,results,fields)=>{

            if(error){
                console.log(error)
                res.json({valeur:false})
            }
            else{
                console.log(results)
                res.json({valeur:true})

            }
        })
    })
    /**
     * updating La class Framework
     * 
     */
    router.put('/updateFramework',function(req,res){

        connection.query('update framework set nom=?,version=?, info=? ',[req.body.nom,req.body.version,req.body.info],(error,results,fields)=>{

            if(error){
                console.log(error)
                res.end(JSON.stringify({valeur:false}))
            }
            else{
                console.log(results)
                res.end(JSON.stringify({valeur:true}))
            }
        })
    })

    router.delete('/deleteFramework',function(req,res){
        console.log(req.body.id)
        connection.query('delete from framework where nom=?',[req.body.id], (error,results,fields)=>{
            if(error){
                console.log(error)
                res.end(JSON.stringify({valeur:false}))
            }
            else{
                console.log(results)
                res.end(JSON.stringify({valeur:true}))
            }
        })
    })
module.exports =router;

