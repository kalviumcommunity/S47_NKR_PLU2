// Import required modules
const express = require('express');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');


// Create an instance of Express
const app = express();

// Define a route
app.get('/ping', (req, res) => {
  res.json({ message: 'Hello, Nayan here!',
  name: 'Nayan',
  country: 'USA',
  age: 21,
  married: true,
  identification: '1234567890',
  gender: 'male',
  address: '123 Main St, Anytown USA',
  timestamp: Date.now()
})
}).get('/about', (req, res) => {
  res.send('This is the About page');
})


// Connection URI
const uri = 'mongodb+srv://NAYANKUMARRAJ:nkr2580@my-first-cluster.hz1puza.mongodb.net/?retryWrites=true&w=majority';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB cluster
client.connect()
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    // Do something with the connected client, such as performing database operations
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

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
console.log('Hello, Nayan here2!');
