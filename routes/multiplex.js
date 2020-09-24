var express = require('express');
var router = express.Router();
var {MongoClient, url, dbname,ObjectId} = require('../config')


router.get("/" ,async function(req,res){

    let client;
    
    try{

  client = await MongoClient.connect(url)

    let db = client.db(dbname)

   let multiplexData =  await db.collection("multiplex").find().toArray()
   client.close()
  res.json(multiplexData)
 
    }
    catch(error){
        if(client) client.close()
        console.log(error);
    }
})

router.post("/" ,async function(req,res){

    let client;
    try{

  client = await MongoClient.connect(url)

    let db = client.db(dbname)

    db.collection("multiplex").insertOne(req.body)

    client.close()

    res.json({

        message : "multiplex created"
    })   
    }
    catch(error){
        if(client){
            client.close()
        }
        console.log(error);
    }  
})

router.post('/create-screen/:multiplexId',async function(req,res){

    let client;
    try{

  client = await MongoClient.connect(url)

    let db = client.db(dbname)
req.body._id = ObjectId();
    await db.collection("multiplex").findOneAndUpdate({_id:ObjectId(req.params.multiplexId)} , {$push:{screens:req.body}})

    client.close()

    res.json({

        message : `screen inserted in ${req.params.multiplexId} `
    })   
    }
    catch(error){
        if(client){
            client.close()
        }
        console.log(error);
    }  
    
})
module.exports = router;