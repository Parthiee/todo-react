const express = require('express')
const db = require('../model/model')
const { ObjectId } = require('mongodb');
const router = express.Router()
router.use(express.json())

router.get('/getAll', async (req, res) => {
    try {
      
    
        const database = await db();
        const collection = database.collection('todo');
        const todos = await collection.find({}).toArray(function(err, result) {
            console.log(result);
            
          });

          return res.json({ message: todos });
        
      
      
    } catch (e) {
        console.error('Error during login:', e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});



router.post('/add', async (req, res) => {
    try {
      
        const {todo, status, _id} = req.body
        const database = await db();
        const collection = database.collection('todo');
        const todos = await collection.insertOne({todo: todo, status:status, id:_id})
        return res.json({ message: "Added todo" });
        
      
      
    } catch (e) {
        console.error('Error during login:', e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post('/delete', async (req, res) => {
    try {
      
        const {_id} = req.body
        const database = await db();
        const collection = database.collection('todo');
   
        console.log(_id)
        const deleteResult = await collection.deleteOne({ _id: new ObjectId(_id.toString())});
     
        const {acknowledged, deletedCount} = deleteResult
        console.log(acknowledged)
        console.log(deletedCount)
        if (acknowledged)
          return res.json({ message: "Delete Success" });
        else
        return res.json({ message: "Delete Failed" });
    
      
      
    } catch (e) {
        console.error('Error during login:', e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post('/add', async (req, res) => {
    try {
      
        const {todo, status, _id} = req.body
        const database = await db();
        const collection = database.collection('todo');
        const todos = await collection.insertOne({todo: todo, status:status, id:_id})
        return res.json({ message: "Added todo" });
        
      
      
    } catch (e) {
        console.error('Error during login:', e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post('/update', async (req, res) => {
    try {
      
        const {_id, status, todo} = req.body
        const database = await db();
        const collection = database.collection('todo');
   
        console.log(_id)
        console.log(status)
        console.log(todo)
        const update = await collection.updateOne({ _id: new ObjectId(_id.toString())}, {$set: {"status": parseInt(status), "todo" : todo }, },);
     
        const {acknowledged, deletedCount} = update
        console.log(acknowledged)
        console.log(deletedCount)
        if (acknowledged)
          return res.json({ message: "Update Success" });
        else
        return res.json({ message: "Update Failed" });
    
      
      
    } catch (e) {
        console.error('Error during login:', e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


router.get('/getAll', async (req, res) => {
    try {
      
    
        const database = await db();
        const collection = database.collection('todo');
        const todos = await collection.find({}).toArray(function(err, result) {
            console.log(result);
            
          });

          return res.json({ message: todos });
        
      
      
    } catch (e) {
        console.error('Error during login:', e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});



router.get('/deleteAll', async (req, res) => {
    try {
      
        const {todo, status, _id} = req.body
        const database = await db();
        const collection = database.collection('todo');
        const todos = await collection.deleteMany({ })
        return res.json({ message: "Deleted todo" });
        
      
      
    } catch (e) {
        console.error('Error during login:', e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
module.exports = router;
