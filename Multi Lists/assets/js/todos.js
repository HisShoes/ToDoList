var currentHidden = false;
var deleting = false;

//set up
function init() {
	createListeners();
}

//create listeners
function createListeners() {
	//listener on the top level input to create new category - will not change
	$(".top").on('keypress', function(event) {
		if((event.which === 13) && ($(this).val() != "")) {
			var ToDoText = $(this).val();
			$(this).val("");

			$(this).parent().parent().append(`
				<div class='list outlined'>
					<h2>`+ ToDoText + ` <i class='fa fa-caret-down' aria-hidden='true'></i>
						<i class='delete fa fa-trash fa-inverse'></i>
						<span class='confirm-del'> <i class='fa fa-check'></i> </span>
						<span class='decline-del'> <i class='fa fa-times'></i> </span>
					</h2>
					<ul>
						<li><input class='sub' type='text' name='' maxlength='20' placeholder='Add New Todo'>
						</li>
					</ul>
				</div>
				`);
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


	// TURN ON/OFF INPUTS
	$('.fa-pencil-square-o').on('click', function (){
		$('input').slideToggle();
		$('li input').parent().slideToggle();
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
	$("h2").on('click', ".fa-caret-down", function(event){
		$(this).parent().parent().find('ul').slideToggle();
		$(this).toggleClass('fa-rotate-180');
		event.stopPropagation();
	});

	//listener on inputs to add todos by pressing enter
	$(".sub").on('keypress', function(event) {
		if((event.which === 13) && ($(this).val() != "")) {
			var ToDoText = $(this).val();
			$(this).val("");
			$(this).parent().parent().append("<li><span class='trash'><i class='fa fa-trash'></i></span> " +  ToDoText + "</li>");
		}
	});

	//click on the span to delete
	$('ul').on('click', 'span', function(event) {
		$(this).parent().slideUp(300, function() {
			$(this).remove();
		});
		event.stopPropagation();
	});

	//click confirm delete to remove a category/list
	$('.confirm-del').on('click', function(event) {
		$(this).parent().parent().slideUp(300, function() {
			$(this).remove();
		});
		event.stopPropagation();
	});

	//show the confirm/decline delete buttons
	$('.delete').on('click', function(event) {
		$(this).fadeToggle(300, function() {
			$(this).parent().find('.confirm-del').fadeToggle(100);
			$(this).parent().find('.decline-del').fadeToggle(100);
		});
		deleting = true;
		event.stopPropagation();
	});

	//DECLINE THE DELETION, RESHOWS TRASH
	$('.decline-del').on('click', function(event) {
		decline_delete($(this));
		event.stopPropagation();
	});

	//ON MOUSE OUT HIDE ACCEPT/DECLINE SHOW TRASH
	$('h2').mouseleave(function(event) {
		decline_delete($(this).find('.decline-del'));
		event.stopPropagation();
	});
}

function decline_delete( object) {
	if (deleting == true){
		object.fadeToggle(300);

		object.parent().find('.confirm-del').fadeToggle(300, function() {
			object.parent().find('.delete').fadeToggle(100);
		});
		deleting = false;
	}
}

//unbind then recreate listeners
function reset() {
	$('ul').unbind();
	$('.sub').unbind();
	$('h2').unbind();
	dynamicListeners();
}

init();
