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
  const nchtest = document.getElementById("chtester");
  const lcbgmsw = document.getElementById("lunchbgmsw");

  window.onload = function onload() {
    btn_play.style.backgroundColor = "#20b2aa"
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
    btn_play.innerHTML = '<i class="fa-solid fa-bell"></i>チャイムを鳴らす'
    btn_play.style.backgroundColor = "#21276c"
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
    audioElement.setAttribute('src',"audio/nschime_edit.mp3");
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
    document.getElementById("info1").innerHTML = "";
    document.getElementById("info2").innerHTML = "";
    audioElement.setAttribute('src',"audio/nschime_edit.mp3");
    audioElement.volume = 0.0;
    audioElement.play();
    setTimeout(() => {
    audioElement.currentTime = 0;
    audioElement.pause();
    audioElement.currentTime = 0;
    audioElement.volume = slider_volume.value;
    console.log(new Date() + "chautoave_success");
    $("#chimetest").fadeIn();
    testbtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    document.getElementById("automsta").innerHTML = "チャイムの自動放送を設定しました。";
    btn_play.style.backgroundColor = "#21276c";
    btn_play.innerHTML = '<i class="fa-solid fa-bell"></i>チャイムを鳴らす'
    setTimeout(() => {
      $("#chimetest").hide().fadeIn();
      testbtn.innerHTML = '<i class="fa-solid fa-music"></i><br><span class="btndisc">自動設定</span>';
      document.getElementById("automsta").innerHTML = "";
    }, 3000);
    }, 50);
  }

  testbtn.onclick = () => {
    chtestbtn();
  };



  nchtest.onclick = ()=>{
    document.getElementById("info1").innerHTML = "";
    document.getElementById("info2").innerHTML = "";
    audioElement.playbackRate = 1.0;
    audioElement.currentTime = 0;
    chime("nchime","テスト音源")
    btn_play.style.backgroundColor = "#21276c";
    btn_play.innerHTML = '<i class="fa-solid fa-bell"></i>チャイムを鳴らす'
    $("#chimetest").fadeIn();
    testbtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    document.getElementById("automsta").innerHTML = "チャイムの自動放送を設定しました。";
    setTimeout(() => {
      $("#chimetest").hide().fadeIn();
      testbtn.innerHTML = '<i class="fa-solid fa-music"></i><br><span class="btndisc">自動設定</span>';
      document.getElementById("automsta").innerHTML = "";
    }, 3000);
    startTimer();
    audioElement.onended = ()=>{
      audioElement.setAttribute('src',"audio/nschime_edit.mp3");
      document.getElementById("info1").innerHTML = "";
      document.getElementById("info2").innerHTML = "";
    }
  } 

  lcbgmsw.onclick = ()=>{
      document.getElementById("info1").innerHTML = "";
      document.getElementById("info2").innerHTML = "";
      chime("/bgm/lunchtime_ev2","お昼BGM")
      audioElement.loop = true;
      setTimeout(() => {
        audioElement.loop = false;
        audioElement.pause();
        document.getElementById('info2').innerHTML = ""
        audioElement.setAttribute('src',"audio/nschime_edit.mp3");
      }, new Date().setHours(13,00,0)-new Date());
  console.log(new Date()+"chimer17_lunchbgm_mnlaunched")
  }

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
      btn_play.innerHTML = '<i class="fa-solid fa-bell"></i>チャイムを鳴らす'
      btn_play.style.backgroundColor = "#21276c"
      audioElement.play();
      startTimer();
      document.getElementById("info1").innerHTML = "チャイム手動放送中";
      console.log(new Date() + "_chmanualcd_key");
    }
    if (event.key === "s" && event.ctrlKey) {
      audioElement.setAttribute('src',"audio/nschime_edit.mp3");
      audioElement.pause();
      audioElement.currentTime = 0;
      document.getElementById("info1").innerHTML = "";
      document.getElementById("info2").innerHTML = "";
      stopTimer();
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
    }if (event.key === "t" && event.ctrlKey) {
      document.getElementById("info1").innerHTML = "";
      document.getElementById("info2").innerHTML = "";
      audioElement.playbackRate = 1.0;
      audioElement.currentTime = 0;
      chime("nchime","テスト音源")
      btn_play.style.backgroundColor = "#21276c";
      btn_play.innerHTML = '<i class="fa-solid fa-bell"></i>チャイムを鳴らす'
      $("#chimetest").fadeIn();
      testbtn.innerHTML = '<i class="fa-solid fa-check"></i>';
      document.getElementById("automsta").innerHTML = "チャイムの自動放送を設定しました。";
      setTimeout(() => {
        $("#chimetest").hide().fadeIn();
        testbtn.innerHTML = '<i class="fa-solid fa-music"></i>';
        document.getElementById("automsta").innerHTML = "";
      }, 3000);
      startTimer();
      audioElement.onended = ()=>{
        audioElement.setAttribute('src',"audio/nschime_edit.mp3");
        document.getElementById("info1").innerHTML = "";
        document.getElementById("info2").innerHTML = "";
      }
    }if (event.key === "r" && event.ctrlKey) {
      document.getElementById("info1").innerHTML = "";
      document.getElementById("info2").innerHTML = "";
      chime("/bgm/lunchtime_ev2","お昼BGM")
      audioElement.loop = true;
      setTimeout(() => {
        audioElement.loop = false;
        audioElement.pause();
        document.getElementById('info2').innerHTML = ""
        audioElement.setAttribute('src',"audio/nschime_edit.mp3");
      }, new Date().setHours(13,00,0)-new Date());
    }if (event.key === "y" && event.ctrlKey) {
      document.getElementById("info1").innerHTML = "";
      document.getElementById("info2").innerHTML = "";
      chime("/bgm/lunchtime_ev2","お昼BGM")
      audioElement.loop = true;
    }
  });

  function chime(direc,genre) {
    if(direc){
      audioElement.setAttribute('src',"audio/"+direc+".mp3"); 
    }else{
      audioElement.setAttribute('src',"audio/nschime_edit.mp3");
    }
    audioElement.loop = false;
    audioElement.playbackRate = 1.0;
    audioElement.currentTime = 0;
    audioElement.play();
    btn_play.style.backgroundColor = "#21276c";
    btn_play.innerHTML = '<i class="fa-solid fa-bell"></i>チャイムを鳴らす'
    startTimer();
    /*console.log(new Date()+"_chimelaunched");*/
    
   if(genre){
    document.getElementById("info2").innerHTML = genre+"自動放送中";
    }
    else{
      document.getElementById("info2").innerHTML = "チャイム自動放送中";
    }
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
  perbtn.onclick = async function stpermit() {
      var reqpermission = await IdleDetector.requestPermission();
      if(reqpermission=="granted"){
        alert("チャイムの自動放送許可設定が完了しました。\n自動でページを再読み込みします。\nしばらくお待ちください。")
        window.location.reload();
      }else if(reqpermission =="denied"){
        alert("チャイムの自動放送許可設定が正常に完了しませんでした。デバイスのアクティブ状態の「許可」を押してください。")
      }
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
             fomula1 = new Date().setHours(9,0,0) - new Date();
             chimer1 = setTimeout(() => {
               if(fomula1 >= 0){
                 chime();
               console.log(new Date()+"chimer1_launched")
             }
              chimemsg("登校時間","おはようございます！今日も1日よろしくお願いします！")
             },fomula1);
 
            //chimer2
             fomula2 = new Date().setHours(9,30,0) - new Date();
             chimer2 = setTimeout(() => {
               if(fomula2 >= 0){
                 chime();
               console.log(new Date()+"chimer2_launched")
             }
             chimemsg("朝礼","おはようございます！今日も1日よろしくお願いします！")
             },fomula2);
 
            //chimer3
             fomula3 = new Date().setHours(9,45,0) - new Date();
             chimer3 = setTimeout(() => {
               if(fomula3 >= 0){
                 chime();
               console.log(new Date()+"chimer3_launched")
             }
             chimemsg("1限","")
             },fomula3);
 
            //chimer4
             fomula4 = new Date().setHours(10,35,0) - new Date();
             chimer4 = setTimeout(() => {
               if(fomula4 >= 0){
                 chime();
               console.log(new Date()+"chimer4_launched")
             }
             chimemsg("1限→2限休み時間","")
             },fomula4);
 
            //chimer5
             fomula5 = new Date().setHours(10,45,0) - new Date();
             chimer5 = setTimeout(() => {
               if(fomula5 >= 0){
                 chime();
               console.log(new Date()+"chimer5_launched")
             }
             chimemsg("2限","")
             },fomula5);

             //chimer6
             fomula6 = new Date().setHours(11,35,0) - new Date();
             chimer6 = setTimeout(() => {
               if(fomula6 >= 0){
                 chime();
               console.log(new Date()+"chimer6_launched")
             }
             chimemsg("2限→3限休み時間","")
             },fomula6);
 
            //chimer7
             fomula7 = new Date().setHours(11,45,0) - new Date();
             chimer7 = setTimeout(() => {
               if(fomula7 >= 0){
                 chime();
               console.log(new Date()+"chimer7_launched")
             }
             chimemsg("3限","")
             },fomula7);
 
            //chimer8
             fomula8 = new Date().setHours(12,35,0) - new Date();
             chimer8 = setTimeout(() => {
               if(fomula8 >= 0){
                 chime();
               console.log(new Date()+"chimer8_launched")
             }
             chimemsg("お昼休み","午前中お疲れ様でした！")
             },fomula8);

             //chimer17__お昼BGM放送Config
             fomula17 = new Date().setHours(12,37,30) - new Date();
             chimer17 = setTimeout(() => {
               if(fomula17 >= 0){
                chime("/bgm/lunchtime","お昼BGM")
                audioElement.loop = true;
                setTimeout(() => {
                  audioElement.loop = false;
                  audioElement.pause();
                  document.getElementById('info2').innerHTML = ""
                  audioElement.setAttribute('src',"audio/nschime_edit.mp3");
                }, new Date().setHours(13,00,0)-new Date());
               console.log(new Date()+"chimer17_lunchbgm_launched")
             }
             chimemsg("お昼休み","")
             },fomula17);
 
            //chimer9
             fomula9 = new Date().setHours(13,15,0) - new Date();
             chimer9 = setTimeout(() => {
               if(fomula9 >= 0){
                 chime();
               console.log(new Date()+"chimer9_launched")
             }
             chimemsg("4限","午後もよろしくお願いします！")
             },fomula9);
 
            //chimer10
             fomula10 = new Date().setHours(14,05,0) - new Date();
             chimer10 = setTimeout(() => {
               if(fomula10 >= 0){
                 chime();
               console.log(new Date()+"chimer10_launched")
             }
             chimemsg("4限→5限休み時間","")
             },fomula10);

             //chimer11
             fomula11 = new Date().setHours(14,15,0) - new Date();
             chimer11 = setTimeout(() => {
               if(fomula11 >= 0){
                 chime();
               console.log(new Date()+"chimer11_launched")
             }
             chimemsg("5限","")
             },fomula11);

             /*//on Tuesday
             var st = new SelfTimer(new Date());
             if( st.on().Tuesday() ) {
              // callback
              //chimer18
              fomula18 = new Date().setHours(14,35,0) - new Date();
              chimer18 = setTimeout(() => {
                if(fomula18 >= 0){
                  chime("dora_e","Nゼミ終了のどら");
                console.log(new Date()+"chimer18_Nzemi-dora_launched")
              }
              chimemsg("5限","")
              },fomula18);
            }*/

 
            //chimer12
             fomula12 = new Date().setHours(15,05,0) - new Date();
             chimer12 = setTimeout(() => {
               if(fomula12 >= 0){
                 chime();
               console.log(new Date()+"chimer12_launched")
             }
             chimemsg("5限→6限休み時間","")
             },fomula12);
 
            //chimer13
             fomula13 = new Date().setHours(15,15,0) - new Date();
             chimer13 = setTimeout(() => {
               if(fomula13 >= 0){
                 chime();
               console.log(new Date()+"chimer13_launched")
             }
             chimemsg("6限","")
             },fomula13);
 
            //chimer14
             fomula14 = new Date().setHours(16,05,0) - new Date();
             chimer14 = setTimeout(() => {
               if(fomula14 >= 0){
                 chime();
               console.log(new Date()+"chimer14_launched")
             }
             chimemsg("終礼","午後もお疲れ様でした！<br>本日もチャイムシステムをご利用いただきありがとうございます！")
             },fomula14);
 
            //chimer15
             fomula15 = new Date().setHours(16,15,0) - new Date();
             chimer15 = setTimeout(() => {
               if(fomula15 >= 0){
                 chime();
               console.log(new Date()+"chimer15_launched")
             }
             chimemsg("放課後","午後もお疲れ様でした！<br>本日もチャイムシステムをご利用いただきありがとうございます！")
             },fomula15);

             //chimer16
             fomula16 = new Date().setHours(17,30,0) - new Date();
             chimer16 = setTimeout(() => {
               if(fomula16 >= 0){
                 chime();
               console.log(new Date()+"chimer16_launched")
             }
             chimemsg("","")
             },fomula16);
 
            
            
             /*//chimertest
             fomulate = new Date().setHours(13,41,10) - new Date();
             chimerte = setTimeout(() => {
               if(fomulate >= 0){
                 chime();
               console.log(new Date()+"-"+new Date().getMilliseconds()+"_chimerte_launched")
             }
             chimemsg("Late1","")
             },fomulate);

             //chimertest2
             fomulate2 = new Date().setHours(13,41,30) - new Date();
             chimerte2 = setTimeout(() => {
               if(fomulate2 >= 0){
                 chime();
               console.log(new Date()+"-"+new Date().getMilliseconds()+"_chimerte2_launched")
             }
             chimemsg("Late2","")
             },fomulate2);

             setTimeout(() => {
               chime();
               console.log(new Date()+"-"+new Date().getMilliseconds()+"_chimertestn3_launched")
             },new Date().setHours(13,42,0) - new Date());*/
 
            /*
            //chimer19
             chimet19 = new Date().setHours(22,00,20);
             nowtime19 = new Date();
             fomula19 = chimet - nowtime19;
             chimer19 = setTimeout(() => {
               if(fomula19 >= 0){
                 chime();
               console.log(new Date()+"chimer19_launched")
             }
             chimemsg("ch19","")
             },fomula19);
 
            //chimer20
             chimet20 = new Date().setHours(22,00,20);
             nowtime20 = new Date();
             fomula20 = chimet - nowtime20;
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
          /*var st = new SelfTimer(new Date());
          if( st.on().Tuesday() ) {
           // callback
          clearTimeout(chimer18);
          }*/
          /*clearTimeout(chimer19);
          clearTimeout(chimer20);*/

          /*clearTimeout(chimerte);
          clearTimeout(chimerte2);*/
          console.log(new Date()+"_chimercanceled")
        }
      });
      idleDetector.start({
        threshold: 86400000,
        signal,
      }
      ).catch(err => {alert(`【自動放送許可設定エラー】\n自動放送の許可設定が完了していないか、未対応の環境です。\n設定を確認してください。\nまた、こちらのページはシークレットタブには対応していませんので、\nページ下部のボタンから対応しているバージョンをご使用ください。\nページ下部のマニュアルを参照して設定を完了してください。`);
      document.getElementById("chautostatus").innerHTML="未設定";
      document.getElementById("chastt").style.color="#c71585"
      throw new Error(err);})
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
if (windowWidth > windowSm) {
  $(function () {
    // 変数に要素を入れる
    var open = $(".timermd"),
      close = $(".timer-modal-close"),
      container = $(".timer-modal-container");

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
      if (!$(e.target).closest(".timer-modal-body").length) {
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