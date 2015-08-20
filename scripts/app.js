window.addEventListener('load',function () {

	audio = document.getElementById('audio');
	
	playTime = document.getElementById('play-time');
	
	playlist = document.getElementById('playlist');

	progressContainer = document.getElementById('progress-container');
	progress = document.getElementById('progress');
	progressContainer.addEventListener('click', setTime, false);

	volumeContainer = document.getElementById('volume-container');
	volum = document.getElementById('volume');
	volumeContainer.addEventListener('click', setVolume, false);

	btnPlay = document.getElementById('btn-play');	
	btnPlay.addEventListener('click', playOrPause, false);

	btnList = document.getElementById('btn-playlist');	
	btnList.addEventListener('click', function () {
		playlist.style.visibility = (playlist.style.visibility==='visible')?'collapse':'visible';
	}, false);

	btnUpdate = document.getElementById('btn-update');	
	btnUpdate.addEventListener('click', scanFolder, false);

});

function playOrPause (evt) {
	if(audio.paused){		
		audio.play();
		btnPlay.innerHTML ='pause';
		update = setInterval(updateProgress, 30);
		
	} else {
		audio.pause();
		btnPlay.innerHTML ='play';
		window.clearInterval(update);
	}
}

function updateProgress () {
	var curTime = audio.currentTime;
	var durTime = audio.duration;
	var persentage = (curTime/durTime) * 100;
	progress.style.width = persentage+'%';
	playTime.innerHTML = formTime(curTime) + " / " + formTime(durTime);
	if (audio.ended) {
		window.clearInterval(update);
		btnPlay.innerHTML ='play';
	}
}

function formTime(dtime) {
	var sec = Math.floor(dtime % 60);
	var min = Math.floor(dtime / 60);	
	min = (min<10) ? ('0' + min) : min;
	sec = (sec<10) ? ('0' + sec): ((sec>59) ? '00' : sec);
	return (min + ':' + sec);
}

function setTime (evt) {
	var mouseX = evt.pageX - progressContainer.offsetLeft;
	var width = window.getComputedStyle(progressContainer).getPropertyValue('width');
	width = parseFloat(width.substr(0, width.length-2));
	audio.currentTime = (mouseX/width)*audio.duration;
}

function setVolume (evt) {
	var mouseX = evt.pageX - volumeContainer.offsetLeft;
	var width = window.getComputedStyle(volumeContainer).getPropertyValue('width');
	width = parseFloat(width.substr(0, width.length-2));
	audio.volume = (mouseX/width);
	volum.style.width = (audio.volume*100) +'%';	
}


function scanFolder() {
	
}

