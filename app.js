const express = require('express');
const mongoose = require("mongoose")
const ejs = require('ejs')

const methodOverride = require('method-override')
const postController= require('./controllers/postController')
const pageController = require('./controllers/pageController')

mongoose.connect('mongodb://127.0.0.1:27017/cleanblog-test-db');



const app = express();

app.set("view engine","ejs")


app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method',{
  methods:["POST","GET"]
}))

app.get('/', postController.getAllPosts)
app.get('/posts/:id', postController.getPost)

app.get('/posts/edit/:id', pageController.editPost);

app.put('/posts/:id', postController.UpdatePost)
app.delete('/posts/:id', postController.deletePost)

app.get('/about',pageController.getAboutPage )
app.get('/add-post', pageController.getAddPost)

app.post('/posts', postController.createPost)

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});