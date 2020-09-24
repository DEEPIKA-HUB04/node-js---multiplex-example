var express = require('express');
var router = express.Router();
var {MongoClient, url, dbname,ObjectId} = require('../config')


router.post('/',async function(req,res){
let client;
    try{

        client = await MongoClient.connect(url)
      
          let db = client.db(dbname)
          await db.collection("flims").insertOne(req.body)
    
    client.close()

    res.json({

        message : `flim created `
    })   
    }
    catch(error){

        if(client) client.close()
        console.log(error);
    }



})






module.exports = router;