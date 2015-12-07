var ejs = require("ejs");

var option = {
	ignoredNamespaces : true
};
var url = 'http://localhost:8080/facebook-server-lab3/webservices/UserInfoImpl?wsdl';
var soap = require('soap');
exports.saveEdu = function(req, res) {
	var userId = req.param("userId")
	var from = req.param("from")
	var to = req.param("to")
	var name = req.param("name")
	var empOrEdu = req.param("empOrEdu")
	  soap.createClient(url,option, function(err, client) {
		 console.log( client.describe()); 
	      client.saveEdu({'arg0': userId,'arg1':from,'arg2':to,'arg3':name,'arg4':empOrEdu}, function(err, result) {
	    	  console.log("result"+JSON.stringify(result));
	    	  result = JSON.stringify(result.return).replace(/\\"/g, '"');
	          result = result.substring(1, result.length - 1);
	          result = JSON.parse(result)
	          res.send(result);
	          console.log("result from jaxws service is" + result);
	      });
	  });
};

exports.saveEvent = function(req, res) {
    var userId = req.param("userId")
	var event = req.param("event")
	var yearOfEvent = req.param("yearOfEvent")
	  soap.createClient(url,option, function(err, client) {
		 console.log( client.describe()); 
	      client.saveEvent({'arg0': userId,'arg1':event,'arg2':yearOfEvent}, function(err, result) {
	       	  console.log("result"+JSON.stringify(result));
	    	  result = JSON.stringify(result.return).replace(/\\"/g, '"');
	          result = result.substring(1, result.length - 1);
	          result = JSON.parse(result)
	          res.send(result);
	      });
	  });

};


exports.getEmp = function(req, res) {
	var userId = req.param('userId');
	soap.createClient(url,option, function(err, client) {
		 console.log( client.describe()); 
	      client.getEdu({'arg0': userId}, function(err, result) {
	    	  console.log("result"+JSON.stringify(result));
	    	  result = JSON.stringify(result.return).replace(/\\"/g, '"');
	          result = result.substring(1, result.length - 1);
	          result = JSON.parse(result)
	          res.send(result);
	          console.log("result from jaxws service is" + result);
	      });
	  });
	
};

exports.getEvent = function(req, res) {
	var userId = req.param('userId');
	soap.createClient(url,option, function(err, client) {
		 console.log( client.describe()); 
	      client.getEvent({'arg0': userId}, function(err, result) {
	    	  console.log("result"+JSON.stringify(result));
	    	  result = JSON.stringify(result.return).replace(/\\"/g, '"');
	          result = result.substring(1, result.length - 1);
	          result = JSON.parse(result)
	          res.send(result);
	      });
	  });
};