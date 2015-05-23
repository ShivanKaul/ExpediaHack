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
                                	var bound = Math.min(25, numResults); // get either first 25 or however many we got if below 25
                                	for (i = 0; i < bound; i++) {
                                		var tuple = results[i]
                                		var placeName = tuple.name
                                		var placeCoords = tuple.position.coordinates
                                		map.push({name : placeName, coords : placeCoords, imageURL : ""})
                                		console.log(placeName, placeCoords)

                                	}
                                	var sugg = map[0].name
                                	sugg = trim(sugg)
                                	console.log(map)
                                	var elem = document.getElementById('wrapper-spinner');
                                	elem.parentNode.removeChild(elem);
                                	document.getElementById("loading").innerHTML = "You should check out: "
                                	poi_list = map
                                	console.log("map is " + map)
                                	// var imageLinks = new Array(bound)
                                	// var promises = []
                                	for (i = 0; i < poi_list.length; i++) {
                                		var name = poi_list[i].name
                                		var url = "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=" + name
                                		$.ajax({
                                			url: url,
                                			dataType: "jsonp",
                                			success: function (queryResult) {
                                				var result = queryResult.responseData.results[0]
                                				var localUrl = result.url
                                				console.log("inside nested call")
                                				console.log(poi_list[i])
                                				poi_list[i].imageURL = localUrl
                                			}
                                		})
                                	}
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

// function getImageURL(name) {
// 	// return only once the AJAX request gets processed
// 	url = ""
// 	name = encodeURIComponent(name);
// 	queryURL = "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=" + name
// 	$.when(ajaxRequest()).done(function(status) {
// 		console.log("url is " + url)
// 	})
// 	return url
// }
function ajaxRequest(queryURL) {
	return $.ajax({
		url: queryURL,
		dataType: "jsonp",
		statusCode: {
			502: function () {
				console.log("Error 502 thrown.")
			}
		},
		success: function (queryResult) {
			console.log("inside image search")
			var result = queryResult.responseData.results[0];
			var localUrl = result.url
			url = localUrl
		},
		error: function(statusCode, errorThrown) {
			if (statusCode.status == 0) {
				document.write("Whoops, something went wrong in the image search AJAX request.")
			}
		}
	})
}


