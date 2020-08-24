$( document ).ready(function() {
	console.log('ready');
	$('input').change(function(){
		console.log(this);
		console.log($(this).val());
	})

});