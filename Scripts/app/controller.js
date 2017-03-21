//factories



app.factory('Student', ['$resource', function ($resource) {
    var resource = $resource('http://localhost:1670/Api/Student');
    return resource;
}]);


//controllers

app.controller('myController1', ['$scope', 'Student', function($scope, Student) {

    $scope.Heading = "Student List";
    $scope.students = [];

    Student.get(function(response) {
        console.log(response);
        $scope.students = response.Data;
    });
}])
    .controller('myController2', ['$scope', 'Student', '$location', function($scope, Student, $location) {
        $scope.title = "Add Students";
        $scope.save = function() {
            Student.save({ Name: $scope.Name, Address: $scope.Address, Phone: $scope.Phone }, function(response) {


                if (response) {
                    $scope.Notification = "Student is saved.";
                    $scope.Name = "";
                    $scope.Address = "";
                    $scope.Phone = "";
                    $location.path("/partial1");
                } else {
                    $scope.Notification = "Student is not saved!";
                }

            });
        };
    }])
    .controller('myController3', ['$scope', 'Student', '$routeParams', '$location', function($scope, Student, $routeParams, $location) {
        var requestedId = $routeParams.id;
        $scope.Heading = "Remove a Student";

        Student.get({ request: JSON.stringify(requestedId) }, function(response) {
            //console.log(response);
            $scope.student = response.Data;
        });

        $scope.delete = function() {
            Student.remove({ request: JSON.stringify(requestedId) }, function(response) {
                if (response.IsSuccess) {
                    $location.path('/partial1');
                }
            });
        };
    }]);
app.controller('myController4', ['$scope', 'Student', '$routeParams', '$location', function($scope, Student, $routeParams, $location) {

    $scope.heading = "Update Information";

    var requestedId = $routeParams.id;

        Student.get({ response: JSON.stringify(requestedId) }, function(response) {
            console.log(response);
            $scope.student = response.Data;
        });

        $scope.save = function() {
            Student.save($scope.student, function(response) {
                if (response) {
                    $scope.notification = "Saved";
                    $scope.student = {};
                    $location.path('/partial1');
                    
                } else {
                    $scope.message = "Failed!";
                }
            });
        };
    }]);

