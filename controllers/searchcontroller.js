myApp.controller('searchTraining',function($rootScope,$scope,$cookies,$http,$location)
{
    //$scope.searchbar = true;
    $scope.searchbarTrainigList = true;
    $scope.showsession = false;
    var userhomename = $cookies.get('userId');
    
    $scope.search = function(){
    $scope.searchbarTrainigList = true;
    $scope.showsession = false;
    $scope.training.trainId = $cookies.get('userId');
        $http(
			{
               
				method: 'POST',
				url:"http://localhost:8080/springmvchibernate/searchtraining",
				data : $scope.training,
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
                //$location.path = '/viewtraining';
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
        $scope.training.trainId = a;
        $http(
			{
               
				method: 'POST',
				url:"http://localhost:8080/springmvchibernate/listsessions",
				data : $scope.training,
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
    
    $scope.searchtrainingsaddedbyme = function()
    {
        $scope.searchbar = true;
        $scope.searchbarTrainigList = false;
        $scope.showsession = false;
        alert($cookies.get('userId'));
        $scope.training.trainingExecId = $cookies.get('userId');
        $http(
			{
               
				method: 'POST',
				url:"http://localhost:8080/springmvchibernate/addedtrainings",
				data : $scope.training,
				headers :{'Content-Type' : 'application/json'}
			
			}
				).success(function(data,status,headers,config)
			{
                console.log('Training Executive '+data);
                console.log("successfully searched");
                $scope.trainingRec = data;
                $scope.searchbar = false;
                $scope.searchbarTrainigList = true;
                $scope.showsession = false;
                //$location.path = '/viewtraining';
		}).error(function(data,status,headers,config)
				 {
			console.log("error");
			$location.path('/')
			
		});
    }
    
    $scope.nominate = function(trainId)
    {
        $scope.training.trainId = trainId;
        $scope.training.nominate = prompt("Enter EmployeeId or group Name");
        console.log("Train Id is: "+$scope.training.trainId);
        $http(
			{
               
				method: 'POST',
				url:"http://localhost:8080/springmvchibernate/addnomination",
				data : $scope.training,
				headers :{'Content-Type' : 'application/json'}
			
			}
				).success(function(data,status,headers,config)
			{
                alert("Trainee Nominated");
                
		}).error(function(data,status,headers,config)
				 {
			console.log("error");
			$location.path('/');
		});
    }
        
});