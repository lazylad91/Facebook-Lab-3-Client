var ejs = require("ejs");
var option = {
		ignoredNamespaces : true
	};
	var url = 'http://localhost:8080/facebook-server-lab3/webservices/UserPostImpl?wsdl';
	var soap = require('soap');
exports.savePost = function(req, res) {
	var userId = req.param("userId")
	var firstName = req.param("firstName")
	var post = req.param("post")
	soap.createClient(url,option, function(err, client) {
		 console.log( client.describe()); 
	      client.savePost({'arg0': userId,'arg1':firstName,'arg2':post}, function(err, result) {
	    	  console.log("result"+JSON.stringify(result));
	    	  result = JSON.stringify(result.return).replace(/\\"/g, '"');
	          result = result.substring(1, result.length - 1);
	          result = JSON.parse(result)
	          res.send(result);
	          console.log("result from jaxws service is" + result);
	      });
	  });	
};

exports.getPost=function(req,res){
	var userId = req.param("userId")
	soap.createClient(url,option, function(err, client) {
		 console.log( client.describe()); 
	      client.getPost({'arg0': userId}, function(err, result) {
	    	  console.log("result"+JSON.stringify(result));
	    	  result = JSON.stringify(result.return).replace(/\\"/g, '"');
	          result = result.substring(1, result.length - 1);
	          result = JSON.parse(result)
	          res.send(result);
	          console.log("result from jaxws service is" + result);
	      });
	  });
}

