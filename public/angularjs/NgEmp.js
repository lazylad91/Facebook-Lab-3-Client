
var app = angular.module('addEmpEdu', []);

app.controller('saveEmpEdu', function($scope, $http) {
	$scope.list = [];
	$scope.list1 = [];
	$scope.func = function(value) {
		$scope.user_id = value;
		$scope.getEmp(value);
		$scope.getEvent(value);
	};
	$scope.addNewEvent = function() {
		console.log("yaaaaaaaaay");
		console.log("human"+$scope.list1);
		console.log("userId" + $scope.user_id);
		$http({
			method : "POST",
			url : '/insertEvent',
			data : {
				"userId" : $scope.user_id,
				"event" : $scope.event,
				"yearOfEvent" : $scope.yearOfEvent,
			}
		}).success(function(data) {
			if(data=="501"){
				alert("Some problem occured, Please Try again .")
			}
			else{
				if(data=="501"){
					alert("Some problem occured, Please Try again .")
				}
				else{
			$scope.list1 = data;
			console.log($scope.list1);
				}
			}
		}).error(function(error) {

		});
	};
	$scope.addNewEmp = function() {
		console.log("yaaaaaaaaay");
		console.log($scope.list);
		console.log("userId" + $scope.user_id);
		$http({
			method : "POST",
			url : '/insertEduEmp',
			data : {
				"userId" : $scope.user_id,
				"empOrEdu" : $scope.empOrEdu,
				"name" : $scope.name,
				"from" : $scope.from,
				"to" : $scope.to
			}
		}).success(function(data) {
			if(data=="501"){
				alert("Some problem occured, Please Try again .")
			}
			else{
			$scope.list = data;
			}
		}).error(function(error) {

		});
	};

	$scope.getEmp = function() {
		console.log("yaaaaaaaaay");
		console.log($scope.list);
		console.log("userId" + $scope.user_id);
		$http({
			method : "POST",
			url : '/getEmp',
			data : {
				"userId" : $scope.user_id
			}
		}).success(function(data) {
			if(data=="501"){
				alert("Some problem occured, Please Try again .")
			}
			else{
			$scope.list = data;
			}
		}).error(function(error) {

		});
	};
	$scope.getEvent = function() {
		console.log("yaaaaaaaaay");
		console.log($scope.list);
		console.log("userId" + $scope.user_id);
		$http({
			method : "POST",
			url : '/getEvent',
			data : {
				"userId" : $scope.user_id
			}
		}).success(function(data) {
			if(data=="501"){
				alert("Some problem occured, Please Try again .")
			}
			else{
			$scope.list1 = data;
			}
		}).error(function(error) {

		});
	};
});




