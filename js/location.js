var latitude;
var longitude;

function get_location(){
	if ( "geolocation" in navigator) {
		navigator.geolocation.getCurrentLocation(set_location)
	} else {
		add_error("No Location", "Your current browser does not support geolocation. As such this app will not work.")
	}
} 

function set_location(position) {
	latitude = position.coords.latitude;
	longitude = positions.coords.longitude;
}
