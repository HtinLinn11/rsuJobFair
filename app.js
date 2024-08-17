require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

const userRoute = require('./routes/userRoute');
const jobOfferRoute = require('./routes/jobOfferRoute');
const jobOfferUnapprovedRoute = require('./routes/jobOfferUnapprovedRoute');
const applicationRoute = require('./routes/applicationRoute');
const interviewRoute = require('./routes/interviewRoute');
var cors = require('cors')

const app = express();

// Middleware
app.use(cors()) // Use this after the variable declaratio
app.use(express.json());

// Log the MongoDB URI
console.log('Attempting to connect to MongoDB URI:', process.env.MONGODB_URI);

// MongoDB connection using MongoClient
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectMongoDB() {
  try {
    await client.connect();
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Connect to Mongoose after the MongoClient connection is established
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB using Mongoose'))
    .catch(err => console.error('Error connecting to MongoDB with Mongoose:', err));
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the application if connection fails
  }
}

connectMongoDB();

// Use routes
app.use('/api', userRoute);
app.use('/api', jobOfferRoute);
app.use('/api', jobOfferUnapprovedRoute);
app.use('/api', applicationRoute);
app.use('/api', interviewRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
