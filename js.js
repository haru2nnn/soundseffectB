document.body.addEventListener("keydown", (event) => {
  if (event.key === "q" && event.ctrlKey) {
    var sounds = new Audio();
    sounds.class = "se";
    sounds.src = "audio/question.mp3";
    sounds.currentTime = 0;
    sounds.play();
  }
  if (event.key === "w" && event.ctrlKey) {
    var sounds = new Audio();
    sounds.src = "audio_o/correct.mp3";
    sounds.currentTime = 0;
    sounds.play();
  }
  if (event.key === "e" && event.ctrlKey) {
    var sounds = new Audio();
    sounds.src = "audio_o/incorrect.mp3";
    sounds.currentTime = 0;
    sounds.play();
  }
  if (event.key === "r" && event.ctrlKey) {
    var sounds = new Audio();
    sounds.src = "audio/drum-japanese2.mp3";
    sounds.currentTime = 0;
    sounds.play();
  }
  if (event.key === "t" && event.ctrlKey) {
    var sounds = new Audio();
    sounds.src = "audio_o/trumpet1.mp3";
    sounds.currentTime = 0;
    sounds.play();
  }
  if (event.key === "y" && event.ctrlKey) {
    var sounds = new Audio();
    sounds.src = "audio_o/trumpet3.mp3";
    sounds.currentTime = 0;
    sounds.play();
  }
  if (event.key === "u" && event.ctrlKey) {
    var sounds = new Audio();
    sounds.src = "audio/dondonpafupafu.mp3";
    sounds.currentTime = 0;
    sounds.play();
  }
  if (event.key === "i" && event.ctrlKey) {
    var sounds = new Audio();
    sounds.src = "audio_o/drumroll.mp3";
    sounds.currentTime = 0;
    sounds.play();
  }
  if (event.key === "a" && event.ctrlKey) {
    var sounds = new Audio();
    sounds.src = "audio/cheerandclap.mp3";
    sounds.currentTime = 0;
    sounds.play();
  }
  if (event.key === "s" && event.ctrlKey) {
    var sounds = new Audio();
    sounds.src = "audio/claping1.mp3";
    sounds.currentTime = 0;
    sounds.play();
  }
  if (event.key === "d" && event.ctrlKey) {
    var sounds = new Audio();
    sounds.src = "audio/everyone_laugh3.mp3";
    sounds.currentTime = 0;
    sounds.play();
  }
  if (event.key === "f" && event.ctrlKey) {
    var sounds = new Audio();
    sounds.src = "audio_o/shock.mp3";
    sounds.currentTime = 0;
    sounds.play();
  }
  if (event.key === "g" && event.ctrlKey) {
    var sounds = new Audio();
    sounds.src = "audio/tin.mp3";
    sounds.currentTime = 0;
    sounds.play();
  }
  if (event.key === "h" && event.ctrlKey) {
    var sounds = new Audio();
    sounds.src = "audio_o/chan-chan1.mp3";
    sounds.currentTime = 0;
    sounds.play();
  }
  if (event.key === "j" && event.ctrlKey) {
    var sounds = new Audio();
    sounds.src = "audio_o/chan-chan2.mp3";
    sounds.currentTime = 0;
    sounds.play();
  }
  if (event.key === "k" && event.ctrlKey) {
    var sounds = new Audio();
    sounds.src = "audio/effect1.mp3";
    sounds.currentTime = 0;
    sounds.play();
  }
  if (event.key === "l" && event.ctrlKey) {
    var sounds = new Audio();
    sounds.src = "audio/effect2.mp3";
    sounds.currentTime = 0;
    sounds.play();
  }
  if (event.key === ";" && event.ctrlKey) {
    var sounds = new Audio();
    sounds.src = "audio/effect3.mp3";
    sounds.currentTime = 0;
    sounds.play();
  }
  if (event.key === "z" && event.ctrlKey) {
    var sounds = new Audio();
    sounds.src = "audio/timer.mp3";
    sounds.currentTime = 0;
    sounds.play();
  }
  if (event.key === "x" && event.ctrlKey) {
    var sounds = new Audio();
    sounds.src = "audio/timer_fast.mp3";
    sounds.currentTime = 0;
    sounds.play();
  }
  if (event.key === "c" && event.ctrlKey) {
    var sounds = new Audio();
    sounds.src = "audio_o/broadcasting-start.mp3";
    sounds.currentTime = 0;
    sounds.play();
  }
  if (event.key === "v" && event.ctrlKey) {
    var sounds = new Audio();
    sounds.src = "audio_o/broadcasting-end.mp3";
    sounds.currentTime = 0;
    sounds.play();
  }
  if (event.key === "b" && event.ctrlKey) {
    var sounds = new Audio();
    var setClass = "se";
    sounds.src = "audio/chime1-1.mp3";
    sounds.currentTime = 0;
    sounds.play();
  }
  if (event.key === "n" && event.ctrlKey) {
    var sounds = new Audio();
    sounds.src = "audio/police-whistle.mp3";
    sounds.currentTime = 0;
    sounds.play();
  }
  if (event.key === "m" && event.ctrlKey) {
    var sounds = new Audio();
    sounds.src = "audio/運命1.mp3";
    sounds.currentTime = 0;
    sounds.play();
  }
  if (event.key === "," && event.ctrlKey) {
    var sounds = new Audio();
    sounds.src = "audio_o/click.mp3";
    sounds.currentTime = 0;
    sounds.play();
  }
  if (event.key === "." && event.ctrlKey) {
    var sounds = new Audio();
    sounds.src = "audio_o/2click1.mp3";
    sounds.currentTime = 0;
    sounds.play();
  }

  if (event.key === "p" && event.ctrlKey) {
    sounds.pause();
  }
});



setTimeout("redirect()", 0);
function redirect() {
  //    location.href="https://sites.google.com/nnn.ed.jp/ycp-s-soundeffectbs/maintenance-b";
}
