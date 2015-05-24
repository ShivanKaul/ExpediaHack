var poi_list = [];
function call_expedia() {
	// Get top 10 places to go
	var radius = 15
	var key = API_KEY
	var long = longitude
	var lat = latitude

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
                                var results = queryResult;
                                var numResults = results.length;
                                var map = []
                                if (numResults > 0) {
                                	var bound = Math.min(25, numResults); // get either first 25 or however many we got if below 25
                                	for (i = 0; i < bound; i++) {
                                		var tuple = results[i]
                                		var placeName = tuple.name
                                		var placeCoords = tuple.position.coordinates
                                		map.push({name : placeName, coords : placeCoords, imageURL : ""})

                                	}
                                	var elem = document.getElementById('wrapper-spinner');
                                	elem.parentNode.removeChild(elem);
                                    document.getElementById("loading").style.color = "grey"
                                	poi_list = map
                                	for (i = 0; i < poi_list.length; i++) {
                                		get_poi_photo(i);
                                	}
                                	initialize_map()
                                	set_poi(poi_list[0])
                                    document.getElementById("loading").innerHTML = "You should check out:"
					$("#place_of_interest").prop("hidden", false)
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

function get_poi_photo(index){
	var name = poi_list[index].name
	var nameURL = encodeURIComponent(name)
	var url = "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=" + nameURL
	$.ajax({
		url: url,
		dataType: "jsonp",
		success: function (queryResult) {
			var result = queryResult.responseData.results[0]
			var localUrl = result.url
			poi_list[index].imageURL = localUrl
		}
	})
}


function trim(name) {
	if (name.indexOf(",") > -1) {
		var newName = name.substring(0, name.indexOf(","));
	}
    else {
        return name
    }
    return newName
}


