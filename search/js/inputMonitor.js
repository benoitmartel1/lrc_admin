$( document ).ready(function() {

	var sessionId=defineSessionId();
	var Timer;

	//Listeners
	$('input').on('input', function(){
		var entry=$(this).val();
		clearTimeout(Timer);
		Timer = setTimeout(function () {
		if (entry.length > 2) {
			inputTracker(sessionId, entry);
		}
		}, 2000);
	})
});

function defineSessionId(){
	var id;
	$.getJSON("http://ip-api.com/json?callback=?", function (data) {
   	 console.log(data.query);
 	});
	return id;
};
function inputTracker(sessionId, str) {
	$.post('php/insertTracker.php',{
		sessionId:sessionId,
		type:'input',
		value:str
	}, function(data){console.log(data)});
};
function viewActivityTracker(sessionId, id) {};
function filterTracker(sessionId, type, value) {};
function signUpTracker(sessionId, id) {};