exports.postStatement= function(statement, callback, transactionId) {
	var options = {
		hostname : 'localhost',
		port : 7474,
		path : '/db/data/transaction/' + (transactionid || ''),
		method : 'POST',
		headers : {
			"Accept" : "application/json; charset=UTF-8",
			"Content-Type" : "application/json"
		}
	};

	var req = http.request(options, function(res) {
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		res.on('data', function(chunk) {
			console.log('BODY: ' + chunk);
		});
		if (callback && typeof (callback) === "function") {
			callback(res);
		}
	});

	req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
		if (callback && typeof (callback) === "function") {
			callback(e);
		}
	});

	// write data to request body
	var data = {
		"statements" : [ {
			"statement" : statement
		} ]
	};
	req.write($.toJSON(data));
	req.end();
}