// Simple example:
// var http = require('http');

// http.createServer(function (req, res) {
//   res.status(200, {'Content-Type': 'text/html'});
//   res.end('<html><body><h1>Hello World aaea</h1></body></html>');
// }).listen(3002);

// console.log('Server running on port 3002.');

// run it: 
// node --debug index.js


var http = require('http');
var url = require("url");
var fs = require('fs');

var portNr = 3002;

var HTTP_OK = 200;
var HTTP_CREATED = 201;
var HTTP_BAD_REQUEST = 400;
var HTTP_NOT_FOUND = 404;
var HTTP_METHOD_NOT_ALLOWED = 405;
var HTTP_INTERNAL_SERVER_ERROR = 500;

var FILES_PATH = 'resources/';

var server = http.createServer();

server.on('request', function (request, response) {

	console.log(request.method);
	console.log(request.headers);
	console.log(request.url);

   	var reqURL = url.parse(request.url);
   	console.log(request.method + " Request for " + reqURL.pathname + " received.");

	// Expected request format:
	// http://server.example.com/lists/<list_id>

	// A file with the same name as the list_id is stored in the "resources" folder

	response.setHeader("Content-Type", "text/javascript");
	response.setHeader('Access-Control-Allow-Origin', '*');
	
	var splitURL = reqURL.pathname.split("/");
	if (splitURL[0] === "" && splitURL[1] === "lists" && splitURL.length === 3) {
		var resourceId = splitURL[2];

		if (request.method == 'GET') {
			handleGet(resourceId, response);
		} else if (request.method == 'POST') {
			handlePost(request, response, resourceId);
		} else if (request.method == 'OPTIONS') {
			handleOptions(request, response, resourceId);
		} else {
			response.statusCode = HTTP_METHOD_NOT_ALLOWED;
			response.end();
		}
	} else {
		// unknown url
		response.statusCode = HTTP_BAD_REQUEST;
		response.end();
	}

});

function handleGet(resourceId, response) {
	var filePath = FILES_PATH + resourceId;
	try {
		var file = fs.readFileSync(filePath);
		response.statusCode = HTTP_OK;
		response.end(file);
	} catch (err) {
		response.statusCode = HTTP_NOT_FOUND;
		response.end();
	}
}

function handlePost(request, response, resourceId) {
	var data = '';

	request.on('data', function (chunk) {
		data += chunk.toString();
	});

	request.on('end', function () {
		var jsonObj = JSON.parse(data);
		var filePath = FILES_PATH + resourceId;

		fs.writeFile(filePath, data, function (err) {
			// TODO: error handling has not been tested, not sure it would work correctly
			if (err) {
				console.log('Error at trying to save file ' + filePath);	
				return console.log(err);
			} else {
				console.log('File successfully saved ' + filePath);
				response.statusCode = HTTP_CREATED;
			}
		});

		response.end();
	});
}

function handleOptions(request, response, resourceId) {
	response.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
	response.setHeader('Access-Control-Allow-Methods', '*');
	response.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
	response.setHeader('Access-Control-Max-Age', '1000');
	response.statusCode = HTTP_OK;
	response.end();
}


server.listen(portNr, function () {
	console.log('listening on port ' + portNr)
});





//node --debug-brk index.js