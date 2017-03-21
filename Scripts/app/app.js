var app = angular.module('myApp', ['ngRoute', 'ngResource']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', { templateUrl: 'templates/list.html', controller: 'HomeCtrl' });
    $routeProvider.when('/edit/:id', { templateUrl: 'templates/edit.html', controller: 'EditCtrl' });
    $routeProvider.when('/create', { templateUrl: 'templates/create.html', controller: 'CreateCtrl' });
    $routeProvider.otherwise({ redirectTo: '/home' });
}]);


app.controller('HomeCtrl', ['$scope','Profiles','$route',function($scope,Profiles,$route){
	Profiles.get(function(data){
		$scope.profiles = data.response;
	});

	$scope.remove = function(id){
		Profiles.delete({id:id}).$promise.then(function(data){
			if(data.response){
				$route.reload();
				$scope.success = "Item has been deleted.";
			}
		});
	}
}]);


app.controller('EditCtrl', ['$scope','Profiles','$routeParams',function($scope,Profiles,$routeParams){
	var id = $routeParams.id;

	Profiles.get({id:id},function(data){
		$scope.profiles = data.response;
	});

	$scope.submit = function(){
		Profiles.update({id:$scope.profiles.id},{profile:$scope.profiles},function(data){
			$scope.success = "Successfully Edited";
		});
	}
}]);

app.controller('CreateCtrl', ['$scope','Profiles',function($scope,Profiles){
	$scope.profiles = {
		name:"",
		designation:"",
		company:""
	};

	$scope.submit = function(){
		Profiles.save({profile:$scope.profiles}).$promise.then(function(data){
			if(data.response){
				angular.copy({},$scope.profiles);
				$scope.success = "Successfully Created.";
			}
		})
	}
}]);


app.factory('Profiles',['$resource',function($resource){
	return $resource('http://localhost/ng_tutorial/Api/:id',{id:'@_id'},{
		update:{method:'PUT',params:{id:'@_id'}}
	});
}]);
