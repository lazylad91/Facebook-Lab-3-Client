var app = angular.module('profile', []);
app.controller('profileController', function($scope, $http) {
	var id = "";
	$scope.employee = [];
	$scope.func = function(value) {
		id = value;
		$scope.getEmployees(id);
		$scope.getEvents(id);
		$scope.getFriendStatus(id);
	};
	$scope.getEmployees = function(id) {
		$http({
			method : "GET",
			url : '/getEmployees',
			params : {
				"userId" : id
			}
		}).success(function(data) {
			if(data=="501"){
				alert("Some problem occured, Please Try again .")
			}
			else{
			console.log(data);
			$scope.employee = data;
			console.log($scope.employee);
			}
		}).error(function(error) {

		});

	};
	$scope.getEvents = function(id) {
		$http({
			method : "GET",
			url : '/getEvents',
			params : {
				"userId" : id
			}
		}).success(function(data) {
			if(data=="501"){
				alert("Some problem occured, Please Try again .")
			}
			else{
			$scope.events = data;
			console.log($scope.employee);
			}
		}).error(function(error) {

		});

	};
	$scope.getFriendStatus = function(id) {
		$http({
			method : "GET",
			url : '/getFriendStatus',
			params : {
				"userId" : id
			}
		}).success(function(data) {
			if(data=="501"){
				alert("Some problem occured, Please Try again .")
			}
			else{
			console.log("data"+JSON.stringify(data));
             $scope.same=data.same;
             $scope.pending=data.pending;
             $scope.friends=data.friends;
             $scope.add=data.add;
             console.log("$scope.add"+$scope.add)
			}
		}).error(function(error) {

		});

	};
	
	$scope.addFriend = function(id){
		$http({
			method : "GET",
			url : '/sendFriendRequest',
			params : {
				"userId" : id
			}
		}).success(function(data) {
			if(data=="501"){
				alert("Some problem occured, Please Try again .")
			}
			else{
             $scope.same=data.same;
             $scope.pending=data.pending;
             $scope.friends=data.friends;
             $scope.add=data.add;
			}
		}).error(function(error) {

		});
	};
});
