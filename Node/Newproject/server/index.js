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
    database:"newproject"

})

databaseconnection.connect(function(error){
    if(error){
        console.log(error)
    }
    else{
        console.log("database connected")
    }
})


// insert data in customerdetails table from signin
connect.post('/signin',(request,response)=>{
    let{customername,mobileno,emailid,password}=request.body
    let sql='insert into cus_details(customername,mobileno,emailid,password) values(?,?,?,?)'
    databaseconnection.query(sql,[customername,mobileno,emailid,password],(error,result)=>{
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
connect.get('/getall',(request,response)=>{
    let sql='select * from cus_details'
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
connect.get('/singleuser/:customerid',(request,response)=>{
    let {customerid} = request.params
    let sql='select * from cus_details where customerid=?'
    databaseconnection.query(sql,[customerid],(error,result)=>{
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
connect.put('/taskupdate/:customerid',(request,response)=>{
    let {customerid}=request.params
    let {customername,mobileno,emailid,password} = request.body
    let sql='update cus_details set customerame=?,mobileno=? emailid=?,password=?  where customerid=?'
    databaseconnection.query(sql,[customerid,customername,mobileno,emailid,password],(error,result)=>{
        if(error){
            response.send({"status":"not_updated"})
            console.log(error)
        }
        else{
            response.send({"status":"success","customerid":customerid})
            console.log("ok")
        }
    })
})
// delete the book
connect.post('/delete',(request,response)=>{
    let customerid = request.body.customerid  
    let sql='delete from cus_details where id=?'
    databaseconnection.query(sql,[customerid,customername,mobileno,emailid,password],(error,result)=>{
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

// login Page
connect.post('/login',(request,response)=>{
    let {customername,password}=request.body
    let sql='select * from cus_details where customername=?'
    databaseconnection.query(sql,[customername,password],(error,result)=>{
        if(error){
            response.send({"status":"empty_set"})
        }
       else if(result.length>0){
        var dbcustomername=result[0].customername
        var dbpassword=result[0].password
        var customerid = result[0].customerid
       
                  
        if(dbcustomername===customername && dbpassword===password ){
          
            response.send({"status":"success","customerid":customerid,
            
        })
        }
        else{
            response.send({"status":"invalid_password"})
        }
        }
        else{
            response.send({"status":"both_are_invalid"})
        }
    })

})

// update  profileMore actions
connect.put('/profile/:customerid',(request,response)=>{
    let {customerid}=request.params
    let {customername,mobileno,emailid,password} = request.body
    let sql='update cus_details set customername=?,mobileno=?,emailid=?,password=? where customerid=?'
    databaseconnection.query(sql,[customerid,customername,mobileno,emailid,password],(error,result)=>{
        if(error){
            response.send({"status":"not_updated"})
            console.log(error)
        }
        else{
            response.send({"status":"success"})
            console.log("ok")
        }
    })
})
// database connection
connect.listen(5140,()=>{
    console.log("your server is running in port 5140")
})