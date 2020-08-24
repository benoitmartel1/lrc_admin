$( document ).ready(function() {
	var Timer;
console.log(2);
	$('input').on('input', function(){
		var entry=$(this).val();
		console.log(entry);
		 clearTimeout(Timer);
		Timer = setTimeout(function () {
		if (entry.length > 2) {
			console.log(entry);
		}
		}, 2000);
	})
});