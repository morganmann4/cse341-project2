// Express web server example
const express = require('express');
const bodyParser = require('body-parser')
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000; 

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})
//links to the routes folder
app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if(err){
        console.log(err)
    }
    else{
        app.listen(process.env.PORT || port, () => {
            console.log('Web Server is listening at port ' + (process.env.PORT || port));
        });
    }
})


// app.listen(process.env.PORT || port, () => {
//   console.log('Web Server is listening at port ' + (process.env.PORT || port));
// });
 
