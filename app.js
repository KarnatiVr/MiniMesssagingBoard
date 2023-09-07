const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Messages = require ('./models/messages');
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
app.use(morgan('dev'));
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

app.get('/create',(req,res)=>{
    res.render('pages/create',{title:'Create'});
})

// Get All messages

app.get('/messages',(req,res)=>{
    Messages.find().sort({createdAt:-1})
    .then((result)=>{
        res.render('pages/index',{title:'All Blogs',messages : result});
    }).catch(err=>{console.log(err)});
});


//Post from the Form

app.post('/messages',(req,res)=>{
    //console.log(req.body);
   const message = new Messages(req.body);
    message.save()
    .then(result=>{
       // console.log('Message saved:', result);
        res.redirect('/messages');
    }).catch(err=>{
       //  console.error('Error saving message:', err);
        console.log(err)});
});

//Get a Single Message

app.get('/messages/:id',(req,res)=>{
    const id = req.params.id;
    Messages.findById(id)
    .then(result=>{
        res.render('details',{message:result,title:'Message Details'});})
        .catch(err=>{console.log(err)});
});

// Delete 

app.delete('/messages/:id',(req,res)=>{
    const id = req.params.id;
     Messages.findByIdAndDelete(id)
    .then(result=>{
        res.json({redirect:'/messages'});
    }).catch(err=>{
        console.log(err);
    })
})

//404 Page

app.use((req,res)=>{
    res.render('404',{title:'Not Found!'});
})