var urlHelper = require('url');

var _ = require('underscore');
var request = require('request');
var moment = require('moment');

var Forecast = function(config) {
	if (!config.accountId || !config.authorization) {
		throw new Error('Forecast module requires accountId and authorization to be configured.');
	}

	this.accountId = config.accountId;
	this.authorization = config.authorization;

	this.defaultOptions = {
		json: true,
		headers: {
			authorization: this.authorization,
			'forecast-account-id': this.accountId,
			'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36'
		}
	};
};

Forecast.prototype.whoAmI = function(callback) {
	this._request('/whoami', function(err, json) {
		if (err) {
			return callback(err);
		}
		callback(null, json.current_user);
	});
};

Forecast.prototype.clients = function(callback) {
	this._request('/clients', function(err, json) {
		if (err) {
			return callback(err);
		}
		callback(null, json.clients);
	});
};

Forecast.prototype.people = function(callback) {
	this._request('/people', function(err, json) {
		if (err) {
			return callback(err);
		}
		callback(null, json.people);
	});
};

Forecast.prototype.projects = function(callback) {
	this._request('/projects', function(err, json) {
		if (err) {
			return callback(err);
		}
		callback(null, json.projects);
	});
};

Forecast.prototype.assignments = function(options, callback) {
	// '/assignments?start_date=2014-08-18&end_date=2014-09-14'
	if (typeof options === 'function') {
		callback = options;
		options = {};
	}

	var qs = buildQueryString(options);
	this._request('/assignments', { qs: qs }, function(err, json) {
		if (err) {
			return callback(err);
		}
		callback(null, json.assignments);
	});
};

Forecast.prototype.milestones = function(options, callback) {
	// '/milestones?start_date=2014-08-18&end_date=2014-09-14'
	if (typeof options === 'function') {
		callback = options;
		options = {};
	}

	var qs = buildQueryString(options);
	this._request('/milestones', { qs: qs }, function(err, json) {
		if (err) {
			return callback(err);
		}
		callback(null, json.milestones);
	});
};

function buildQueryString(options) {
	var qs = {};
	if (options.startDate) {
		qs.start_date = toDateString(options.startDate);
	}
	if (options.endDate) {
		qs.end_date = toDateString(options.endDate);
	}
	return qs;
}

function toDateString(obj) {
	var date;

	if (typeof obj === 'string') {
		date = moment(obj);
		if (!date.isValid()) {
			throw new Error('Invalid date string; expecting ISO-8601 compatible format.');
		}
	}
	else if (obj instanceof Date) {
		// Check for bad date objects like: new Date('LOL');
		if (isNaN(+obj)) {
			throw new Error('Invalid date object; expecting non NaN date value.');
		}
		date = moment(obj);
	}
	else if (obj._isAMomentObject) {
		date = obj;
	}

	if (!date) {
		throw new Error('Invalid date; expecting a valid: ISO-8601 compatible date string, a Date object or a moment date object.');
	}

	return date.format('YYYY-MM-DD');
}

Forecast.prototype._request = function(relativeUrl, options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = {};
	}

	var mergedOptions = _.extend({}, this.defaultOptions, options, {
		url: urlHelper.resolve('https://api.forecastapp.com', relativeUrl)
	});

	request(mergedOptions, function(err, res, body) {
		if (err) {
			return callback(err);
		}

		callback(null, body);
	});
};

module.exports = Forecast;
