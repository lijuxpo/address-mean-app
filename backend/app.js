var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var requestRouter = require('./routes/requests');
var addressRouter = require('./routes/address');
var cors = require('cors');

var app = express();

var port = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost/todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api', [requestRouter, addressRouter]);

app.get("/", (req, res) => {
    res.send('Welcome to localhost 3000')
});

//listen on port 3000
app.listen(port, (error) => {
    if (error) {
        console.log("Issue in connecting to the server");
    }
    else {
        console.log("Successfully connected to the server");
    }
})
