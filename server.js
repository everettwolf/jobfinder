var express = require('express');
var jobsData = require("./jobs-data.js");

var app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('/api/jobs', function(req, res) {
    jobsData.findJobs().then(function(collection) {
        res.send(collection);
    });
});

app.get('*', function(req, res) {
    res.render('index');
});

//jobsData.connectDB('mongodb://localhost/jobfinder');
jobsData.connectDB('mongodb://dev:dev@ds033123.mongolab.com:33123/jobfinder')
    .then(function() {
        console.log('connected to mongodb successfully');
        jobsData.seedJobs();
    });


app.listen(process.env.PORT, process.env.IP);