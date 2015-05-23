var poi_index = 0;

function set_poi(poi) {
	$("#place_of_interest .place-name").html(trim(poi.name))
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

document.onkeyup = function(e) {
	e = e||window.event;
	if (e.keyCode == "37") { //Left Arrow
		set_poi(prev_poi());
	} else if (e.keyCode == "39") { //Right Arrow
		set_poi(next_poi());
	}
};
