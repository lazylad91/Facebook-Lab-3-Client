var ejs = require("ejs");
var option = {
		ignoredNamespaces : true
	};
    var url = 'http://localhost:8080/facebook-server-lab3/webservices/UserFriendImpl?wsdl';
	var soap = require('soap');
	
exports.getFriendStatus = function(req, res) {
	var logInUserId, profUserId;
	if (req.session) {
		logInUserId = req.session.data.user_id;
	} 
	profUserId = req.param("userId");
	soap.createClient(url,option, function(err, client) {
		 console.log( client.describe()); 
	      client.checkAddFriend({'arg0': logInUserId,'arg1':profUserId}, function(err, result) {
	    	  console.log("result"+JSON.stringify(result));
	    	  result = JSON.stringify(result.return).replace(/\\"/g, '"');
	          result = result.substring(1, result.length - 1);
	          result = JSON.parse(result)
	          res.send(result);
	          console.log("result from jaxws service is" + result);
	      });
	  });
};

exports.sendFriendRequest = function(req, res) {
	var logInUserId, profUserId;
	if (req.session) {
		logInUserId = req.session.data.user_id;
	} 
	profUserId = req.param("userId");
	soap.createClient(url,option, function(err, client) {
		 console.log( client.describe()); 
	      client.sendFriendRequest({'arg0': logInUserId,'arg1':profUserId}, function(err, result) {
	    	  console.log("result"+JSON.stringify(result));
	    	  result = JSON.stringify(result.return).replace(/\\"/g, '"');
	          result = result.substring(1, result.length - 1);
	          result = JSON.parse(result)
	          res.send(result);
	          console.log("result from jaxws service is" + result);
	      });
	  });
};

exports.getPending = function(req, res) {

	user_id = req.param("userId");
	soap.createClient(url,option, function(err, client) {
		 console.log( client.describe()); 
	      client.getPending({'arg0': user_id}, function(err, result) {
	    	  console.log("result"+JSON.stringify(result));
	    	  result = JSON.stringify(result.return).replace(/\\"/g, '"');
	          result = result.substring(1, result.length - 1);
	          result = JSON.parse(result)
	          res.send(result);
	          console.log("result from jaxws service is" + result);
	      });
	  });
};

exports.acceptReq = function(req, res) {

	user_id = req.param("userId");
	friend_id = req.param("friendId");
	soap.createClient(url,option, function(err, client) {
		 console.log( client.describe()); 
	      client.acceptReq({'arg0': user_id,'arg1':friend_id}, function(err, result) {
	    	  console.log("result"+JSON.stringify(result));
	    	  result = JSON.stringify(result.return).replace(/\\"/g, '"');
	          result = result.substring(1, result.length - 1);
	          result = JSON.parse(result)
	          res.send(result);
	          console.log("result from jaxws service is" + result);
	      });
	  });
};

exports.getFriend = function(req,res){


	user_id = req.param("userId");
	friend_id = req.param("friendId");
	soap.createClient(url,option, function(err, client) {
		 console.log( client.describe()); 
	      client.getFriend({'arg0': user_id,'arg1':friend_id}, function(err, result) {
	    	  console.log("result"+JSON.stringify(result));
	    	  result = JSON.stringify(result.return).replace(/\\"/g, '"');
	          result = result.substring(1, result.length - 1);
	          result = JSON.parse(result)
	          res.send(result);
	          console.log("result from jaxws service is" + result);
	      });
	  });

}