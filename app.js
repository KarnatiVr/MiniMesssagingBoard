const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Messages = require ('./models/messages');
//Express app

const app = express();

//Database

const dbURI = 'mongodb+srv://Shree:32Vexd9XegwTA63K@cluster0.xlxclpj.mongodb.net/MiniMessageBoard?retryWrites=true&w=majority'
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true }).then((result)=>{console.log('Connected!')})
.catch(err=>{console.log(err)});


//view engine
app.set('view engine','ejs');

//listen for req 
const PORT =  process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT} port`);
})

//register view engines
app.set('view engine' , 'ejs');

//middlewares
app.use(express.static('public'));
app.use(morgan('dev'));

//Controllers


app.get('/',(req,res)=>{
    res.redirect('/messages');
})


app.get('/about',(req, res)=>{
  res.render('pages/about',{title:'About'});
});

app.get('/messages',(req,res)=>{
    Messages.find()
    .then((result)=>{
        res.render('pages/index',{title:'All Blogs',messages : result});
    }).catch(err=>{console.log(err)});
})

app.get('/create',(req,res)=>{
    res.render('pages/create',{title:'Create'});
})

app.use((req,res)=>{
    res.render('404',{title:'Not Found!'});
})