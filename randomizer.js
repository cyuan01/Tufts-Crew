var roster = [];
var toRandom =[];
var boat1 = [];
var boat2 = [];

getRoster();


function getRoster(){
	var request = new XMLHttpRequest();

	request.open("GET", "https://vast-crag-95027.herokuapp.com/roster.json", true);

	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	request.onreadystatechange = function() {
		//on success response
		if (request.readyState == 4 && request.status == 200) {
			var result = request.responseText;
			var others = JSON.parse(result);
			var buttons = $('#buttons').val(); 
			//get names from json
			for(object in others) {
				roster.push(others[object][0]);
			}

			//dynamically add checkboxes to div
			for(name in roster){
				buttons += "<div class='form-check'> <input class='form-check-input' type='checkbox' value='' id='checkbox" + name + "'><label style='padding-left:5px;' class='form-check-label' for='checkbox" + name + "'>" +roster[name] +"</label></div>";
			}
			$('#buttons').html(buttons);

			//becasue of async this needs to go after the roster displays else roster is empty
			setBoxes();

		}
	}
	request.send("");

}

function setBoxes(){
	$('#button').on('click', function(event) {
		toRandom = [];
		for(name in roster) {
			var id = '#checkbox' + name;

			if($(id).is(":checked")) {
				//only pushing array index in roster
				toRandom.push(name);
			}	
		}
		if(toRandom.length != 16){
			$("#errorMsg").show();
		} else {
			$("#errorMsg").hide();
			randomize();
		}
	});
}

function randomize(){
	$("#displayBoats").show();
	toRandom.sort(function() { return 0.5 - Math.random() });
	var boat1 = toRandom.slice(0,8);
	var boat2 = toRandom.slice(8,16);
	for(name in boat1) {
		boat1[name] = roster[boat1[name]] + '<br>';
		boat2[name] = roster[boat2[name]] + '<br>';
	}
	$('#displayBoat1').html(boat1);
	$('#displayBoat2').html(boat2);

}

