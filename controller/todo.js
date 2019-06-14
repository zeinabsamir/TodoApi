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

router.get('/:id', function(req, res, next) {
    Todo.find({_id: req.params.id },(error,result)=>{
        
        res.send(result);
     });
         
});

router.post('/add', function(req, res, next) {

        const newTodo = new Todo(req.body);
        newTodo.save(err => {
            if (err) return res.status(500).send(err);
            Todo.find({},(error,result)=>{
        
                return res.status(200).send(result);
             }); 
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
        Todo.find({},(error,result)=>{
        
            return res.status(200).send(result);
         }); 
    });
        
      
});

module.exports = router;