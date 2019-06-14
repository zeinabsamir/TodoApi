const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
var mongoose = require("mongoose");

const todo = require('./controller/todo');


app.set('port', (process.env.PORT || 8080));

mongoose.connect("mongodb://localhost:27017/todos");

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/todos', todo);


app.listen(app.get('port'), () => console.log(`App listening on port ${app.get('port')}`));