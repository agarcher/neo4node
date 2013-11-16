var url = require("url");

function postStatement(statement,callback,commit,transactionId) {
	var segments = [];
	if (transactionId) segments.push(transactionId);
	if (commit) segments.push("commit");
	var options = {
	  hostname: 'localhost',
	  port: 7474,
	  path: '/db/data/transaction/' + segments.join("/"),
	  method: 'POST',
	  headers: {
		  "Accept": "application/json; charset=UTF-8",
		  "Content-Type": "application/json"
	  }
	};

	var req = http.request(options, function(res) {
	  console.log('STATUS: ' + res.statusCode);
	  console.log('HEADERS: ' + JSON.stringify(res.headers));
	  res.setEncoding('utf8');
	  res.on('data', function (chunk) {
	    console.log('BODY: ' + chunk);
	  });
	  if (callback && typeof(callback) === "function") {
		  callback(res);
	  }
	});

	req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	  if (callback && typeof(callback) === "function") {
		  callback(e);
	  }
	});

	// write data to request body
	var data = {
		"statements" : [ { "statement" : statement } ]
	};
	req.write($.toJSON(data));
	req.end();
}

exports.service = function(req, res){
	var u = url.parse(req.url);
	if (u.pathname.indexOf("/service/neo4j") === 0) {
		console.log("a");
		var body = $.parseJSON(req.body);
		console.log("b");
		postStatement(body.statement, function(innerRes) {
			console.log("Got a response from neo4j!");
			console.log(innerRes);
		});
		console.log("c");
	}
	console.log("Sending to neo...");
	res.end("Hopefully it works?");
};

