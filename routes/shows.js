var express = require('express');
var router = express.Router();
var {MongoClient, url, dbname,ObjectId} = require('../config')


router.post('/create-show/:multiplexId/:screenId',async function(req,res){
    let client;

    try{

        client = await MongoClient.connect(url)
      
          let db = client.db(dbname)
req.body.multiplexId = ObjectId(req.params.multiplexId);
req.body.screenId = ObjectId(req.params.screenId);
          db.collection("shows").insertOne(req.body)
          client.close()

    res.json({

        message : `show created for ${req.params.screenId} `
    })   
    }
    catch(error){

        if(client) client.close()
        console.log(error);
    }


})

router.post('/assign-flim-for-show/:showId/:flimId',async function(req,res){

    let client;

    try{

        client = await MongoClient.connect(url)
      
          let db = client.db(dbname)

          await db.collection("shows").findOneAndUpdate({ _id :ObjectId(req.params.showId) } , {$set:{FlimId: ObjectId(req.params.FlimId)}})
          client.close()

          res.json({
      
              message : `flin assisgned for show `
          })   
          }
          catch(error){
      
              if(client) client.close()
              console.log(error);
          }
      
})




module.exports = router;