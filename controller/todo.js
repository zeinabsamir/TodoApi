var express = require('express');
var router = express.Router();
var mongoose=require("mongoose");

require("../models/todo");

var Todo = mongoose.model("todo");

/* GET users listing. */
router.get('/', function(req, res, next) {
    Todo.find({},(error,result)=>{
        
        res.send(result);
     });
         
});

router.post('/add', function(req, res, next) {

        const newTodo = new Todo(req.body);
        newTodo.save(err => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(newTodo);
        });
        
});

router.post('/edit/:id', function(req, res, next) {

    // Find the existing resource by ID
   Todo.findByIdAndUpdate(req.params.id,req.body,
    {new: true},
    (err, todo) => {
        if (err) return res.status(500).send(err);
        return res.send(todo);
    })     
      
});


router.get('/delete/:id', function(req, res, next) {

    Todo.findByIdAndRemove(req.params.id, (err, todo) => {
        
        if (err) return res.status(500).send(err);
        const response = {
            message: "Todo successfully deleted",
            id: todo._id
        };
        return res.status(200).send(response);
    });
        
      
});

module.exports = router;