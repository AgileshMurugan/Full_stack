const express = require("express")
const cors = require("cors")
const bodyparser = require("body-parser")
const mysql = require("mysql2")
const connect = express()
connect.use(cors())
connect.use(bodyparser.json())
connect.use(express.json())
connect.use(express.static('public'))
connect.use(bodyparser.urlencoded({extended:true}))
let databaseconnection=mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"@gilesh",
    database:"todolist"

})

databaseconnection.connect(function(error){
    if(error){
        console.log(error)
    }
    else{
        console.log("database connected")
    }
})


// insert data in todolist table from addtask
connect.post('/addtask',(request,response)=>{
    let{taskname,taskdescription}=request.body
    let sql='insert into todolist(taskname,taskdescription) values(?,?)'
    databaseconnection.query(sql,[taskname,taskdescription],(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error)
        }
        else{
            response.send({"status":"success"})
            console.log("ok")
        }
        
    })
})




// to do list all data
connect.get('/taskdetail',(request,response)=>{
    let sql='select * from todolist'
    databaseconnection.query(sql,(error,result)=>{
        if(error) {
            response.send(error)
            console.log(error)
        }
        else{
            response.send(result)
           
        }
       
    })
})
// Single task detail 
connect.get('/singletask/:id',(request,response)=>{
    let {id} = request.params
    let sql='select * from todolist where id=?'
    databaseconnection.query(sql,[id],(error,result)=>{
        if(error) {
            response.send(error)
            console.log(error)
        }
        else{
            response.send(result)
         
        }
        
    })
})
// update task detail
connect.put('/taskupdate/:id',(request,response)=>{
    let {id}=request.params
    let {taskname,taskdescription} = request.body
    let sql='update todolist set taskname=?,taskdescription=? where id=?'
    databaseconnection.query(sql,[taskname,taskdescription,id],(error,result)=>{
        if(error){
            response.send({"status":"not_updated"})
            console.log(error)
        }
        else{
            response.send({"status":"success","id":id})
            console.log("ok")
        }
    })
})
// delete the book
connect.post('/delete',(request,response)=>{
    let id = request.body.id  
    let sql='delete from todolist where id=?'
    databaseconnection.query(sql,[id],(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error)
        }
        else{
            response.send({"status":"success"})
            console.log("okay")
        }
    })
})

// database connection
connect.listen(5140,()=>{
    console.log("your server is running in port 5140")
})