const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const connect = require('./config/connection');
const { PORT } = require('./config/constants');


const app = express();

connect();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/',require('./router/base.router'));

app.listen(PORT,()=>console.log(`Listening to http://localhost:${PORT}`));