
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , session = require('client-sessions')
  , friend = require('./routes/friend')
  , search = require('./routes/search')
  , info = require('./routes/info') 
  , home = require('./routes/home')
  , http = require('http')
  , login = require('./routes/login')
  , path = require('path');

var app = express();
app.use(session({   
    cookieName: 'session',    
	secret: 'shoppingcart',    
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,  }));

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.post('/signUp', login.signUp);
app.post('/checkPassword', login.signIn);
app.get('/users', user.list);
app.get('/', function(req, res) {
	res.render("../views/login.ejs");
});
app.get('/searchUser', search.searchUser);
app.post('/insertEduEmp', info.saveEdu);
app.post('/insertEvent', info.saveEvent);
app.post('/getEmp', info.getEmp);
app.post('/getEvent', info.getEvent);
app.get('/getEmployees', info.getEmp);
app.get('/getEvents', info.getEvent);
app.get('/enterInfo', function(req, res) {
	console.log(req.session.data);
	res.render('../views/enterInfo.ejs', {
		data : req.session.data
	});
});
app.get('/profile', function(req, res) {
	console.log(req.session.data);
	res.render('../views/profilePage.ejs', {
		data : [req.session.data]
	});
});
app.get('/getPost', home.getPost);
app.post('/insertPost', home.savePost);
app.get('/sendFriendRequest', friend.sendFriendRequest);
app.get('/acceptReq', friend.acceptReq);
app.get('/getPending', friend.getPending);
app.get('/getFriend', friend.getFriend);
app.get('/getFriendStatus', friend.getFriendStatus);
app.get('/othersProfile', function(req, res) {
	console.log("inside");
	res.render('../views/profilePage.ejs', {
		data : [ {
			"user_id" : req.param('user_id'),
			"first_name" : req.param('first_name'),
			"last_name" : req.param('last_name'),
			"email" : req.param('email'),
			"phone_no" : req.param('phone_no'),
			"dob" : req.param('dob')
		} ]
	});
});
app.get('/signOut', function(req, res) {
	req.session.destroy();
	res.clearCookie('session');
	res.render("../views/logIn.ejs");
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
