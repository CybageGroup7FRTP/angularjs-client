 myApp.controller('registerTraining', function($rootScope,$scope,$cookies,$http,$location)
 {
     $scope.postData = function()
     {
        $scope.training.trainingExecId = $cookies.get('userId');
        $http(
				{   method:'POST',
					url:"http://localhost:8080/springmvchibernate/registertraining",
					data: $scope.training,
					headers: {'Content-Type' : 'application/json'}
				}
			).success(function(data,status,headers,config) 
				{
                    console.log(data.name);
                    $scope.message = data.name+' Training Added'
                    $scope.training = {};    
		 }).error(function(data,status,headers,config) 
         {
                console.log("error occured");
                $scope.message = 'Server is down. Please try again after some time';
		 	    $location.path('/');
        });
     }
     
     $scope.showTechnology= function (technology)
     {
         console.log("Technology selected is: "+technology);
         var trainerTechnology = { name: technology };
         console.log("Technology selected is: "+trainerTechnology)
         $http(
				{   method:'POST',
					url:"http://localhost:8080/springmvchibernate/trainerwithtechnology",
					data: trainerTechnology,
					headers: {'Content-Type' : 'application/json'}
				}
			).success(function(data,status,headers,config) 
				{
                    console.log(data[0].empId);
                    $scope.trainers = data;
                
		 }).error(function(data,status,headers,config) 
         {
                console.log("error occured");
                $scope.message = 'Server is down. Please try again after some time';
		 	    $location.path('/');
        });
     }
 });