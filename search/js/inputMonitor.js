$( document ).ready(function() {

	var sessionId=defineSessionId();
	var Timer;

	//Listeners
	$('input').on('input', function(){
		var entry=$(this).val();
		clearTimeout(Timer);
		Timer = setTimeout(function () {
		if (entry.length > 2) {
			console.log(entry);
			inputTracker(sessionId, entry);
		}
		}, 1500);
	})
});

function defineSessionId(){
	var id=999;
	return id;
};
function inputTracker(sessionId, str) {
	console.log('sending'+str);
	$.post('php/insertTracker.php',{
		sessionId:sessionId,
		type:'input',
		value:str
	}, function(data){console.log(data)});
};
function viewActivityTracker(sessionId, id) {};
function filterTracker(sessionId, type, value) {};
function signUpTracker(sessionId, id) {};