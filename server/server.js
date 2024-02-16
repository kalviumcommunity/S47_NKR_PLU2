// server.js
const express = require('express');
const mongoose = require('mongoose');
const User = require('./user.js');
const cors = require('cors')
const Joi = require('joi');


const app = express();
const PORT = 3000;
app.use(express.json()); // Add this middleware to parse JSON in the request body
app.use(cors())

mongoose.connect('mongodb+srv://NAYANKUMARRAJ:nkr2580@my-first-cluster.hz1puza.mongodb.net/?retryWrites=true&w=majority', {dbName: 'test'})
  .then(() => {
    console.log('Connected to the database');

    // Add a route to handle GET requests for retrieving all users
    app.get('/', async (req, res) => {
      res.header({
      "Access-Control-Allow-Origin": "*"
      })
      try {
        const users = await User.find(); // Retrieve all users from the database
        res.json(users); // Return the list of users as JSON
      } catch (error) {
        res.status(500).json({ message: error.message }); // Handle any errors
      }
    });

    //***************************************************************************/

    // POST route to create a new user
    app.post('/users', async (req, res) => {
      res.header({
        "Access-Control-Allow-Origin": "*",
      })

      const schema = Joi.object({
        name: Joi.string().alphanum().min(3).max(30).required().label('Userame'),
        email: Joi.string().email().required().label('Email'),
      }).options({abortEarly: false});

      const userData = req.body; // Get user data from the request body
      console.log('request body:  ',userData)
      const { error, value } = schema.validate(userData);
      if (error) {
        console.log(error)
        res.status(400).json({ error });
      }
      else {
        try {
          console.log("validated value:  ",value)
          const createdUser = await User.create(value); // Create a new user
          console.log('user created:  ',createdUser)
          res.status(201).json(createdUser); // Respond with the created user
        } catch (error) {
          res.status(500).json({ message: 'Error creating user', error: error.message }); // Respond with an error message
        }
      }
    });

    //***************************************************************** */

    // PUT route to update a user by ID
    app.put('/users/:id', async (req, res) => {
      const userId = req.params.id; // Get the user ID from the request params
      const newData = req.body; // Get the updated data from the request body
      try {
        const updatedUser = await User.findByIdAndUpdate(userId, newData, { new: true }); // Find a user by ID and update with the new data
        if (updatedUser) {
          res.status(200).json(updatedUser); // Respond with the updated user
        } else {
          res.status(404).json({ message: 'User not found' }); // Respond with a message if user is not found
        }
      } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message }); // Respond with an error message
      }
    });

    //********************************************************/

    // DELETE route to delete a user by ID
    app.delete('/users/:id', async (req, res) => {
      const userId = req.params.id; // Get the user ID from the request params
      try {
        const deletedUser = await User.findByIdAndDelete(userId); // Find a user by ID and delete
        if (deletedUser) {
          res.status(200).json(deletedUser); // Respond with the deleted user
        } else {
          res.status(404).json({ message: 'User not found' }); // Respond with a message if user is not found
        }
      } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message }); // Respond with an error message
      }
    });
  
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
});