myApp.controller('trainingsbytrainier',function($rootScope,$scope,$http,$location)
{
    $scope.showsession = false;
    
    $scope.search = function() {
        
    $scope.searchbarTrainigList = true;
    $scope.showsession = false;
    var training ={ trainerId: $rootScope.empId };
    $http(
			{
               
				method: 'POST',
				url:"http://localhost:8080/springmvchibernate/trainingsconductedbyme",
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
    
});




