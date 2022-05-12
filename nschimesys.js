document.getElementById("page-contents").style.display = "none";
document.getElementById("loading").style.display = "block";

$(function () {
  setTimeout(function () {
    $("#loading").fadeOut();
    document.getElementById("page-contents").style.display = "block";
  }, 1200);
});

document.addEventListener("DOMContentLoaded", function () {
  const btn_play = document.getElementById("btn_play");
  const btn_pause = document.getElementById("btn_pause");
  const btn_stop = document.getElementById("btn_stop");
  const btn_mute = document.getElementById("btn_mute");
  const slider_volume = document.getElementById("volume");
  const btn_normal = document.getElementById("btn_normal");
  const btn_fast = document.getElementById("btn_fast");
  const audioElement = document.querySelector("audio");
  const btn_slow = document.getElementById("btn_slow");
  const playback_position = document.getElementById("playback_position");
  const end_position = document.getElementById("end_position");
  const slider_progress = document.getElementById("progress");
  const testbtn = document.getElementById("chimetest");

  window.onload = function onload() {
    document.getElementById("info1").innerHTML = "";
    document.getElementById("info2").innerHTML = "";
    //document.getElementById("timetable").innerHTML = "";
    document.getElementById("info3").innerHTML = "";
    const audioElement = document.querySelector("audio");
    audioElement.play();
    audioElement.pause();
    audioElement.currentTime = 0;
  };

  if (window.performance) {
    if (performance.navigation.type === 1) {
      const audioElement = document.querySelector("audio");
      audioElement.pause();
      audioElement.currentTime = 0;
      // リロードされた時に実行したい処理
    }
  }

  // ボリュームの初期設定
  audioElement.volume = slider_volume.value;

  btn_play.addEventListener("click", (e) => {
    audioElement.play();
    startTimer();
    document.getElementById("info1").innerHTML = "チャイム手動放送中";
  });

  audioElement.onended = (event) => {
    audioElement.currentTime = 0;
    document.getElementById("info1").innerHTML = "";
    document.getElementById("info2").innerHTML = "";
    stopTimer();
  };

  btn_pause.addEventListener("click", (e) => {
    audioElement.pause();
    document.getElementById("info1").innerHTML = "";
    stopTimer();
  });

  btn_stop.addEventListener("click", (e) => {
    audioElement.pause();
    audioElement.currentTime = 0;
    document.getElementById("info1").innerHTML = "";
    document.getElementById("info2").innerHTML = "";
    stopTimer();
  });

  btn_mute.addEventListener("click", (e) => {
    if (audioElement.muted) {
      audioElement.muted = false;
      var muteicon = '<i class="fa-solid fa-volume-xmark"></i>';
      btn_mute.innerHTML = muteicon + "消音";
    } else {
      audioElement.muted = true;
      var muteofficon = '<i class="fa-solid fa-volume-high"></i>';
      btn_mute.innerHTML = muteofficon + "消音解除";
    }
  });

  slider_volume.addEventListener("input", (e) => {
    audioElement.volume = slider_volume.value;
    slider_volume.value = audioElement.volume;
  });

  slider_volume.addEventListener("input", (e) => {
    var audiovol = slider_volume.value * 100;
    document.getElementById("audiovolume").innerText = audiovol.toFixed();
  });

  btn_slow.addEventListener("click", (e) => {
    audioElement.playbackRate = 0.8;
    volume.value = audioElement.playbackRate;
    speedchange();
  });

  btn_normal.addEventListener("click", (e) => {
    audioElement.playbackRate = 1.0;
    volume.value = audioElement.playbackRate;
    speedchange();
  });

  btn_fast.addEventListener("click", (e) => {
    audioElement.playbackRate = 1.2;
    volume.value = audioElement.playbackRate;
    speedchange();
  });

  var volume = document.getElementById("input_volume");
  volume.addEventListener("input", function () {
    audioElement.playbackRate = volume.value;
    volume.value = audioElement.playbackRate;
  });
  volume.addEventListener("input", function () {
    var audiospeed = volume.value * 100;
    document.getElementById("audiospeed").innerText =
      "🏃🏻" + audiospeed.toFixed() + "%";
  });
  function speedchange() {
    var audiospeed = volume.value * 100;
    document.getElementById("audiospeed").innerText =
      "🏃🏻" + audiospeed.toFixed() + "%";
  }

  testbtn.onclick = () => {
    audioElement.volume = 0.0;
    audioElement.play();
    audioElement.pause();
    audioElement.currentTime = 0;
    audioElement.volume = slider_volume.value;
    $("#chimetest").fadeIn();
    testbtn.innerHTML = '<i class="fa-solid fa-check"></i>';
	document.getElementById("automsta").innerHTML = "チャイムの自動放送を設定しました。"
    setTimeout(() => {
      $("#chimetest").hide().fadeIn();
      testbtn.innerHTML = '<i class="fa-solid fa-music"></i>';
	  document.getElementById("automsta").innerHTML = ""
    }, 3000);
  };

  var playtimer = null;

  // 再生開始したときに実行
  const startTimer = function () {
    playtimer = setInterval(function () {
      playback_position.textContent = convertTime(audioElement.currentTime);
      slider_progress.value = Math.floor(
        (audioElement.currentTime / audioElement.duration) *
          audioElement.duration +
          1
      );
    }, 100);
  };

  // 停止したときに実行
  const stopTimer = function () {
    clearInterval(playtimer);
    playback_position.textContent = convertTime(audioElement.currentTime);
  };

  // 再生時間の表記を「mm:ss」に整える
  const convertTime = function (time_position) {
    time_position = Math.floor(time_position);
    var res = null;

    if (60 <= time_position) {
      res = Math.floor(time_position / 60);
      res +=
        ":" +
        Math.floor(time_position % 60)
          .toString()
          .padStart(2, "0");
    } else {
      res =
        "0:" +
        Math.floor(time_position % 60)
          .toString()
          .padStart(2, "0");
    }

    return res;
  };

  // 音声ファイルの再生準備が整ったときに実行
  audioElement.addEventListener("loadeddata", (e) => {
    slider_progress.max = audioElement.duration;

    playback_position.textContent = convertTime(audioElement.currentTime);
    end_position.textContent = convertTime(audioElement.duration);
  });

  // プログレスバーが操作されたときに実行（メモリを動かしているとき）
  slider_progress.addEventListener("input", (e) => {
    stopTimer();
    audioElement.currentTime = slider_progress.value;
  });

  // プログレスバーが操作完了したときに実行
  slider_progress.addEventListener("change", (e) => {
    startTimer();
  });

  /*$('#btn_play').on('click', function(){
			$('audio').each(function() {
			}); $(this).prev().currentTime = 0;
			$(this).prev().get(0).play();
			});*/

  document.body.addEventListener("keydown", (event) => {
    /*if (event.key === " " && event.ctrlKey) {
						audioElement.play();
						startTimer();
						document.getElementById("info1").innerHTML = "チャイム手動放送中";
					}*/
    if (event.key === "q" && event.ctrlKey) {
      audioElement.play();
      startTimer();
      document.getElementById("info1").innerHTML = "チャイム手動放送中";
    }
    if (event.key === "s" && event.ctrlKey) {
      audioElement.pause();
      audioElement.currentTime = 0;
      stopTimer();
      document.getElementById("info1").innerHTML = "";
      document.getElementById("info2").innerHTML = "";
    }
    if (event.key === "a" && event.ctrlKey) {
      audioElement.pause();
      stopTimer();
      document.getElementById("info1").innerHTML = "";
    }
    if (event.key === "d" && event.ctrlKey) {
      if (audioElement.muted) {
        audioElement.muted = false;
        var muteicon = '<i class="fa-solid fa-volume-xmark"></i>';
        btn_mute.innerHTML = muteicon + "消音";
      } else {
        audioElement.muted = true;
        var muteofficon = '<i class="fa-solid fa-volume-high"></i>';
        btn_mute.innerHTML = muteofficon + "消音解除";
      }
    }
  });

  function chime() {
    audioElement.playbackRate = 1.0;
    audioElement.currentTime = 0;
    audioElement.play();
    startTimer();
    document.getElementById("info2").innerHTML = "チャイム自動放送中";
  }

  const chsubmit = document.getElementById("chsubmit");
  const ch_hours = document.getElementById("ch_hours");
  const ch_mins = document.getElementById("ch_mins");

  ch_hours.oninput = function () {
    document.getElementById("disch_h").innerHTML = ch_hours.value;
  };
  ch_mins.oninput = function () {
    document.getElementById("disch_m").innerHTML = ch_mins.value;
  };
  chsubmit.addEventListener("click", (e) => {
    alert(ch_hours.value + ":" + ch_mins.value + "にチャイムを設定しました。");
    setTimeout(function () {
      chime();
    }, new Date().setHours(ch_hours.value, ch_mins.value, 0, 0) - new Date());
  });

  /******************************************************************/
	setInterval(() => {
		var nowmin = new Date().getTime();

		/*chimet(15,13,0,"test","test")
		chimet(15,15,0," "," ")*/

		chimet(9,0,0,"登校時間","おはようございます！本日も1日よろしくお願いいたします！")
		chimet(9,30,0,"朝礼","おはようございます！本日も1日よろしくお願いいたします！")
		chimet(9,45,0,"1限","授業開始です！よろしくお願いします！")
		chimet(10,35,0,"1限→2限 休み時間","")
		chimet(10,45,0,"2限","")
		chimet(11,35,0,"2限→3限 休み時間","")
		chimet(11,45,0,"3限","")
		chimet(12,35,0,"お昼休み","午前中、お疲れ様でした！")
		chimet(13,15,0,"4限","午後もよろしくお願いいたします！")
		chimet(14,05,0,"4限→5限 休み時間","")
		chimet(14,15,0,"5限","")
		chimet(15,05,0,"5限→6限 休み時間","")
		chimet(15,15,0,"6限","")
		chimet(16,05,0,"終礼","午後もお疲れ様でした！<br>本日もチャイムシステムをご利用いただきありがとうございます！")
		chimet(16,15,0,"放課後","本日もチャイムシステムをご利用いただきありがとうございます！")
		chimet(17,30,0,"最終下校","")

		/*chimet(5,37,0,"test1","countdown")
		chimet(5,38,0,"test2","countdown")
		chimet(5,39,0,"test3","countdown")
		chimet(5,40,0,"test4","countdown")
		chimet(5,41,0,"test5","countdown")
		chimet(5,42,0,"test6","countdown")
		chimet(5,43,0,"test7","countdown")
		chimet(5,44,0,"test8","countdown")
		chimet(5,45,0,"test9","countdown")*/




		function chimet(seth,setm,sets,tt,msg){
			var nowhour = new Date().setHours(seth,setm,sets);
			var formula= nowhour - nowmin
			var fomula = Math.floor(formula/1000)

			if (fomula == 0) {
				chime();
				document.getElementById("info3").innerHTML =  msg;
				document.getElementById("timetable").innerHTML = "< "+tt+"> ";
				document.getElementById("timetable2").innerHTML = "< "+tt+"> ";
				console.log(new Date()+"_chimelaunched")
				}else if(fomula < 0) {
				document.getElementById("timetable").innerHTML = "< "+tt+"> ";
				document.getElementById("timetable2").innerHTML = "< "+tt+"> ";
			}
			if(fomula > 0 && fomula < 180){
				var cdmin = Math.floor(fomula / 60);
				var cdsec = fomula % 60;
				document.getElementById("ctdwn").innerHTML = "次のチャイムまであと "+cdmin+"分 "+cdsec+"秒";
			}else if(fomula < 0){
				document.getElementById("ctdwn").innerHTML = ""
			}
		}
		
	}, 1000);

});

var windowWidth = $(window).width();
var windowSm = 640;
if (windowWidth > windowSm) {
  $(function () {
    // 変数に要素を入れる
    var open = $(".clock"),
      close = $(".modal-close"),
      container = $(".modal-container");

    //開くボタンをクリックしたらモーダルを表示する
    open.on("click", function () {
      container.addClass("active");
      return false;
    });

    //閉じるボタンをクリックしたらモーダルを閉じる
    close.on("click", function () {
      container.removeClass("active");
    });

    //モーダルの外側をクリックしたらモーダルを閉じる
    $(document).on("click", function (e) {
      if (!$(e.target).closest(".modal-body").length) {
        container.removeClass("active");
      }
    });
  });
} else {
  open.on("click", function () {
    window.alert(
      "画面サイズが" + windowSm + "以下の端末ではこちらの機能は利用できません。"
    );
    return false;
  });
}
