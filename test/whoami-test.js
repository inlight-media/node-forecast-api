require('dotenv').load();

var should = require('should');

var Forecast = require('../index');
var forecast = new Forecast({
	accountId: process.env.ACCOUNT_ID,
	authorization: process.env.AUTHORIZATION
});

describe('#whoAmI', function() {
	this.timeout(5000);

	it('should return an object indicating who is authenticated', function(done) {
		forecast.whoAmI(function(err, obj) {
			if (err) {
				throw err;
			}

			obj.should.be.an.Object;

			done();
		});
	});
});
