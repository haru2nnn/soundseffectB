document.getElementById("page-contents").style.display = "none";
document.getElementById("loading").style.display = "block";
document.body.style.overflow = "hidden";
$(function () {
  setTimeout(function () {
    $("#loading").fadeOut();
    setTimeout(() => {
      document.getElementById("page-contents").style.display = "block";
      document.body.style.overflow = "auto";
    }, 400);
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
    console.log(new Date() + "chmanualcd_btn");
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

  function chtestbtn() {
    audioElement.setAttribute('src',"audio/nschime_edit.mp3");
    audioElement.volume = 0.0;
    audioElement.play();
    audioElement.pause();
    audioElement.currentTime = 0;
    audioElement.volume = slider_volume.value;
    console.log(new Date() + "chautoave_success");
    $("#chimetest").fadeIn();
    testbtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    document.getElementById("automsta").innerHTML =
      "チャイムの自動放送を設定しました。";
    btn_play.innerHTML = '<i class="fa-solid fa-bell"></i>チャイムを鳴らす'
    setTimeout(() => {
      $("#chimetest").hide().fadeIn();
      testbtn.innerHTML = '<i class="fa-solid fa-music"></i>';
      document.getElementById("automsta").innerHTML = "";
    }, 3000);
  }

  testbtn.onclick = () => {
    chtestbtn();
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
      console.log(new Date() + "_chmanualcd_key");
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
    if (event.key === "e" && event.ctrlKey) {
      chtestbtn();
    }
  });

  function chime() {
    audioElement.setAttribute('src',"audio/nschime_edit.mp3");
    audioElement.playbackRate = 1.0;
    audioElement.currentTime = 0;
    audioElement.play();
    startTimer();
    /*console.log(new Date()+"_chimelaunched");*/
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


  const perbtn = document.getElementById("statepermission");
  perbtn.onclick = function stpermit() {
    IdleDetector.requestPermission();
  };

  let idleDetector = null,
    controller = null;
  
    if (idleDetector !== null) {
      controller.abort();
      idleDetector = null;
      return;
    }
    try {
      idleDetector = new IdleDetector();
      controller = new AbortController();
      const signal = controller.signal;
      idleDetector.addEventListener("change", () => {
         if (idleDetector.screenState == "unlocked") {
          console.log(new Date() + "_unlocked");
          //nowtime
            nowtime = new Date();
          
          //chimer1
          /*  chimet1 = new Date().setHours(22,00,20);
            fomula1 = chimet1 - nowtime;
            chimer1 = setTimeout(() => {
              if(fomula1 >= 0){
                chime();
              console.log(new Date()+"chimer1_launched")
            }
              document.getElementById("info3").innerHTML = "";
              document.getElementById("timetable").innerHTML = "<時間>";
            },fomula1);*/

            /****************************************************************************************************************/

            function chimemsg(chtt,dearmsg){
              document.getElementById("info3").innerHTML =  dearmsg;
              document.getElementById("timetable").innerHTML = "< "+chtt+"> ";
              document.getElementById("timetable2").innerHTML = "< "+chtt+"> ";
            }
             //chimer1
             chimet1 = new Date().setHours(9,0,0);
             fomula1 = chimet1 - nowtime;
             chimer1 = setTimeout(() => {
               if(fomula1 >= 0){
                 chime();
               console.log(new Date()+"chimer1_launched")
             }
              chimemsg("登校時間","おはようございます！今日も1日よろしくお願いします！")
             },fomula1);
 
            //chimer2
             chimet2 = new Date().setHours(9,30,0);
             fomula2 = chimet2 - nowtime;
             chimer2 = setTimeout(() => {
               if(fomula2 >= 0){
                 chime();
               console.log(new Date()+"chimer2_launched")
             }
             chimemsg("朝礼","おはようございます！今日も1日よろしくお願いします！")
             },fomula2);
 
            //chimer3
             chimet3 = new Date().setHours(9,45,0);
             fomula3 = chimet3 - nowtime;
             chimer3 = setTimeout(() => {
               if(fomula3 >= 0){
                 chime();
               console.log(new Date()+"chimer3_launched")
             }
             chimemsg("1限","")
             },fomula3);
 
            //chimer4
             chimet4 = new Date().setHours(10,35,0);
             fomula4 = chimet4 - nowtime;
             chimer4 = setTimeout(() => {
               if(fomula4 >= 0){
                 chime();
               console.log(new Date()+"chimer4_launched")
             }
             chimemsg("1限→2限休み時間","おはようございます！今日も1日よろしくお願いします！")
             },fomula4);
 
            //chimer5
             chimet5 = new Date().setHours(10,45,0);
             fomula5 = chimet5 - nowtime;
             chimer5 = setTimeout(() => {
               if(fomula5 >= 0){
                 chime();
               console.log(new Date()+"chimer5_launched")
             }
             chimemsg("2限","")
             },fomula5);

             //chimer6
             chimet6 = new Date().setHours(11,35,0);
             fomula6 = chimet6 - nowtime;
             chimer6 = setTimeout(() => {
               if(fomula6 >= 0){
                 chime();
               console.log(new Date()+"chimer6_launched")
             }
             chimemsg("2限→3限休み時間","")
             },fomula6);
 
            //chimer7
             chimet7 = new Date().setHours(11,45,0);
             fomula7 = chimet7 - nowtime;
             chimer7 = setTimeout(() => {
               if(fomula7 >= 0){
                 chime();
               console.log(new Date()+"chimer7_launched")
             }
             chimemsg("3限","")
             },fomula7);
 
            //chimer8
             chimet8 = new Date().setHours(12,35,0);
             fomula8 = chimet8 - nowtime;
             chimer8 = setTimeout(() => {
               if(fomula8 >= 0){
                 chime();
               console.log(new Date()+"chimer8_launched")
             }
             chimemsg("お昼休み","")
             },fomula8);
 
            //chimer9
             chimet9 = new Date().setHours(13,15,0);
             fomula9 = chimet9 - nowtime;
             chimer9 = setTimeout(() => {
               if(fomula9 >= 0){
                 chime();
               console.log(new Date()+"chimer9_launched")
             }
             chimemsg("4限","")
             },fomula9);
 
            //chimer10
             chimet10 = new Date().setHours(14,05,0);
             fomula10 = chimet10 - nowtime;
             chimer10 = setTimeout(() => {
               if(fomula10 >= 0){
                 chime();
               console.log(new Date()+"chimer10_launched")
             }
             chimemsg("4限→5限休み時間","")
             },fomula10);

             //chimer11
             chimet11 = new Date().setHours(14,15,0);
             fomula11 = chimet11 - nowtime;
             chimer11 = setTimeout(() => {
               if(fomula11 >= 0){
                 chime();
               console.log(new Date()+"chimer11_launched")
             }
             chimemsg("5限","")
             },fomula11);
 
            //chimer12
             chimet12 = new Date().setHours(15,05,0);
             fomula12 = chimet12 - nowtime;
             chimer12 = setTimeout(() => {
               if(fomula12 >= 0){
                 chime();
               console.log(new Date()+"chimer12_launched")
             }
             chimemsg("5限→6限休み時間","")
             },fomula12);
 
            //chimer13
             chimet13 = new Date().setHours(15,15,0);
             fomula13 = chimet13 - nowtime;
             chimer13 = setTimeout(() => {
               if(fomula13 >= 0){
                 chime();
               console.log(new Date()+"chimer13_launched")
             }
             chimemsg("6限","")
             },fomula13);
 
            //chimer14
             chimet14 = new Date().setHours(16,05,0);
             fomula14 = chimet14 - nowtime;
             chimer14 = setTimeout(() => {
               if(fomula14 >= 0){
                 chime();
               console.log(new Date()+"chimer14_launched")
             }
             chimemsg("終礼","")
             },fomula14);
 
            //chimer15
             chimet15 = new Date().setHours(16,15,0);
             fomula15 = chimet15 - nowtime;
             chimer = setTimeout(() => {
               if(fomula15 >= 0){
                 chime();
               console.log(new Date()+"chimer15_launched")
             }
             chimemsg("放課後","")
             },fomula15);

             //chimer16
             chimet16 = new Date().setHours(17,30,0);
             fomula16 = chimet16 - nowtime;
             chimer16 = setTimeout(() => {
               if(fomula16 >= 0){
                 chime();
               console.log(new Date()+"chimer16_launched")
             }
             chimemsg("最終下校","")
             },fomula16);
 
            //chimer17__お昼BGM放送Config
             chimet17 = new Date().setHours(12,38,0);
             fomula17 = chimet17 - nowtime;
             chimer17 = setTimeout(() => {
               if(fomula17 >= 0){
                audioElement.setAttribute('src',"audio/bgm/lunchtime.mp3");
                audioElement.play();
                audioElement.loop = true;
                setTimeout(() => {
                  audioElement.loop = false;
                  audioElement.pause();
                  audioElement.setAttribute('src',"audio/nschime_edit.mp3");
                }, new Date().setHours(13,0,0)-new Date());

               console.log(new Date()+"chimer17_lunchbgm_launched")
             }
             chimemsg("お昼休み","")
             },fomula17);
 
            /*//chimer18
             chimet18 = new Date().setHours(22,00,20);
             fomula18 = chimet - nowtime;
             chimer18 = setTimeout(() => {
               if(fomula18 >= 0){
                 chime();
               console.log(new Date()+"chimer18_launched")
             }
             chimemsg("ch18","")
             },fomula18);
 
            //chimer19
             chimet19 = new Date().setHours(22,00,20);
             fomula19 = chimet - nowtime;
             chimer19 = setTimeout(() => {
               if(fomula19 >= 0){
                 chime();
               console.log(new Date()+"chimer19_launched")
             }
             chimemsg("ch19","")
             },fomula19);
 
            //chimer20
             chimet20 = new Date().setHours(22,00,20);
             fomula20 = chimet - nowtime;
             chimer20 = setTimeout(() => {
               if(fomula >= 0){
                 chime();
               console.log(new Date()+"chimer20_launched")
             }
             chimemsg("ch20","")
             },fomula20);*/

/****************************************************************************************************************/
  

          audioElement.pause();
          audioElement.currentTime = 0;
        }
        if (idleDetector.screenState == "locked") {
          console.log(new Date() + "_locked");
          clearTimeout(chimer1);
          clearTimeout(chimer2);
          clearTimeout(chimer3);
          clearTimeout(chimer4);
          clearTimeout(chimer5);
          clearTimeout(chimer6);
          clearTimeout(chimer7);
          clearTimeout(chimer8);
          clearTimeout(chimer9);
          clearTimeout(chimer10);
          clearTimeout(chimer11);
          clearTimeout(chimer12);
          clearTimeout(chimer13);
          clearTimeout(chimer14);
          clearTimeout(chimer15);
          clearTimeout(chimer16);
          clearTimeout(chimer17);
          /*clearTimeout(chimer18);
          clearTimeout(chimer19);
          clearTimeout(chimer20);*/
          console.log(new Date()+"_chimercanceled")
        }
      });
      idleDetector.start({
        threshold: 300000,
        signal,
      });
    } catch (err) {
      console.error(err.name, err.message);
    }

}); //windowdomcon.end

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
