myApp.controller('delController',function($scope,$http,$route,$cookies,$location,$rootScope)
{
			$scope.showTable = true;
			console.log("Emp Id = "+$rootScope.empId);
			alert("inside del controller");
		var empId = {trainingExecId :$cookies.get('userId')}
			
			$http(
			{
				method: 'POST',
				url:"http://localhost:8080/springmvchibernate/showTrainings",
				data :empId,
				headers :{'Content-Type' : 'application/json'}
			
			}
				).success(function(data,status,headers,config)
			{
			console.log("executed  del controller" +data);
				console.log(data);
			$scope.tableValues = data;
				
		}).error(function(data,status,headers,config)
				 {
			console.log("error");
			$location.path('/')
			
		});
		
	



$scope.cal = function(a)
    {
            var trn={trainId:a}   
            console.log("trn id = " +trn);
            console.log("called");
            $http(
			{
               
				method: 'POST',
				url:"http://localhost:8080/springmvchibernate/delete",
				data : trn,
				headers :{'Content-Type' : 'application/json'}
			
			}
				).success(function(data,status,headers,config)
			{
                console.log('Deleted Row '+data);
                
                $scope.sessionRec = data;
                $route.reload();
				
		}).error(function(data,status,headers,config)
				 {
			console.log("error");
			$location.path('/')
			
		});
    }
});