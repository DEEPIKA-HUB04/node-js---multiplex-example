var express = require('express');
var router = express.Router();
var {MongoClient, url, dbname,ObjectId} = require('../config')
const bcrypt = require('bcryptjs')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',async function(req, res, next) {
  let client;
    try{

        client = await MongoClient.connect(url)
      
          let db = client.db(dbname)

          
      //     1. get plain password
     //      2.generate salt
 let salt =   await bcrypt.genSalt(10)
 //console.log(salt)
      //     3.hash it

      let hash = await bcrypt.hash(req.body.password,salt)
      // console.log(hash)
      req.body.password = hash;   // replacing
        //   4.store it in DB
        

 await db.collection("users").insertOne(req.body)
          
    client.close()

    res.json({

        message : `user registered `
    })   
    }
    catch(error){

        if(client) client.close()
        console.log(error);
    }
});

router.post('/login',async function(req,res){
  let client;
  try{

      client = await MongoClient.connect(url)
    
        let db = client.db(dbname)

     // find the user with email

     let user = await db.collection("users").findOne({email : req.body.email})
   
   if(user){

let result = await bcrypt.compare(req.body.password,user.password)
   if(result)

{
  client.close()

  res.json({

      message : `success`
  })   
}
else
client.close()

  res.json({

      message : `username and password not wrong`
  })   
}
   else{

    res.status(404).json({

      message : "user not found"
    })
   }
   
   
     // get the stored hash from db
     // hash the password entered by user
     // compare both hash
     //if true then allow
        
  
  }
  catch(error){

      if(client) client.close()
      console.log(error);
  }


})
module.exports = router;
