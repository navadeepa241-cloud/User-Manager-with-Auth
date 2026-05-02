require('dotenv').config();
const express = require('express'); 
const cors = require('cors'); 
const connectDB = require('./db');
  
const app = express(); 
  
app.use(cors()); 
app.use(express.json()); 
  
connectDB(); 
  
app.use('/api/users', require('./routes/userRoutes')); 
  
app.listen(5000, () => console.log(`http://localhost:5000`))