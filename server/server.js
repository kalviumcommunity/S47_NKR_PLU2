// server.js
const express = require('express');
const mongoose = require('mongoose');
const User = require('./user.js');
const cors = require('cors')
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;
app.use(express.json()); // Add this middleware to parse JSON in the request body
// app.use(cors())
app.use(cookieParser());
const SECRET_KEY = 'secret';
app.use(cors({
  origin: 'http://localhost:5173', // replace with your frontend origin
  credentials: true
}));

mongoose.connect('mongodb+srv://NAYANKUMARRAJ:nkr2580@my-first-cluster.hz1puza.mongodb.net/?retryWrites=true&w=majority', {dbName: 'test'})
  .then(() => {
    console.log('Connected to the database');

    //********************************READ**************************************** */
    app.get('/', async (req, res) => {
      try {
        const users = await User.find(); 
        res.json(users); 
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
    //*********************************CREATE*****************************************/

    // POST route to create a new user
    app.post('/users', async (req, res) => {
      const schema = Joi.object({
        name: Joi.string().min(3).max(30).required().label('Userame'),
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

    //****************************UPDATE*************************************** */

    // PUT route to update a user by ID
    const jwt = require('jsonwebtoken');

app.put('/users/:id', async (req, res) => {
  const newData = req.body; // Get the updated data from the request body
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header not provided' });
  }

  const token = authHeader.split(' ')[1];
  let decoded;

  try {
    decoded = jwt.verify(token, SECRET_KEY);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      // The token has expired
      return res.status(401).json({ message: 'Token expired. Please log in again.' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      // Some other JWT error occurred
      return res.status(401).json({ message: 'Invalid token.' });
    }
    // Handle other errors
    return res.status(500).json({ message: 'Error verifying token', error: error.message });
  }

  const userId = req.params.id;

  // Ensure both userId and decoded.userId are strings before comparing
  if (typeof userId !== 'string' || typeof decoded.userId !== 'string') {
    return res.status(400).json({ message: 'Invalid user ID format.' });
  }

  if (decoded.userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized: cannot update other users' });
  }

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


    //****************************LOGIN***************************************** */

    // POST route to login
    app.post('/login', async (req, res) => {
      const schema = Joi.object({
        name: Joi.string().min(3).max(30).required().label('Username'),
        email: Joi.string().email().required().label('Email'),
      }).options({ abortEarly: false });
    
      const userData = req.body;
    
      const { error, value } = schema.validate(userData);
    
      if (error) {
        res.status(400).json({ message: 'Validation failed', errors: error.details });
        return;
      }
    
      const { name, email} = value;
    
      try {
        const findUser = await User.findOne({ name, email });
        if (!findUser) {
          res.status(404).json({ message: 'user not found' });
          return;
        }
        const token = jwt.sign({ userId: findUser._id, email: findUser.email }, SECRET_KEY ,{expiresIn: '1h'});
        console.log(token)
        res.cookie('token', token, { httpOnly: false, maxAge: 36000000, sameSite: 'none', secure: true,path: '/' }); // 1 hour expiration time
        res.cookie('username', name,{httpOnly: true});
        res.status(200).json({message: 'user found and logged in'});
      } catch (err) {
        res.status(500).json({ message: 'Error', error: err.message });
      }
    });

    //*****************************LOGOUT*******************************/

    app.get('/logout', (req, res) => {
      res.clearCookie('username');
      res.clearCookie('token');
      res.status(200).send({ message: 'Logged out successfully' });
    });
    
    //****************************DELETE********************************/

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

    //*******************AUTHENTICATION*********************************/


    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
});