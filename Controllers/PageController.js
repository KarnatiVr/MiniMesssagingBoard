const Messages = require ('../models/messages');


// Get All messages

const message_index= (req,res)=>{
    Messages.find().sort({createdAt:-1})
    .then((result)=>{
        res.render('pages/index',{title:'All Blogs',messages : result});
    }).catch(err=>{console.log(err)});
}


//Get a Single Message

const message_details = (req,res)=>{
    const id = req.params.id;
    Messages.findById(id)
    .then(result=>{
        res.render('details',{message:result,title:'Message Details'});})
        .catch(err=>{console.log(err)});
};

//Create 
const message_create_get=(req,res)=>{
    res.render('pages/create',{title:'Create'});
}


//Post from the Form

const message_create_post=(req,res)=>{
    //console.log(req.body);
   const message = new Messages(req.body);
    message.save()
    .then(result=>{
       // console.log('Message saved:', result);
        res.redirect('/messages');
    }).catch(err=>{
       //  console.error('Error saving message:', err);
        console.log(err)});
};



// Delete 

const message_delete=(req,res)=>{
    const id = req.params.id;
     Messages.findByIdAndDelete(id)
    .then(result=>{
        res.json({redirect:'/messages'});
    }).catch(err=>{
        console.log(err);
    })
}

module.exports={
    message_index,
    message_create_get,
    message_create_post,
    message_delete,
    message_details
}
