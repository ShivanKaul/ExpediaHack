/*
 * Copyright 2015 Shivan Kaul
 * Copyright 2015 Michael Williams
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 var poi_index = 0;
 var current_poi = null;
 var new_poi = false;
 var firstTime = true;
 client_id = CLIENT_ID
 var buttonOn = false;

// talk = ["How about?", "Or maybe:", "Perhaps this?", "Consider going here, I hear it's great:", "This place is awesome I hear:", "My best friend loves this place:"]

function set_poi(poi) {
	$("#place_of_interest").fadeIn(300);
	var name = trim(poi.name);
	var url = encodeURIComponent(name);
	$("#place_of_interest .place-name").html(name);
	var search = "http://www.yelp.ca/search?find_desc=" + url;
	$("#link-yelp").attr("href", search);
	$("#link-yelp").attr("target", "_blank");
	current_poi = poi;
	new_poi = true;
	url_for_deeplinking = "https://m.uber.com/sign-up?client_id=" + client_id + "&dropoff_latitude=" + poi.coords[1] + "&dropoff_longitude=" + poi.coords[0] + "&pickup_latitude=" + latitude + "&dropoff_longitude=" + longitude
	$("#book-button").attr("href", url_for_deeplinking);
	$("#book-button").attr("target", "_blank");
	// document.getElementById("loading").innerHTML = talk[Math.floor(Math.random() * talk.length)];
	if (!firstTime) {
		var elem = document.getElementById('loading');
		if (elem != undefined) {
			elem.parentNode.removeChild(elem);
		}
	}
	
	firstTime = false
	setInterval('update_poi_image()', 500);
	calcRoute(poi.coords[0], poi.coords[1])
}

function image_error(image) {
	set_poi(next_poi()) // change poi
	return true;
}

function update_poi_image() {
	if (new_poi && current_poi){
		if(current_poi.imageURL){
			var image = $("#place_of_interest .place_image")
			image.attr("src", current_poi.imageURL);
			$("#place_of_interest .place_image").prop("hidden", false);
			new_poi = false;
		} else {
			$("#place_of_interest .place_image").prop("hidden", true);
		}
		set_footer_offset();
	}
}

function next_poi(){
	if (poi_list.length == 0) {
		return null;
	}
	if (poi_index >= (poi_list.length - 1)) {
		return poi_list[poi_list.length - 1];
	} else {
		poi_index++;
		return poi_list[poi_index];
	}
}

function prev_poi(){
	if (poi_list.length == 0) {
		return null;
	}
	if (poi_index <= 0) {
		return poi_list[0];
	} else {
		poi_index--;
		return poi_list[poi_index];
	}
}

function is_next_poi(){
	return (poi_index < poi_list.length - 1);
}

function is_prev_poi(){
	return (poi_list > 0);
}

function show_button(){
	var offset = 50+200 - Math.floor($("#button-holder").width()/2);
	console.log("Uber Button offset is: " + offset);
	$("#book-button img").css("margin-top", offset);
	$("#book-button").fadeIn();
	buttonOn = true;
}

$(document).keyup(function(e) {
	e = e||window.event;
	if (e.keyCode == "37") { //Left Arrow
		//set_poi(prev_poi());
		show_button();
	} else if (e.keyCode == "39") { //Right Arrow
		if (buttonOn){
			$("#book-button").fadeOut(300);
			buttonOn = false;
		}
		$("#place_of_interest").fadeOut( 300, function() {
			set_poi(next_poi());
		});
	}
});

function set_footer_offset() {
	var f = $("footer");
	if (window.innerHeight >= $(document).height()) {
		f.css("position", "fixed");
		f.css("bottom", "2%");
		f.css("left", "50%");
		f.css("transform", "translateX(-50%)");
	} else {
		f.css("position", "relative");
		f.css("bottom", "auto");
		f.css("left", "auto");
		f.css("transform", "none");
	}

}

$(window).resize(function() {
	set_footer_offset();
});

$(document).ready(function(){
	set_footer_offset();
	get_location();
});
