var mongoose = require('mongoose');
var Promise = require("bluebird");

var jobSchema = mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    }

});

var Job = mongoose.model('Job', jobSchema);

var findJobs = function(query) {
    return Promise.cast(Job.find(query).exec());
};

exports.findJobs = findJobs;

exports.connectDB = Promise.promisify(mongoose.connect, mongoose);

var createJob = Promise.promisify(Job.create, Job);

exports.seedJobs = function() {
    return findJobs({}).then(function(collection) {
        if (collection.length === 0) {
            return Promise.map(jobs, function (job) {
                return createJob(job);
            });
        }
    });
};

var jobs = [
    {title: 'Cook', description: 'You will be making bagels' },
    {title: 'Waiter', description: 'You will be serving tables'},
    {title: 'Programmer', description: 'You will be writing code'},
    {title: 'Axe Maker', description: 'Make an axe'}
    ];