function call_expedia() {
	// Get top 10 places to go
	var radius = 15
	var key = API_KEY
	var long = -73.5703288
	var lat = 45.5119172

	var queryURL = "http://terminal2.expedia.com/x/geo/features?within=" + radius + "km&lng=" + long + "&lat=" + lat + "&type=point_of_interest&apikey=" + key

	$(document).ready(function(){
		$.ajax({
			url: queryURL,
			dataType: "json",
			statusCode: {
				502: function () {
					console.log("Error 502 thrown.")
				}
			},
			success: function (queryResult) {
                                // get array of all results
                                var results = queryResult;
                                var numResults = queryResult.length;
                                var map = []
                                if (numResults > 0) {
                                	var bound = Math.min(10, numResults); // get either first ten or however many we got if below 10
                                	for (i = 0; i <= bound; i++) {
                                		var tuple = results[i]
                                		var placeName = tuple.name
                                		var placeCoords = tuple.position.coordinates
                                		map = map + {name : placeName, coords : placeCoords}
                                	}
                                	var result = getTitle(numResults, results)
                                	var title = result[0]
                                	var randomNum = result[1]
                                	var link = results[randomNum].url;


