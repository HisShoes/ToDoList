var currentHidden = false;

//set up
function init() {
	createListeners();
}

//create listeners
function createListeners() {
	//listener on the top level input to create new category - will not change
	$(".top").on('keypress', function(event) {
		if(event.which === 13) {
			var ToDoText = $(this).val();
			$(this).val("");

			$(this).parent().parent().append("<div class='list outlined'><h2>"+ ToDoText + " <i class='fa fa-plus' aria-hidden='true'></i></i></h2><ul><li><input class='sub' type='text' name='' maxlength='20' placeholder='Add New Todo'></li></ul></div>");
			reset();
		}
	});

	$('.fa-arrows-v').on('click', function() {

		if(currentHidden == false) {
		    $('ul').slideUp();
		}
		else {
			$('ul').slideDown();
		}
		currentHidden = !currentHidden;
	});

	dynamicListeners();
}

//listeners that may need to be created again
function dynamicListeners() {
	//toggle the class for todo completion
	$('ul').on('click', 'li', function() {
		$(this).toggleClass('completed');
	});

	//toggle the class for top level todo completion
	$('h2').on('click', function() {
		$(this).toggleClass('completed');
	});

	//slide toggle for a list (Should be present on 'top level' items)
	$("h2").on('click', ".fa-plus", function(event){
		$(this).parent().parent().find('ul').slideToggle();
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

	//click on the span to delete
	$('ul').on('click', 'span', function(event) {
		$(this).parent().slideUp(300, function() {
			$(this).remove();
		});
		event.stopPropagation();
	});
}

//unbind then recreate listeners
function reset() {
	$('ul').unbind();
	$('.sub').unbind();
	$('h2').unbind();
	dynamicListeners();
}

init();
