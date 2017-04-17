

//set up
function init() {
	createListeners();
}

//create listeners
function createListeners() {
	//listener for the todos on the list
	//toggle the class for grey color and strikethrough
	$('ul').on('click', 'li', function() {
		$(this).toggleClass('completed');
	});

	//click on the X to delete
	$('ul').on('click', 'span', function(event) {
		$(this).parent().slideUp(300, function() {
			$(this).remove();
		});
		// $(this).parent().remove();
		event.stopPropagation();
	});

	//listener on inputs to add todos by pressing enter
	$("input[type='text']").on('keypress', function(event) {
		if(event.which === 13) {
			var ToDoText = $(this).val();
			$(this).val("");

			$('ul').append("<li><span><i class='fa fa-trash'></i></span> " +  ToDoText + "</li>");
		}
	});

	//slide toggle for a list (Should be present on 'top level' items)
	$(".fa-plus").click(function(){
		$("ul").slideToggle();
	});


}

init();
