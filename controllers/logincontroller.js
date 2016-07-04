myApp.controller('loginController', function($rootScope,$scope,$cookies,$http,$location)
 {
 	$scope.authenticateUser = function () {
        var User = { username: $scope.tm.login.username, password: $scope.tm.login.password};
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
            $rootScope.role = data.empType;
            $cookies.put('userType', data.empType);
            $cookies.put('username',data.username);
            $cookies.put('userId',data.empId);
            if($cookies.get('userType')=='TrainingExecutive')
                $location.path("/admindashboard");
            else if($cookies.get('userType')=='Trainer')
                $location.path("/trainerdashboard");
            else if($cookies.get('userType')=='Employee')
                $location.path('/dashboard');
            else 
            {
                $scope.message = 'Username or Password is Wrong';
                $cookies.remove("userType");
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
        if($cookies.get('userType') == 'TrainingExecutive')
            return 'navbar/adminbar.html';
        else if($cookies.get('userType') == 'Trainer')
            return 'navbar/trainerbar.html';
        else if($cookies.get('userType') == 'Employee')
            return 'navbar/userbar.html';
        else
            return '';
    }
    
    $scope.register = function()
    {
        console.log($location);
        $location.path('/dashboard');
    }
    
    $scope.logout = function()
    {
         $cookies.remove("userType");
         $location.path('/');
    }
   
    
});