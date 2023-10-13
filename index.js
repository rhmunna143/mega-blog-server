const express = require('express');
const { MongoClient, ServerApiVersion, Db } = require('mongodb');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;

// middlewares

app.use(cors())
app.use(express.json())




app.get("/", (req, res) => {
    res.send("My First mega blog is running...YAY!! Munna")
})

// mongodb driver ---------------------------------

const uri = "mongodb+srv://munna:A652mlCkTJH4z8JV@cluster0.52hv04l.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // create (C)

        app.post("/blogs", async(req, res) => {
            const blogs = req.body;
            console.log(blogs);
            await Db.collection("blogs").insertOne(blogs)
        })

        app.get("/blogs", async(req, res) => {
            res.send("working")
        })
        
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}

run().catch(console.dir);


// listener ------------------------------------------------

app.listen(port, () => {
    console.log("Mega blog srv is running in port: ", `${port}`);
})