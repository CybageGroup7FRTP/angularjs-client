
myApp.controller('mandatorytraining',function($rootScope,$scope,$route,$http,$location)
{
    $scope.showsession = false;
    
    $scope.search = function() {
        alert('ok');
    $scope.searchbarTrainigList = true;
    $scope.showsession = false;
    var training ={ nominate: $rootScope.empId };
        $http(
			{
               
				method: 'POST',
				url:"http://localhost:8080/springmvchibernate/mandatorytraining",
				data : training,
				headers :{'Content-Type' : 'application/json'}
			
			}
				).success(function(data,status,headers,config)
			{
                console.log('Searched data '+data);
                console.log("successfully searched");
                $scope.trainingRec = data;
                $scope.searchbar = false;
                $scope.searchbarTrainigList = true;
                $scope.showsession = false;
		}).error(function(data,status,headers,config)
				 {
			console.log("error");
			$location.path('/')
			
		});
    }
    
    $scope.calling = function(a)
    {
        $scope.searchbar = false;
        $scope.searchbarTrainigList = false;
        var training = { trainId : a };
        $http(
			{
               
				method: 'POST',
				url:"http://localhost:8080/springmvchibernate/listsessions",
				data : training,
				headers :{'Content-Type' : 'application/json'}
			
			}
				).success(function(data,status,headers,config)
			{
                console.log('Searched data '+data);
                console.log("successfully searched");
                $scope.sessionRec = data;
                 $scope.showsession = true;
		}).error(function(data,status,headers,config)
				 {
			console.log("error");
			$location.path('/')
			
		});
    }
    
    $scope.callingWithdraw = function(trainingId)
    {
        var training = { trainId: trainingId, nominate: $rootScope.empId };
        $http(
			{
               
				method: 'POST',
				url:"http://localhost:8080/springmvchibernate/withdrawfromtraining",
				data : training,
				headers :{'Content-Type' : 'application/json'}
			
			}
				).success(function(data,status,headers,config)
			{
                alert("Nomination Withdrawn");
                $route.reload();
		}).error(function(data,status,headers,config)
				 {
			console.log("error");
			$location.path('/');
		});
    }
});