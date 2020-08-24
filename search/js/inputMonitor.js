$( document ).ready(function() {
	console.log('ready');
	$('input').on('input', function(){
		console.log(this);
		console.log($(this).val());
	})

});