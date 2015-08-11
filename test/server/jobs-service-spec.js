var express = require('express');
var app = express();
var expect = require("chai").expect;
var request = require("supertest");
var Promise = require("bluebird");

var dataSavedJob;
var db = {
    findJobs: function() {
      return new Promise(function(resolve, reject) {
          resolve(["array"]);
      });
    },
    saveJob: function(job) {
        dataSavedJob = job;
    }
};
var jobService = require("../../jobs-service")(db, app);

describe("get jobs", function() {
    
    it("should provide a json list of jobs", function (done) {
        request(app).get('/api/jobs')
        .expect('Content-Type', '/json/')
        .end(function(err, res) {
            expect(res.body).to.be.a('Array');
            done();
        });
        
    })
})

describe("save jobs", function() {

    var newJob = {
        title: 'Programmer',
        description: 'You will be writing code'
    };

    it("should pass the job to the database save", function(done) {
        request(app).post('/api/jobs').send(newJob).end(function(err, res) {
            expect(dataSavedJob).to.deep.equal(newJob);
            done();
        });
    });

});