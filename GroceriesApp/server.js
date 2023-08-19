const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost/groceries', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Define the Grocery Schema and Model
const grocerySchema = new mongoose.Schema({
  name: String,
});

const Grocery = mongoose.model('Grocery', grocerySchema);

// CRUD endpoints for groceries
app.get('/groceries', (req, res) => {
  Grocery.find().then(groceries => res.send(groceries));
});

app.post('/groceries', (req, res) => {
  const grocery = new Grocery({ name: req.body.name });
  grocery.save().then(() => res.send(grocery));
});

app.delete('/groceries/:id', (req, res) => {
  Grocery.findByIdAndDelete(req.params.id).then(() => res.send({ message: 'Deleted successfully' }));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
