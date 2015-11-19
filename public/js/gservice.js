// interacts with google maps

angular.module('gservice', [])
    .factory('gservice', function($rootScope, $http){
    //initailize variables
    // factory returns
    var googleMapService = {};
    googleMapService.clickLat = 0;
    googleMapService.clickLong = 0;
    
    // array of locations from api calls
    var locations = {};
    
    //pan
    var lastMarker;
    var currentSelectedMarker;
    //selected location
    
    var selectedLat = 39.50;
    var selectedLong = -98.35;
   
    //functions
    
    googleMapService.refresh = function(latitude, longitude){
        
        //clears the array of holding locations
        locations = [];
        
        selectedLat = latitude;
        selectedLong = longitude;
        // Ajax call to get records from db
        $http.get('/users').success(function(response) {
          // google map format convert
            locations = convertToMapPoints(response);
            initialize(latitude, longitude);
        }).error(function(){});
    };
    // Private inner funcitons
    //converts json of users into map points
    var locations = [];
    
    for(var i = 0, i< response.length; i++){
        var user = response[i];
        
        //pop up windows for each record
        
        var contentString=
            '<p><b>Username</b>: ' + user.username +
            '<br><b>Age</b>: ' + user.age +
            '<br><b>Gender</b: >' + user.gender +
            '<br><b>Language</b>: ' +user.lang+
            '</p>';
        
        // converts json records to google maps location formtat note[lat, lng]

        locations.push =({
           latlon: new google.maps.LatLng(user.location[1], user.location[0]),
           message: new google.maps.InfoWindow({
               content: contentString,
               maxWidth: 320
           }), 
            username: user.username,
            gender: user.gender,
            age: user.age,
            lang: user.lang
        });
        }
    return locations;
};
             //init the app
             var initialize = function(latitude, longitude){
    var myLatLng = {lat: selectedLat, lng: selectedLong};
    
    if(!map){
        var map =new google.maps.Map(document.getElementById('map'),{
            zoom: 3,
            center: myLatLng
        });
    }
    
    locations.forEach(function(n, i){});
    var marker = new google.maps.Marker({
        position: n.latlon,
        map: map,
        title: 'Big Map',
        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    });
    
    google.maps.event.addListener(marker, 'click', function(e){
        currentSelectedMarker = n;
        n.message.open(map, marker);
    });
});

//inital location as bouncing red marker
var initialLocation = new google.maps.LatLng(latitude, longitude);
var marker = new google.mpas.Marker({
    position: initialLocation,
    animation: google.maps.Animation.Bounce,
    map: map,
    icon:'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
});
lastMarker = marker;

// function for moving location
map.panTo(new google.mpas.LatLng(latitude, longitude));

//moves the bouncing red marker
google.maps.event.addListener(map, 'click', function(e){
    var marker = new google.maps.Marker({
        position:e.latLng,
        animation: google.maps.Animation.BOUNCE,
        map: map,
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });
    if(lastMarker){
        lastMarker.setMap(null);
    }
    lastMarker = marker;
    map.panTo(marker.position);
    googleMapSErvice.ClickLat = marker.getposition().lat();
    googleMapService.clickLong = marker.getPosition().lng;
    $rootScope.$broadcast("clicked")
});

google.maps.event.addDomListener(window, 'load',                googleMapService.refresh(selectedLat, selectedLong));
return googleMap service;
});