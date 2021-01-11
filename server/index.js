const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const connect = require('../db/connect');
const Grocery = require('../db/models');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// get grocery list
app.get('/list', async (req, res) => {
  try {
    const getList = await Grocery.find({});
    res.status(200).json(getList);
  } catch (e) {
    console.error(e);
    res.send(400).send(e);
  }
});

// add to grocery list
app.post('/list', async (req, res) => {
  console.log(req);
  try {
    const createItem = await Grocery.create({
      name: req.body.name,
      quantity: req.body.quantity,
      isComplete: false,
    });
    res.status(201).json(createItem);
  } catch (e) {
    res.status(400).send(e);
  }
});

// delete from grocery list
app.delete('/list/:id', async (req, res) => {
  const deleteItem = await Grocery.findByIdAndDelete({
    _id: req.params.id,
  }).exec();
  res.status(200).send('successfully deleted item');
});

// toggle completion
app.put('/list/:id', async (req, res) => {
  try {
    const toggleComplete = await Grocery.findByIdAndUpdate(
      { _id: req.params.id },
      { isComplete: !req.body.isComplete },
      { new: true }
    );
    res.status(200).send(toggleComplete);
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
});

app.use('/', express.static(path.join(__dirname, '../public')));

connect('mongodb://localhost:27017/grocerylist')
  .then(() =>
    app.listen(3001, () => {
      console.log('listening on port 3001');
    })
  )
  .catch((e) => console.error(e));
