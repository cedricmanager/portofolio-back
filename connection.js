const mysql = require('mysql')

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'portofoliopersonnel'
    
})

connection.connect((err)=>{
    if (err){ 
        console.log( "probleme de connection"+err)
    } 
    else{
        console.log("vous etes connecté")
    }
  
})
module.exports = connection;