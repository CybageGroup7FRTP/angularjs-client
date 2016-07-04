myApp.controller('delController',function($scope,$http,$location)
				 {
	$scope.deleteTraining = function(){
			alert("I got executed");
			$http(
			{
				method: 'POST',
				url:"http://localhost:8080/springmvchibernate/delete",
				data : $scope.training,
				headers :{'Content-Type' : 'application/json'}
			
			}
				).success(function(data,status,headers,config)
			{
			console.log("Delete Training controller");
			console.log();
				
		}).error(function(data,status,headers,config)
				 {
			console.log("error");
			$location.path('/')
			
		});
		
	}
});