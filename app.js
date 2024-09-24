const express = require('express');
const mongoose = require("mongoose")
const ejs = require('ejs')
const Post = require('./models/Post');

mongoose.connect('mongodb://127.0.0.1:27017/cleanblog-test-db');



const app = express();

app.set("view engine","ejs")


app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', async (req, res) => {
  const posts = await Post.find({})
  res.render('index',{
    posts
  })
})
app.get('/about', (req, res) => {

  res.render('about')
})
app.get('/add-post', (req, res) => {

  res.render('add_post')
})
app.post('/posts', async (req, res) => {
  const post = await Post.create(req.body)
  res.redirect('/')
})

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});