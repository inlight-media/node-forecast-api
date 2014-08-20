require('dotenv').load();

var should = require('should');

var Forecast = require('../index');
var forecast = new Forecast({
	accountId: process.env.ACCOUNT_ID,
	authorization: process.env.AUTHORIZATION
});

describe('#people', function() {
	this.timeout(5000);

	it('should return an array of people', function(done) {
		forecast.people(function(err, people) {
			if (err) {
				throw err;
			}

			people.should.be.an.Array;

			done();
		});
	});
});
