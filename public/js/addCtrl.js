//Add controller 
var addCtrl = angular.module('addCtrl', ['geolocation', 'gservice'])
.controller('addCtrl', function($scope, $http, $rootScope, geolocation, gservice){
   
    $scope.formData = {};
    var coords = {};
    var lat = 0;
    var long = 0;
    
    //initial coordinates
    $scope.formData.latitude = 39.500;
    $scope.formData.longitude = -98.350;
    
    // gets coordinates on mouse click
    $rootScope.$on("clicked", function(){
        
        //runs the gservice function associated with identifying coordinates
        $scope.$apply(function(){
            $scope.formData.Latitude = parseFloat(gservice.clickLat).toFixed(3);
            $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
            $scope.formData.verified= "nope";
        });
    });
    
    //creates new user from forms
    $scope.createUser = function(){
        var userData = {
           username: $scope.formData.username,
            gender: $scope.formData.gender,
            age: $scope.formData.age,
            lang: $scope.formData.lang,
            location:[$scope.formData.longitude, $scope.formData.latitude],
            verified: $scope.formData.verified
        };
        //saves user to db
        $http.post('/users' userData)
        .success(function(data){
            //clears form
            $scope.formData.username = "";
            $scope.formData.gender = "";
            $scope.formData.age = "";
            $scope.formData.lang = "";
            gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
        })
        .error(funciton(data){
               console.log('Error: ' + data);
               });
    };
})