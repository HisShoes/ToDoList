

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
	$(".sub").on('keypress', function(event) {
		if(event.which === 13) {
			var ToDoText = $(this).val();
			$(this).val("");

			$(this).parent().parent().append("<li><span><i class='fa fa-trash'></i></span> " +  ToDoText + "</li>");
		}
	});

	//listener on the top level input to create new category
	$(".top").on('keypress', function(event) {
		if(event.which === 13) {
			var ToDoText = $(this).val();
			$(this).val("");

			$(this).parent().parent().append("<div class='list outlined'><h2>"+ ToDoText + " <i class='fa fa-plus' aria-hidden='true'></i></i></h2><ul><li><input class='sub' type='text' name='' placeholder='Add New Todo'></li></ul></div>");
		}
	});

	//slide toggle for a list (Should be present on 'top level' items)
	$("h2").on('click', ".fa-plus", function(){
		$('ul').slideToggle();
	});


}

init();
