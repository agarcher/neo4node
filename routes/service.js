var http = require("http"),
	url = require("url"),
    $ = require("jquery"),
    request = require("request");

function postStatement(statement,callback,commit,transactionId) {
	var segments = [];
	if (transactionId) segments.push(transactionId);
	if (commit) segments.push("commit");
	var options = {
	  uri: "http://localhost:7474/db/data/transaction/" + segments.join("/"),
	  method: 'POST',
	  headers: {
		  "Accept": "application/json; charset=UTF-8",
		  "Content-Type": "application/json"
	  },
	  body: JSON.stringify({ "statements" : [{ "statement" : statement }] })
	};

	var req = request(options, function(e, res, body) {
	  console.log('STATUS: ' + res.statusCode);
	  console.log('HEADERS: ' + JSON.stringify(res.headers));
	  console.log('body: ' + body);
	  if (callback && typeof(callback) === "function") {
		  callback(body);
	  }
	});

	req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	  if (callback && typeof(callback) === "function") {
		  callback(e);
	  }
	});

}

exports.service = function(req, res){
	var u = url.parse(req.url);
	if (u.pathname.indexOf("/service/neo4j") === 0) {
		postStatement(req.body.statement, function(chunk) {
			console.log("Got a response from neo4j!");
			console.log(chunk);
			res.setHeader('content-type', 'application/json');
			res.end(chunk);
		}, true);
	}
//	res.end("Hopefully it works?");
};

