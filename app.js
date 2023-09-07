const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const messageRoutes = require('./routes/messageRoutes');
//Express app

const app = express();

//Database
const PORT =  process.env.PORT || 8080;

const dbURI = 'mongodb+srv://Shree:32Vexd9XegwTA63K@cluster0.xlxclpj.mongodb.net/MiniMessageBoard?retryWrites=true&w=majority'
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true })
.then((result)=>app.listen(PORT))
.catch(err=>{console.log(err)});


//view engine
app.set('view engine','ejs');


//middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

//Routes

app.get('/',(req,res)=>{
    res.redirect('/messages');
})

app.get('/about',(req, res)=>{
  res.render('pages/about',{title:'About'});
});

//Message Routes
app.use('/messages',messageRoutes);


//404 Page

app.use((req,res)=>{
    res.render('404',{title:'Not Found!'});
})