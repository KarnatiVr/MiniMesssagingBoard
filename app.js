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
