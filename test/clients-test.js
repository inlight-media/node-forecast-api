require('dotenv').load();

var should = require('should');

var Forecast = require('../index');
var forecast = new Forecast({
	accountId: process.env.ACCOUNT_ID,
	authorization: process.env.AUTHORIZATION
});

describe('#clients', function() {
	this.timeout(5000);

	it('should return an array of clients', function(done) {
		forecast.clients(function(err, clients) {
			if (err) {
				throw err;
			}

			clients.should.be.an.Array;

			done();
		});
	});
});
