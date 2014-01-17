/* 

Code Test for Krossover
Author: Jay Engineer

*/

$(function(){

	/* Digital Time */

	function getTime(){
		var d = new Date(); //initiate the time objects
		var hours = d.getHours(); //get hours
		var mins = d.getMinutes(); //get mins
		var secs = d.getSeconds(); //get seconds
		var timeofday = ''; //for the time of day pm or am

		if(hours > 12){
			timeofday += 'PM'; //if hours greater than 12 than it is pm
		}
		else{
			timeofday += 'AM'; //else it is the morning time
		}

		var actualtime = hours+' : '+mins+' : '+secs+' '+timeofday; //actual time of the day
		
		$('#clock').html(actualtime); //fill out the div
	}

	/* This is for pausing and resuming time */

	function buttons(i){
		$('#pause').click(function() {
			clearInterval(i); //fill in the div with the actual time
			console.log('you clicked pause');
		});
		$('#resume').click(function() {
			var i = setInterval(getTime, 1000); //clear interval
			$('#pause').click(function() {
				//have to recurservly close the interval so now it can't open up again

				clearInterval(i); //fill in the div with the actual time
				console.log('you clicked pause');
			});
			console.log('you clicked resume'); //added interval workings
		});
	}

	/* This is for turning the clock into an alarm */

	function makeSound(){
		var clickSound = new Audio('sounds/Alarm.mp3');
			
		$('#play').click(function(){
			clickSound.play();
		});
		$('#stop').click(function(){
			clickSound.pause();
		});
	}

	function getAlarmTime(){
		$('#settime').click(function(){
			var secs = parseInt($('#seconds').val());
			var clickSound = new Audio('sounds/alarm.mp3');

			var d = String(new Date().getTime() / 1000);
			var currentTime = parseInt(d.split('.'));
			addedTime = secs + currentTime;
			localStorage.setItem('time', addedTime);

			$('.notification').html('Your time has been updated. The Alarm will go off in ' + secs);
			$('.notification').addClass('alert alert-success');

			console.log(addedTime);
		});
	}

	function playAlarm(){
		var clickSound = new Audio('sounds/Alarm.mp3');

		var d = String(new Date().getTime() / 1000);
		var currentTime = parseInt(d.split('.'));
		var alarmtime = localStorage.getItem('time');

		if (alarmtime != null){
			if (currentTime > alarmtime){
				window.localStorage.clear();
				clickSound.play();
			}
		}

		console.log(currentTime);
		console.log(alarmtime);
	}

	function timeLeft(){
		var d = String(new Date().getTime() / 1000);
		var currentTime = parseInt(d.split('.'));
		var alarmtime = localStorage.getItem('time');

		var timeleft = alarmtime - currentTime;

		if(timeleft > 0){
			$('.timeleft').html('Time Left: '+ timeleft);
		}
		else if(timeleft === 0){
			sleep(1000);
			location.reload();
		}
	}

	/* Testing it first on the console to make sure it works */

	function getConsoleTime(){
		var d = new Date();
		var hours = d.getHours();
		var mins = d.getMinutes();
		var secs =d.getSeconds();
		
		console.log(hours+':'+mins+':'+secs);
	}

	//for stopping delaying the one second after the page refreshes

	function sleep(delay) {
	    var start = new Date().getTime();
	    while (new Date().getTime() < start + delay);
    }

	var i = setInterval(getTime, 1000);
	buttons(i);
	makeSound();

	//test

	getAlarmTime();
	playAlarm();
	setInterval(timeLeft, 1000);

});