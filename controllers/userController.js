const User = require('../models/User'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
  
// REGISTER 
exports.register = async (req, res) => { 
  const { name, email, password } = req.body; 
  
  const hashed = await bcrypt.hash(password, 10); 
  
  const user = await User.create({ name, email, password: hashed }); 
  
  res.json(user); 
}; 
  
// LOGIN 
exports.login = async (req, res) => { 
  const { email, password } = req.body; 
  
  const user = await User.findOne({ email }); 
  
  if (!user) return res.status(404).json({ message: "User not found" }); 
  
  const match = await bcrypt.compare(password, user.password); 
  
  if (!match) return res.status(400).json({ message: "Invalid password" 
}); 
  
  const token = jwt.sign({ id: user._id }, "secretkey"); 
  
  res.json({ token }); 
}; 
  
// GET USERS 
exports.getUsers = async (req, res) => { 
  const users = await User.find(); 
  res.json(users); 
}; 
  
// ADD USER 
exports.addUser = async (req, res) => { 
  const user = await User.create(req.body); 
  res.json(user); 
}; 
  
// UPDATE 
exports.updateUser = async (req, res) => { 
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { 
new: true }); 
  res.json(user); 
}; 
  
// DELETE 
exports.deleteUser = async (req, res) => { 
  await User.findByIdAndDelete(req.params.id); 
  res.json({ message: "Deleted" }); 
};