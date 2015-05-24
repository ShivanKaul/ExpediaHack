var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize_map(lang, long) {
	directionsDisplay = new google.maps.DirectionsRenderer();
	var mapCanvas = document.getElementById('map');
	var mapOptions = {
		center: new google.maps.LatLng(latitude, longitude),
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(mapCanvas, mapOptions);
	directionsDisplay.setMap(map);
}

function calcRoute(long, lat) {
	orig = new google.maps.LatLng(latitude, longitude);
	dest = new google.maps.LatLng(lat, long);
	var request = {
		origin: orig,
		destination: dest,
		travelMode: google.maps.TravelMode.DRIVING
	};
	directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
		}
	});
}
