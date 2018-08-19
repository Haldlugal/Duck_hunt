/*
	dog_walk
	dog_jump
	
	duck_fly
	duck_fly_left
	duck_fly_right
	duck_fly_top_right
	duck_fly_top_left
*/
		
	var width = $('.wrapper').width();
	var height = $('.wrapper').height()
	var shots;
	var duckCount;
	
	var leftSpawnBorder = 30;
	var rightSpawnBorder = 70;
	var topSpawnBorder = $('.foot').height();
	var flightDirections = ['duck_fly_left', 'duck_fly_right', 'duck_fly_top_left', 'duck_fly_top_right'];
	var ducksLostCount = 0;	
	
	var missDuck = function(e){
		if (!e.target.classList.contains('duck')) { 
			console.log(e.target);
			shots--;
			if (shots<=0){
				gameOver();
			}
			$('.shots_left').html(shots);			
		}
	}
	
	$('.beginning_button').on('click', function(){		
		$('.beginning_button').hide();
		gameBegin();
	});
	
	/*Beginning animation, vars init*/
	function gameBegin(){
		duckCount = 0;
		ducksLostCount = 0;
		shots = 3;
		$('.shots_left').html(shots);
		$('.ducks_lost_count').html(ducksLostCount);
		$('.ducks_hunted').html(duckCount);
		
		var dog = $('<div></div>');
		dog.addClass('dog').addClass('gs');
		$('.wrapper').append(dog);
		dog.addClass('dog_walk');
		
		dog.animate({
			left: "50%",
		},1000, function() {
			dog.addClass('dog_jump');
			setTimeout("gameStart()",2000);
		});		
		
	}
	
	/*Let the ducks out!*/
	function gameStart(){
		$('.dog').remove();
		$(document).click(missDuck);
		spawnDuck();		
	}
	
	/*Game ends, endgame screen shown*/
	function gameOver(){
		$('.duck').remove();
		$(document).off();		
		$('.gameover').show();
		$('.once_more_button').click(function(){
			$('.once_more_button').off();
			$('.gameover').hide();
			gameBegin();
		});
		$('.gameover_count').html('Уток настреляно: ' + duckCount);
		
	}
	/*create a duck*/
	function spawnDuck(){
		var duck = $('<div></div>');
		var initialDuckPosition = Math.floor(Math.random() * (rightSpawnBorder - leftSpawnBorder) + leftSpawnBorder);
		duck.flightDirection = chooseDuckDirection();
		duck.addClass(duck.flightDirection);
		duck.data('flightDirection',duck.flightDirection);
		
		duck.addClass('duck').addClass('gs').addClass('duck_fly');
		duck.css('bottom', topSpawnBorder + 'px');		
		duck.css('left', initialDuckPosition + '%');
		$('.wrapper').append(duck);
		duck.on('click', function(){
			shots = 3;
			$('.shots_left').html(shots);
			duckCount++;			
			$('.ducks_hunted').html(duckCount);
			duck.remove();
			spawnDuck();
		});		
		duckFly();
		
		
	}
	function chooseDuckDirection(){
		var directionNumber = Math.floor (Math.random()*4);
		return flightDirections[directionNumber];
	}
	
	function changeDuckDirection(){
		var duck = $('.duck');
		var newDirection = chooseDuckDirection();
		duck.flightDirection = duck.data('flightDirection');
		duck.removeClass(duck.flightDirection);
		duck.addClass(newDirection);
		duck.data('flightDirection', newDirection);
		
	}
	
	/*Bye bye, my duck*/
	function duckFlyAway(duck){	
		duck.remove();		
		ducksLostCount+=1;
		console.log(ducksLostCount);					
		$('.ducks_lost_count').html(ducksLostCount);
		spawnDuck();
	}
	
	function duckFly() {
		var duck = $('.duck');
		duck.flightDirection = duck.data('flightDirection');		

		if(duck.flightDirection == 'duck_fly_left'){
			var addHeight = 2 * Math.floor(Math.random() * (50 + 50) - 50);
			var addWidth = 2 * Math.floor(Math.random() * (100) + 100);
			$.when(				
				duck.animate({
					'left': '-=' + addWidth,
					'top' : '-=' + addHeight
				}, 1000)
			).then(function(){
				if (parseInt(duck.css('left'))>width || parseInt(duck.css('left'))<0 || parseInt(duck.css('top'))<0 || parseInt(duck.css('top'))>height){
					duckFlyAway(duck);
				}
				else {
				changeDuckDirection();
				duckFly();
				}
			});	
		}
		else if (duck.flightDirection == 'duck_fly_right'){
			var addHeight = 2 * Math.floor(Math.random() * (50 + 50) - 50);
			var addWidth = 2 * Math.floor(Math.random() * (100) + 100);
			$.when(
				duck.animate({
					'left': '+=' + addWidth,
					'top' : '-=' + addHeight
				}, 1000)
			).then(function(){
				if (parseInt(duck.css('left'))>width || parseInt(duck.css('left'))<0 || parseInt(duck.css('top'))<0 || parseInt(duck.css('top'))>height){
					duckFlyAway(duck);
				}
				else {
				changeDuckDirection();
				duckFly();
				}
			});			
		}
		else if (duck.flightDirection == 'duck_fly_top_left'){
			var addHeight = 2 * Math.floor(Math.random() * (150));
			var addWidth = 2 * Math.floor(Math.random() * (50));
			$.when(
				duck.animate({
					'left': '-=' + addWidth,
					'top' : '-=' + addHeight
				}, 1000)
			).then(function(){
				if (parseInt(duck.css('left'))>width || parseInt(duck.css('left'))<0 || parseInt(duck.css('top'))<0 || parseInt(duck.css('top'))>height){
					duckFlyAway(duck);
				}
				else {
				changeDuckDirection();
				duckFly();
				}
			});	
		}
		else if (duck.flightDirection == 'duck_fly_top_right'){
			var addHeight = 2 * Math.floor(Math.random() * (150));
			var addWidth = 2 * Math.floor(Math.random() * (50));
			$.when(
				duck.animate({
					'left': '+=' + addWidth,
					'top' : '-=' + addHeight
				}, 1000)
			).then(function(){
				if (parseInt(duck.css('left'))>width || parseInt(duck.css('left'))<0 || parseInt(duck.css('top'))<0 || parseInt(duck.css('top'))>height){
					duckFlyAway(duck);
				}
				else {
				changeDuckDirection();
				duckFly();
				}
			});
		}
	}