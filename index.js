const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json()); // add this middleware to parse JSON bodies
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', (req, res,next)=>{
   next();
});
// Use the post.js file for /post
app.use('/post', require('./api/post'));
// Use the get.js file for /get
app.use('/get', require('./api/get'));
const server = http.createServer(app);
server.listen(3000);