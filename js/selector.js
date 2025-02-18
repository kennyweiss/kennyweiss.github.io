function toggleDisplay(obj,togClass,caller) {
	obj = document.getElementById(obj);

	// Find the child containing the abstract
	objChildren = obj.getElementsByTagName("div");
	for(var i=0; i< objChildren.length; i++)
		if( objChildren[i].className == togClass)
			abstract = objChildren[i];

	// Find the child node than needs to toggle
	togTextNode = caller.getElementsByTagName("a")[0];


	if(abstract.style.display == 'block'){
		abstract.style.display = 'none';
		togTextNode.className = "toggle_off";
	}
	else{
		abstract.style.display = 'block';
		togTextNode.className = "toggle_on";	
	}

}