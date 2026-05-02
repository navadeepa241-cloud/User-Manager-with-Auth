const express = require('express'); 
const router = express.Router(); 
  
const auth = require('../middleware/auth'); 
  
const { 
  register, 
  login, 
  getUsers, 
  addUser, 
  updateUser, 
  deleteUser 
} = require('../controllers/userController'); 
  
// AUTH 
router.post('/register', register); 
router.post('/login', login); 
  
// CRUD (PROTECTED) 
router.get('/', auth, getUsers); 
router.post('/', auth, addUser); 
router.put('/:id', auth, updateUser); 
router.delete('/:id', auth, deleteUser); 

module.exports = router; 