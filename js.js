var music = {
	currentTime: null ,};


document.body.addEventListener('keydown',
event => {
	if (event.key === 'q' && event.ctrlKey) {
		var music = new Audio();
		music.src = "audio/question.mp3";
		music.currentTime = 0;
		music.play();}
	if (event.key === 'w' && event.ctrlKey) {
		var music = new Audio();
		music.src = "audio_o/correct.mp3";
		music.currentTime = 0;
		music.play();}
	if (event.key === 'e' && event.ctrlKey) {
		var music = new Audio();
		music.src = "audio_o/incorrect.mp3";
		music.currentTime = 0;
		music.play();}
	if (event.key === 'r' && event.ctrlKey) {
			var music = new Audio();
			music.src = "audio/drum-japanese2.mp3";
			music.currentTime = 0;
			music.play();}	
	if (event.key === 't' && event.ctrlKey) {
		var music = new Audio();
		music.src = "audio_o/trumpet1.mp3";
		music.currentTime = 0;
		music.play();}
	if (event.key === 'y' && event.ctrlKey) {
		var music = new Audio();
		music.src = "audio_o/trumpet3.mp3";
		music.currentTime = 0;
		music.play();}
	if (event.key === 'u' && event.ctrlKey) {
		var music = new Audio();
		music.src = "audio/dondonpafupafu.mp3";
		music.currentTime = 0;
		music.play();}
	if (event.key === 'i' && event.ctrlKey) {
		var music = new Audio();
		music.src = "audio_o/drumroll.mp3";
		music.currentTime = 0;
		music.play();}
	if (event.key === 'a' && event.ctrlKey) {
		var music = new Audio();
		music.src = "audio/cheerandclap.mp3";
		music.currentTime = 0;
		music.play();}
	if (event.key === 's' && event.ctrlKey) {
		var music = new Audio();
		music.src = "audio/claping1.mp3";
		music.currentTime = 0;
		music.play();}
	if (event.key === 'd' && event.ctrlKey) {
		var music = new Audio();
		music.src = "audio/everyone_laugh3.mp3";
		music.currentTime = 0;
		music.play();}
	if (event.key === 'f' && event.ctrlKey) {
		var music = new Audio();
		music.src = "audio_o/shock.mp3";
		music.currentTime = 0;
		music.play();}
	if (event.key === 'g' && event.ctrlKey) {
		var music = new Audio();
		music.src = "audio/tin.mp3";
		music.currentTime = 0;
		music.play();}
	if (event.key === 'h' && event.ctrlKey) {
		var music = new Audio();
		music.src = "audio_o/chan-chan1.mp3";
		music.currentTime = 0;
		music.play();}
	if (event.key === 'j' && event.ctrlKey) {
		var music = new Audio();
		music.src = "audio_o/chan-chan2.mp3";
		music.currentTime = 0;
		music.play();}
	if (event.key === 'k' && event.ctrlKey) {
		var music = new Audio();
		music.src = "audio/effect1.mp3";
		music.currentTime = 0;
		music.play();}
	if (event.key === 'l' && event.ctrlKey) {
		var music = new Audio();
		music.src = "audio/effect2.mp3";
		music.currentTime = 0;
		music.play();}
	if (event.key === ';' && event.ctrlKey) {
		var music = new Audio();
		music.src = "audio/effect3.mp3";
		music.currentTime = 0;
		music.play();}
	if (event.key === 'z' && event.ctrlKey) {
		var music = new Audio();
		music.src = "audio/timer.mp3";
		music.currentTime = 0;
		music.play();}
	if (event.key === 'x' && event.ctrlKey) {
		var music = new Audio();
		music.src = "audio/timer_fast.mp3";
		music.currentTime = 0;
		music.play();}
	if (event.key === 'c' && event.ctrlKey) {
		var music = new Audio();
		music.src = "audio_o/broadcasting-start.mp3";
		music.currentTime = 0;
		music.play();}
	if (event.key === 'v' && event.ctrlKey) {
		var music = new Audio();
		music.src = "audio_o/broadcasting-end.mp3";
		music.currentTime = 0;
		music.play();}
	if (event.key === 'b' && event.ctrlKey) {
		var music = new Audio();
		music.src = "audio/chime1-1.mp3";
		music.currentTime = 0;
		music.play();}
	if (event.key === 'n' && event.ctrlKey) {
		var music = new Audio();
		music.src = "audio/police-whistle.mp3";
		music.currentTime = 0;
		music.play();}
	if (event.key === 'm' && event.ctrlKey) {
		var music = new Audio();
		music.src = "audio/運命1.mp3";
		music.currentTime = 0;
		music.play();}
	if (event.key === ',' && event.ctrlKey) {
		var music = new Audio();
		music.src = "audio_o/click.mp3";
		music.currentTime = 0;
		music.play();}
	if (event.key === '.' && event.ctrlKey) {
		var music = new Audio();
		music.src = "audio_o/2click1.mp3";
		music.currentTime = 0;
		music.play();}

		if (event.ctrlKey && event.key === 'z') {
			document.getElementById( setStopButtonId ).onclick = function()
			{stopCurrentmusic() ;
			return false ;}
		}
	
		function stopCurrentmusic()
		{
			var currentSound = document.getElementById( music.currentTime ) ;
	
			if( currentSound != null )
			{
				currentSound.pause() ;
				currentSound.currentTime = 0 ;
			}
		}
	
	}

	
);