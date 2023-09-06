const express = require('express');
const morgan = require('morgan');

//Express app

const app = express();

app.set('view engine','ejs');

//listen for req 

const PORT =  process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT} port`);
})

//middlewares

app.use(express.static('public'));

app.use(morgan('dev'));

app.get('/',(req, res)=>{
    
    res.render('index',{title:'Home'});
});

app.get('/about',(req, res)=>{
  res.render('about',{title:'About'});
});

app.get('/create',(req,res)=>{
    res.render('create',{title:'Create'});
})