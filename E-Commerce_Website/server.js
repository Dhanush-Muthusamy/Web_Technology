const cors = require('cors')
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());

//mongodb
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://harshan:2qWouluUfy0AU0sX@cluster0.c1rpxhj.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});





    app.get("/register",async(req,res)=>{
        console.log("register");
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        const myDB = client.db("cred");
        const Col = myDB.collection("cred");
        const doc = { name: req.query.name, password: req.query.password };
        const result = await Col.insertOne(doc);
        console.log(`A document was inserted with the _id: ${result.insertedId}`,);
        await client.close();
        res.send({msg:"Successfully inserted",register:true});
    })
    
    app.get("/login",async(req,res)=>{
        console.log("login");
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        const myDB = client.db("cred");
        const Col = myDB.collection("cred");
        username  = req.query.name;
        password = req.query.password;
    //    console.log(username);
        const cursor =  Col.find({"name": username});
    //    const cursor = Col.find();
        const doc = await cursor.toArray();
        if(doc[0]["password"]===password){
            res.send({msg:"Successfully logged in",login:true});
        }
        else{
            res.send({msg:"Login failed",login:false});
        }
        await client.close();
    
        
    })
    
const port = 9000;
app.listen(port,()=>{
    console.log(`listening at port ${port}`);
})
