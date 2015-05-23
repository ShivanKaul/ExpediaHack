function add_error(header, description){
	var e = document.createElement("div");
	e.className = "alert alert-danger alert-dismissible"
	e.setAttribute("role", "alert");
	e.appendChild(build_dismiss());
	var top_wrapper = document.createElement("strong");
	var top_message = document.createTextNode(header);
	top_wrapper.appendChild(top_message);
	e.appendChild(top_wrapper);
	var main_message = document.createTextNode(description);
	e.appendChild(document.createElement("br"));
	e.appendChild(main_message);
	return $("#error-list").append(e);
}

function build_dismiss() {
	var dis = document.createElement("button");
	dis.className = "close";
	dis.setAttribute("type", "button");
	dis.setAttribute("data-dismiss", "alert");
	dis.setAttribute("aria-label", "Close");
	var c = document.createElement("span");
	c.setAttribute("aria-hidden", "true");
	c.innerHTML = "&times;";
	dis.appendChild(c);
	return dis; 
}
