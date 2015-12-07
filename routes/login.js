var ejs = require("ejs");
// var mysql = require('./mysql');
exports.signUp = function(req,res){
	   var firstName, lastName, email,phoneNo,password,dob;
	    firstName = req.param("firstName");
	    lastName = req.param("lastName");
	    email = req.param("email");
	    phoneNo = req.param("phoneNo");
	    password = req.param("password");
	    dob = req.param("dob");
	    // soap call
	    var option = {
	    		ignoredNamespaces : true	
	    	};
	    	 var soap = require('soap');
	    	  var url = 'http://localhost:8080/facebook-server-lab3/webservices/UserImpl?wsdl';
	    	  var arg1 = {'firstName': firstName,'lastName':lastName,'email':email,'phoneNo':phoneNo,'password':password,dob:dob};
	    	  soap.createClient(url,option, function(err, client) {
	    		 console.log( client.describe()); 
	    	      client.signUp({'arg0': JSON.stringify(arg1)}, function(err, result) {
	    	          console.log(result);
	    	        // console.log('Here is the SOAP sent to ' + url +
					// client.lastRequest);
	  				// if(result.code=200){
						//console.log("data inserted");
	    	          result = JSON.stringify(result.return).replace(/\\"/g, '"');
	    	          res.send(result);
	  				// }
	  				// else{
	  					// res.send("signup failed");
	  				// }
	    	      });
	    	  });
	   

			
};


exports.signIn = function(req,res){
	var emailPhone = req.param('emailPhone');
	var password = req.param('password');
	      // soap call
	    var option = {
	    		ignoredNamespaces : true	
	    	};
	    	 var soap = require('soap');
	    	  var url = 'http://localhost:8080/facebook-server-lab3/webservices/UserImpl?wsdl';
	    	  soap.createClient(url,option, function(err, client) {
	    		 console.log( client.describe()); 
	    	      client.signIn({'arg0': emailPhone,'arg1':password}, function(err, result) {
	    	          console.log("result"+JSON.stringify(result.return).replace(/\\"/g, '"')); 
	    	          result = JSON.stringify(result.return).replace(/\\"/g, '"');
	    	          result = result.substring(1, result.length - 1);
	    	          console.log("result from jaxws service is" + result);
	    	          if(result==="401"){
	    	        	  console.log("session destroyed");
	    					res.end('invalid Login or some error occured');
	    	          }
	    	          else{
	    	          result = JSON.parse(result);
	    	          var result1 = result;
	    				if(result!=="501"){
	    					ejs.renderFile('./views/home.ejs', { data: result1 } , function(err, result) {
	    				        // render on success
	    				        if (!err) {
	    				        	if(req.session){
	    				        		console.log("hi i am inside");
	    				            req.session.data=result1;
	    				        	}
	    				            console.log("sessiondat"+JSON.stringify(result1));
	    				            res.render('home',{data: result1});
	    				     /* res.redirect('home'); */
	    				        }
	    				        // render or error
	    				        else {
	    				        	
	    				            
	    				            res.end('An error occurred');
	    				            console.log(err);
	    				        }
	    				    });
	    				}
	    				else{
	    					console.log("session destroyed");
	    					res.redirect('/');
	    				}
	    	      }
	    	      });
	    	  });
	   

			
};