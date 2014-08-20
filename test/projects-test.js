require('dotenv').load();

var should = require('should');

var Forecast = require('../index');
var forecast = new Forecast({
	accountId: process.env.ACCOUNT_ID,
	authorization: process.env.AUTHORIZATION
});

describe('#projects', function() {
	this.timeout(5000);

	it('should return an array of projects', function(done) {
		forecast.projects(function(err, projects) {
			if (err) {
				throw err;
			}

			projects.should.be.an.Array;

			done();
		});
	});
});
