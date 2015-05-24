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

// talk = ["How about?", "Or maybe:", "Perhaps this?", "Consider going here, I hear it's great:", "This place is awesome I hear:", "My best friend loves this place:"]

function set_poi(poi) {
	var name = trim(poi.name)
	var url = encodeURIComponent(name)
	$("#place_of_interest .place-name").html(name)
	var search = "http://www.yelp.ca/search?find_desc=" + url
	$("#link-yelp").attr("href", search)
	current_poi = poi;
	new_poi = true;
	// document.getElementById("loading").innerHTML = talk[Math.floor(Math.random() * talk.length)];
	setInterval('update_poi_image()', 500);
	calcRoute(poi.coords[0], poi.coords[1])
}

function update_poi_image() {
	if (new_poi && current_poi){
		if(current_poi.imageURL){
			$("#place_of_interest .img-circle").attr("src", current_poi.imageURL);
			$("#place_of_interest .img-circle").prop("hidden", false);
			new_poi = false;
		} else {
			$("#place_of_interest .img-circle").prop("hidden", true);
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

$(document).keyup(function(e) {
	e = e||window.event;
	if (e.keyCode == "37") { //Left Arrow
		set_poi(prev_poi());
	} else if (e.keyCode == "39") { //Right Arrow
		set_poi(next_poi());
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
