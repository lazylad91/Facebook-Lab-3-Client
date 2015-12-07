var ejs = require("ejs");

var option = {
		ignoredNamespaces : true
	};
	var url = 'http://localhost:8080/facebook-server-lab3/webservices/UserSearchImpl?wsdl';
	var soap = require('soap');
	
exports.searchUser = function(req, res) {
	var searchText = req.param("searchText");
	 soap.createClient(url,option, function(err, client) {
		 console.log( client.describe()); 
	      client.searchUser({'arg0': searchText}, function(err, result) {
	    	  console.log("result"+JSON.stringify(result));
	    	  result = JSON.stringify(result.return).replace(/\\"/g, '"');
	          result = result.substring(1, result.length - 1);
	          result = JSON.parse(result)
	          res.send(result);
	          console.log("result from jaxws service is" + result);
	      });
	  });
};

