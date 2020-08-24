$( document ).ready(function() {
	var Timer;

	$('input').on('input', function(){
		var entry=$(this).val();
		clearTimeout(Timer);
		Timer = setTimeout(function () {
		if (entry.length > 2) {
			console.log(entry);
		}
		}, 1500);
	})
});