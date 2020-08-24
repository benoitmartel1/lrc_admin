$( document ).ready(function() {
	$('input').change(function(){
		console.log(this);
		console.log($(this).val());
	})

});