# Node Forecast API

A Forecast ([https://forecastapp.com](forecastapp.com)) API wrapper for Node.js.

## Installation

Via npm:

```bash
$ npm install forecast-api
```

# Getting started

You will need a Forecast account, accountId and authorization token.

The easiest way to determine your accountId and authorization token is by logging in to Forecast from Google Chrome and using the web inspector > Network tab to see one of the request(s) being made.

Observe a request and note the accoundId and authorization from the request header.

# Usage

```js
var Forecast = require('forecast-api');
var forecast = new Forecast({
	accountId: '12345',
	authorization: 'Bearer 9876.-EXAMPLETOKEN'
});
```

## People

```js
forecast.people(function(err, people) {
	if (err) {
		throw err;
	}
	console.log(people);
});
```

## Clients

```js
forecast.clients(function(err, clients) {
	if (err) {
		throw err;
	}
	console.log(clients);
});
```

## Projects

```js
forecast.projects(function(err, projects) {
	if (err) {
		throw err;
	}
	console.log(projects);
});
```

## Assignments

Assignments supports the following options (see below for more details):
- `startDate`
- `endDate`

```js
var options = {
	startDate: new Date(),
	endDate: new Date(2014, 11, 25)
};
forecast.assignments(options, function(err, assignments) {
	if (err) {
		throw err;
	}
	console.log(assignments);
});
```

Assignments can also be called without options and will use a default start and end date.

```js
forecast.assignments(function(err, assignments) {
	if (err) {
		throw err;
	}
	console.log(assignments);
});
```

## Milestones

Milestones supports the following options (see below for more details):
- `startDate`
- `endDate`

```js
forecast.milestones({ startDate: moment(), endDate: moment().add(5, 'days') }, function(err, milestones) {
	if (err) {
		throw err;
	}
	console.log(milestones);
});
```

Milestones can also be called without options.

```js
forecast.milestones(function(err, milestones) {
	if (err) {
		throw err;
	}
	console.log(milestones);
});
```

### Options

* `startDate` - a native date object, a moment.js date object or an ISO-8601 compatible date string.
* `endDate` - a native date object, a moment.js date object or an ISO-8601 compatible date string.
