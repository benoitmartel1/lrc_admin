$( document ).ready(function() {
	var Timer;

	$('input').on('input', function(){
		 clearTimeout(Timer);
		Timer = setTimeout(function () {
		if ($(this).val().length > 2) {
			console.log($(this).val());
		}
		}, 2000);
	})
});