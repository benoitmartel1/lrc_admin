$( document ).ready(function() {



	var Timer;

function chChannel(pressed) {
   

    // call function to change channel using variable value inputChannel for ex. 011
};

	console.log('ready');
	$('input').on('input', function(){
		console.log('start');

		 clearTimeout(Timer);
		Timer = setTimeout(function () {
			console.log('time out');
		if ($(this).val().length() > 2) {
			console.log($(this).val());
		}
		}, 2000);
	})

});