const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const User = require('./User');
const Post = require('./Post');
mongo = require('mongodb')
const jwt = require('jsonwebtoken')


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('dotenv/config');

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

app.get('/:postID', async (req, res)=>{
    try{
        const post = await Post.findById(req.params.postID);
        res.json(post);
    }
    catch (err){
        res.json({message:err});
    }
});

app.post('/posts', async (req, res)=>{
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

app.post('/user/create', async (req, res)=>{
    const user = new User({
        userName: req.body.userName,
        password: req.body.password
    });
  try{
      const saveUser = await user.save();
      res.json(saveUser);
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

//delete posts
app.delete('/delete/:id', function (req, res) {
    Post.findByIdAndDelete(req.params.id).then(user =>{
        if (!user){
            return res.status(404).send();
        }
        re.send(user);
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

//const users = []

/*app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const user = { name: req.body.name, password: hashedPassword }
      users.push(user)
      res.status(201).send()
    } catch {
      res.status(500).send()
    }
})
  
app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.name)
    if (user == null) {
      return res.status(400).send('Cannot find user')
    }
    try {
      if(await bcrypt.compare(req.body.password, user.password)) {
        res.send('Success')
      } else {
        res.send('Not Allowed')
      }
    } catch {
      res.status(500).send()
    }
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }*/

mongoose.connect(process.env.DB_CONNECTIONS,
    { useNewUrlParser: true, useUnifiedTopology: true },    
    () => console.log('connected to database')
);
app.listen(process.env.PORT || 200);