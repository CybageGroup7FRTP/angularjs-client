 myApp = angular.module('mainApp', ['ngRoute']);

 myApp.config(function($routeProvider) {
 	$routeProvider
 	.when('/',{
 		templateUrl: 'login.html'
 	})
    .when('/admindashboard',{
        templateUrl: 'admindashboard.html'
    })
    .when('/trainerdashboard',{
    templateUrl: 'tdashboard.html'
    })
    .when('/dashboard',{
        templateUrl: 'dashboard.html'
    })
    .when('/registertraining',{
        templateUrl: 'registertraining.html'
    })
    .when('/deletetraining',{
        templateUrl: 'deletetraining.html'
    })
    .when('/searchtraining',{
        templateUrl: 'searchtraining.html'
    })
    .otherwise({
 		redirectTo:'/'
 	});
 });

 myApp.controller('loginController', function($rootScope,$scope,$http,$location)
 {
 	$scope.authenticateUser = function () {
        var User = { username: $scope.tm.login.username, password: $scope.tm.login.password};
        console.log(User);
        $http(
				{   method:'POST',
					url:"http://localhost:8080/springmvchibernate/login",
					data: User,
					headers: {'Content-Type' : 'application/json'}
				}
			).success(function(data,status,headers,config) 
				{
            $rootScope.username = data.username;
            $rootScope.empId = data.empId;
            alert($rootScope.empId);
            $rootScope.role = data.empType;
            console.log('role in http'+$rootScope.role);
		 	if(data.empType=='TrainingExecutive')
                $location.path("/admindashboard");
            else if(data.empType=='Trainer')
                $location.path("/trainerdashboard");
            else if(data.empType=='Employee')
                $location.path('/dashboard');
            else 
            {
                $scope.message = 'Username or Password is Wrong';
                $location.path('/');
            }    
                
		 }).error(function(data,status,headers,config) 
         {
                console.log("error occured");
                $scope.message = 'Server is down. Please try again after some time';
		 	    $rootScope.role = "";
                $location.path('/');
        });
    }
    
    $scope.navbar = function()
    {
        var role = $rootScope.role;
        if(role == 'TrainingExecutive')
            return 'adminbar.html';
        else if(role == 'Trainer')
            return 'trainerbar.html';
        else if(role == 'Employee')
            return 'userbar.html';
        else
            return '';
    }
    
    $scope.register = function()
    {
        console.log($location);
        $location.path('/dashboard');
    }
   
    
});

 myApp.controller('registerTraining', function($rootScope,$scope,$http,$location)
 {
     $scope.postData = function()
     {
        $scope.training.trainingExecId = $rootScope.empId;
        $http(
				{   method:'POST',
					url:"http://localhost:8080/springmvchibernate/registertraining",
					data: $scope.training,
					headers: {'Content-Type' : 'application/json'}
				}
			).success(function(data,status,headers,config) 
				{
                    console.log(data.name);
                
		 }).error(function(data,status,headers,config) 
         {
                console.log("error occured");
                $scope.message = 'Server is down. Please try again after some time';
		 	    $location.path('/');
        });
     }
 });

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

myApp.controller('searchTraining',function($rootScope,$scope,$http,$location)
{
    $scope.searchbar = true;
    $scope.showsession = false;
    
    $scope.search = function(){
    $scope.searchbar = true;
    $scope.searchbarTrainigList = false;
    $scope.showsession = false;
    $scope.training.trainId = $rootScope.empId;
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
        $scope.training.trainingExecId = $rootScope.empId;
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
    
});


