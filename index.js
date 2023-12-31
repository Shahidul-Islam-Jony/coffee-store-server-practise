const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dd29rey.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


// from mongodb atlas connection
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // //from mongodb crud
        // const coffeeDB= client.db("coffeeDB");
        // const coffeeCollection = coffeeDB.collection("coffee"); //Othoba nicherta eksathe babohar kora jai
        const coffeeCollection = client.db("coffeeDB").collection("coffee");

        // for create a coffee use post
        app.post('/coffee',async(req,res)=>{
            const newCoffee = req.body;
            const result = await coffeeCollection.insertOne(newCoffee);
            res.send(result);
            console.log(result);
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();   //comment this for run everytime
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Server is running')
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})