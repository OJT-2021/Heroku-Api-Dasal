const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./Post');
mongo = require('mongodb')

require('dotenv/config');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//get all posts
app.get('/get', async (req, res)=> {
    try{
        const posts = await Post.find();
        res.json(posts); 
    }
    catch (err){
        res.json({message: err});
    }
});

//get specific post
app.get('/:postID', async (req, res)=>{
    try{
        const post = await Post.findById(req.params.postID);
        res.json(post);
    }
    catch (err){
        res.json({message:err});
    }
});

app.post('/', async (req, res)=>{
    const post = new Post({
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        firstNumber: req.body.firstNumber,
        secondNumber: req.body.secondNumber,
        thirdNumber: req.body.thirdNumber
    });
  try{
      const savePost = await post.save();
      res.json(savePost);
  }
  catch (err){
      res.json({message: err});
  }
});

//delete posts
app.delete('/delete/:id', function (req, res) {
    Post.findByIdAndDelete(req.params.id).then(post =>{
        if (!post){
            return res.status(404).send();
        }
        re.send(post);
    }).catch(error =>{
        res.status(500).send();
    })
});

//update posts
app.patch('/update/:id', function (req, res) {
    Post.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((post) =>{
        if (!post){
            return res.status(404).send();
        }
        re.send(post);
    }).catch(error =>{
        res.status(500).send();
    })
});

mongoose.connect(process.env.DB_CONNECTIONS,
    { useNewUrlParser: true, useUnifiedTopology: true },    
    () => console.log('connected to database')
);
app.listen(process.env.PORT || 200);
