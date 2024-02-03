// Import required modules
const express = require('express');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors())

const uri = 'mongodb+srv://NAYANKUMARRAJ:nkr2580@my-first-cluster.hz1puza.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect()
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.get('/',(req,res)=>{
      res.json({
        message: 'mission successful',
        database: 'connected'
  })
    })
    const database = client.db('test');
    const collection = database.collection('users');
    app.get('/users', async (req,res)=>{
    const result = await collection.find({}).toArray();
      res.json(result);
    })
  })
  .catch(err => {
    console.error('Error connecting to MongoDB Atlas', err);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});