var poi_list = [];
function call_expedia() {
	// Get top 10 places to go
	var radius = 15
	var key = API_KEY
	var long = longitude
	var lat = latitude
	console.log(long)
	console.log(lat)

	var queryURL = "http://terminal2.expedia.com/x/geo/features?within=" + radius + "km&lng=" + long + "&lat=" + lat + "&type=point_of_interest&apikey=" + key

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
                                console.log("Inside AJAX call")
                                var results = queryResult;
                                var numResults = results.length;
                                var map = []
                                if (numResults > 0) {
                                	var bound = Math.min(25, numResults); // get either first ten or however many we got if below 10
                                	for (i = 0; i < bound; i++) {
                                		var tuple = results[i]
                                		var placeName = tuple.name
                                		var placeCoords = tuple.position.coordinates
                                		console.log(placeName, placeCoords)
                                		map.push({name : placeName, coords : placeCoords})
                                	}
                                	var sugg = map[0].name
                                	sugg = trim(sugg)
                                	console.log(map)
                                	var elem = document.getElementById('wrapper-spinner');
                                	elem.parentNode.removeChild(elem);
                                	document.getElementById("loading").innerHTML = "You should check out: "
                                	$("#place_of_interest .place-name").html(sugg)
                                	poi_list = map
					set_poi(poi_list[0])
                                }
                                else {
                                	document.write("Couldn't find any results! You live in a boring town, sorry.")
                                }
                            },
                            error: function(statusCode, errorThrown) {
                            	if (statusCode.status == 0) {
                            		document.write("Whoops, something went wrong in the AJAX request.")
                            	}
                            }

                        })
}

function trim(name) {
	if (name.indexOf(",") > -1) {
		var newName = name.substring(0, name.indexOf(","));
	}
	return newName
}


