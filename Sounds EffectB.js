// グローバル変数
var Sounds = {
  flag: {},
  currentTime: null,
};
const SetSoundVolome = (id) => {
  const VolomeSize = document.querySelector("#SoundVolome").value / 100;
  // debugger;
  document.getElementById(id).volume = VolomeSize;
};

// 即時関数
(function seplay () {
  // 設定
  var setClass = "sounds"; // ボタン要素のクラス名
  var setDir = "./"; // 音声ファイルがあるフォルダ(最後は[/])
  var setStopButtonId = "stop-button"; // 停止ボタンに付けるID

  // クラス名が付いた要素を取得する
  var sounds = document.getElementsByClassName(setClass);

  // 全ての要素にクリックイベントを設定する
  for (var i = 0, l = sounds.length; l > i; i++) {
    // クリックイベントの設定
    sounds[i].onclick = function () {
      // ファイル名の取得
      var file = this.getAttribute("data-file");

      // 一度生成したエレメントは生成しない
      if (typeof Sounds.flag[file] == "undefined" || Sounds.flag[file] != 1) {
        // 生成するエレメントの調整
        var audio = document.createElement("audio");

        // エレメントのIDを指定
        audio.id = file;

        // ブラウザが[.mp3]に対応している場合は[.mp3]を読み込む
        if (audio.canPlayType("audio/mp3")) {
          audio.src = setDir + file + ".mp3";
        }

        // [audio]を生成する
        document.body.appendChild(audio);
      }

      // 初回再生以外だったら音声ファイルを巻き戻す
      stopCurrentSound();
      SetSoundVolome(file);

      // 音声ファイルを再生[play()]する
      document.getElementById(file).play();
      // debugger;

      // 最近再生した音声としてセット
      Sounds.currentTime = file;

      // 初回再生が終わった判定用に[Sounds.flag]の値を0から1に変更する
      // エレメントを何度も生成しないようにするため
      Sounds.flag[file] = 1;

      // 終了
      return false;
    };
  }

  // 前回の音声を停止する関数
  function stopCurrentSound() {
    var currentSound = document.getElementById(Sounds.currentTime);

    if (currentSound != null) {
      currentSound.pause();
      currentSound.currentTime = 0;
    }
  }

  // 停止ボタンをクリックした時のイベント
  document.getElementById(setStopButtonId).onclick = function () {
    stopCurrentSound();
    return false;
  };
  document.body.addEventListener("keydown", (event) => {
    if (event.key === "n" && event.ctrlKey) {
      file = "audio/nschime"
      seplay(file);
    }
  });
  function sekeyplay() {
    file = "audio/nschime"
    seplay();
  };

})();



var audios = document.querySelectorAll("audio");
for (var i = 0; i < audios.length; i++) {
  audios[i].addEventListener(
    "play",
    function () {
      for (var j = 0; j < audios.length; j++) {
        if (audios[j] != this) {
          audios[j].pause();
        }
      }
    },
    false
  );
}

////////////index.htmlから移行///////////////////

///////////////時計の時間部分スクリプト////////////////
function twoDigit(num) {
  let ret;
  if (num < 10) ret = "0" + num;
  else ret = num;
  return ret;
}
function showClock() {
  let nowTime = new Date();
  let nowHour = twoDigit(nowTime.getHours());
  let nowMin = twoDigit(nowTime.getMinutes());
  let nowSec = twoDigit(nowTime.getSeconds());
  let msg = nowHour + ":" + nowMin + ":" + nowSec;
  document.getElementById("realtime").innerHTML = msg;
}
setInterval("showClock()", 100);
//////////タイマースクリプト(header)/////////////
var timer1; //タイマーを格納する変数（タイマーID）の宣言

//カウントダウン関数を1000ミリ秒毎に呼び出す関数
function cntStart() {
  document.timer.elements[2].disabled = true;
  timer1 = setInterval("countDown()", 100);
}

//タイマー停止関数
function cntStop() {
  document.timer.elements[2].disabled = false;
  clearInterval(timer1);
}

//カウントダウン関数
function countDown() {
  var min = document.timer.elements[0].value;
  var sec = document.timer.elements[1].value;

  if (min == "" && sec == "") {
    alert("時間を設定してください！");
    reSet();
  } else {
    if (min == "") min = 0;
    min = parseInt(min);

    if (sec == "") sec = 0;
    sec = parseInt(sec);

    tmWrite(min * 60 + sec - 1);
  }
}

//残り時間を書き出す関数
function tmWrite(int) {
  int = parseInt(int);

  //if (int<=0)
  //{
  //reSet();
  //alert("時間です！");
  //}
  if (int <= 0) {
    reSet();
    var Sound = new Audio();
    Sound.src = "audio/chime.mp3";
    Sound.currentTime = 0;
    Sound.play();
  } else {
    //残り分数はintを60で割って切り捨てる
    document.timer.elements[0].value = Math.floor(int / 60);
    //残り秒数はintを60で割った余り
    document.timer.elements[1].value = int % 60;
  }
}

//フォームを初期状態に戻す（リセット）関数
function reSet() {
  document.timer.elements[0].value = "0";
  document.timer.elements[1].value = "0";
  document.timer.elements[2].disabled = false;
  clearInterval(timer1);
}

////////////読み上げスクリプト(header)//////////////

// 読み上げのスクリプト
function lng(prm) {
  lang = prm;
}
function speech() {
  var synthes = new SpeechSynthesisUtterance();
  synthes.volume = form.volume.value / 10;
  synthes.rate = form.rate.value / 10;
  synthes.pitch = form.pitch.value / 10;
  synthes.text = form.text.value;
  synthes.lang = lang;
  synthes.voiceURI = "native";
  speechSynthesis.speak(synthes);
}
function pause() {
  speechSynthesis.pause();
}
function resume() {
  speechSynthesis.resume();
}
function cancel() {
  speechSynthesis.cancel();
}
window.onload = function () {
  ini();
};

//「textarea」にデフォルトで文章をセットしておく場合のサンプル。必要に応じて
function ini() {
  lang = "ja-JP";
  form.text.value = "";
}

//事前に用意した文章をテキストエリアに表示させるスクリプト。必要に応じて

function set(word) {
  form.text.value = word;
}

//用意する文章の、body 内での書き方のサンプル
//<a href="javascript:void(0)" onclick="set('おはよう')">おはよう</a>

///////////////ストップウォッチ////////////////////////
"use strict";
 
window.addEventListener( "DOMContentLoaded" , ()=> {
    /**
     * @param watchCallBack 経過時間報告用コールバック
     * @param wrapCallBack ラップ報告用コールバック
     */
    const getStopWatch = function ( watchCallBack , wrapCallBack ){
        let accumulatedTime = 0,    // 積算時間
            currentTime=null,       // タイマー開示タイムスタンプ
            timerId=null;           // setInterval() の返り値
 
            // リセット処理
        const reset = () =>{
            timerOff(); accumulatedTime = 0; currentTime=null;
                // リセットされたことをnullで通知
            watchCallBack( null ); wrapCallBack ( null );
        };
            // 開始処理
        const start = () =>{ currentTime = Date.now();timerOn(); };
            // 一時停止処理
        const pause = () =>{
                // これまでの経過時間を退避
            accumulatedTime = getNowTime();
            timerOff();
            currentTime = null;
        };
            // 再開処理
        const resume = () =>start();
            // ラップ報告処理
        const wrap = () =>wrapCallBack( getNowTime() );
            // 経過時間の算出
        const getNowTime = () =>accumulatedTime + Date.now() - currentTime;
 
            // タイマー停止処理
        const timerOff = () => {
            if( timerId === null ) return;
            clearInterval(timerId);
            timerId = null;
        };
            // タイマー開始処理
        const timerOn = () => {
            if( timerId !== null ) clearTimeout(timerId);
            timerId = setInterval(()=>watchCallBack( getNowTime() ),10);
        };
 
        reset();
 
            // 必要な機能だけ返す
        return Object.freeze({
            start:()=> currentTime === null && accumulatedTime === 0 ?   start()  : reset(),
            pause:()=> currentTime === null ? ( accumulatedTime === 0 ? false : resume() ) : pause(),
            wrap:()=> currentTime === null ?  false : wrap(),
        });
    };
 
        // ミリ秒を画面表示する形式に変換
    const timeString = time =>`${
        Math.floor(time / 60000).toString().padStart(2,"00")
    }:${
        Math.floor(time % 60000 / 1000).toString().padStart(2,"00")
    }.${
        Math.floor(time % 1000).toString().padStart(3,"000").slice(0,2)
    }`;
 
    const watchArea = document.getElementById("watchArea");
    const wrapArea = document.getElementById("wrapArea");
 
    const stopWatchObj = getStopWatch(
         time => watchArea.textContent = time === null ? "00:00.00" : timeString( time ) ,
         time => wrapArea.value = time === null ? "" : wrapArea.value + "\n" + timeString( time )
    );
 
    const buttonDefine = [
            { id:"start" , listener:()=>stopWatchObj.start() },
            { id:"pause" , listener:()=>stopWatchObj.pause() },
            { id:"wrap"  , listener:()=>stopWatchObj.wrap()  }
        ];
    buttonDefine.forEach( e => document.getElementById(e.id).addEventListener("click",e.listener));
});



function MoveCheck() {
  if( confirm("サイトを開くとチャイム音が鳴る場合があります。音量にご注意ください。") ) {
      window.open(nschimesys.html,'_blank');
  }
}



setTimeout("redirect()", 0);
function redirect() {
  //    location.href="https://sites.google.com/nnn.ed.jp/ycp-s-soundeffectbs/maintenance-b";
}


// YouTube Player APIを読み込む
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//プレイヤー格納
var ytPlayer = [];

// Youtube再生判定用
let ytPlaying, ytStop, ytPlay;
 
// プレーヤーを埋め込む場所:area
// 埋め込むYouTube ID:id
var ytData = [
  {
      id: 'NfQ-GsSyNhc',
      area: 'rupin3rdyt',
      ytWidth:'0',
      ytHeight:'0'
  }, {
      id: 'fxUS4z4ftSs',
      area: 'positiveforceyt',
      ytWidth:'0',
      ytHeight:'0'
  }, {
      id: 'xhOsnY-k8JM',
      area: 'nhighsongyt',
      ytWidth:'0',
      ytHeight:'0'
  }, {
      id: 'Zbtfj1pVamg',
      area: 'shighsongyt',
      ytWidth:'0',
      ytHeight:'0'
  }
];

// 各プレーヤーの埋め込み
function onYouTubeIframeAPIReady() {
  for(var i = 0; i < ytData.length; i++) {
      ytPlayer[i] = new YT.Player(ytData[i]['area'], {
          width: ytData[i]['ytWidth'],
          height: ytData[i]['ytHeight'],
          videoId: ytData[i]['id'],
          playerVars:{
            playsinline: 1,
            //autoplay: 1, // 自動再生
            loop: 1, // ループ有効
            listType: 'playlist', //リスト再生（ループ再生に必要）
            playlist: ytData[i]['id'], // 再生する動画リスト（ループ再生に必要）
            controls: 1, // コントロールバー非表示
            enablejsapi: 1, //JavaScript API 有効
            modestbranding:1,//yutubeロゴの非表示
            iv_load_policy: 3, //動画アノテーションを表示しない
            //disablekb:1, //キーボード操作OFF
            showinfo:0, //動画の再生が始まる前に動画のタイトルなどの情報を表示しない
            rel:0, //再生終了時に関連動画を表示しない
            fs:0, //全画面表示ボタンをオフ
            playsinline:1,//iOS用制御フラグ
          },
          events: {
              'onReady': onPlayerReady
          }
      });
      
  }
}
  
// プレーヤーのサイズを指定
var ytWidth = 560;
var ytHeight = 315;


    const ytpdis= document.getElementById('disytplayer');
    ytpdis.onclick = function ytpdis() {
      var elements = document.getElementsByClassName('youtube');
      for(i=0;i<elements.length;i++){
          elements[i].style.display = "block";
      }
    }

    const ytvol0 = document.getElementById('ytvolume0');
    ytvol0.oninput = function yt0change() {
      var getyt0vol = ytPlayer[0].getVolume();
      ytPlayer[0].setVolume(ytvol0.value);
      document.getElementById('ytvol0dis').innerHTML = ytvol0.value 
    }  
    const ytvol1 = document.getElementById('ytvolume1');
    ytvol1.oninput = function() {
      ytPlayer[1].setVolume(ytvol1.value);
      document.getElementById('ytvol1dis').innerHTML = ytvol1.value 
    }     
    const ytvol2 = document.getElementById('ytvolume2');
    ytvol2.oninput = function() {
      ytPlayer[2].setVolume(ytvol2.value);
      document.getElementById('ytvol2dis').innerHTML = ytvol2.value 
    }  
    const ytvol3 = document.getElementById('ytvolume3');
    ytvol3.oninput = function() {
      ytPlayer[3].setVolume(ytvol3.value);
      document.getElementById('ytvol3dis').innerHTML = ytvol3.value 
    }  

    var vol = document.getElementById('vol');
    vol.addEventListener('click', function () {
        ytPlayer[0].setVolume(10);
        ytvol0.value = 10
        document.getElementById('ytvol0dis').innerHTML = "10" 
    });

    var rupinfo = document.getElementById('rupinfo');
    rupinfo.addEventListener('click',function () {
     const rupinfointerv =  setInterval(() => {
        const ytvol0 = document.getElementById('ytvolume0');
        if (0< ytvol0.value <= 100) {
          ytPlayer[0].setVolume(ytvol0.value -2.5);
          ytvol0.value = ytPlayer[0].getVolume();
        }else {
          clearInterval(rupinfointerv);
          return false;
        } 
        if(ytvol0.value == 0){
          document.getElementById('ytvol0dis').innerHTML = "0"
          ytPlayer[0].pauseVideo();
          clearInterval(rupinfointerv);
          return false;
        } 
        document.getElementById('ytvol0dis').innerHTML = ytvol0.value
      }, 50);
      return false;
    })

    function onPlayerReady(event) {
      var playButton = document.getElementById("ytplay0");
      playButton.addEventListener("click", function rupinplay () {
        ytPlayer[0].playVideo();
        const seekint0 = setInterval(function(){
            seek0();
        },500);
      var pauseButton = document.getElementById("ytpause0");
      pauseButton.addEventListener("click", function () {
        ytPlayer[0].pauseVideo();
        clearInterval(seekint0);
      });
      });

      var playButton = document.getElementById("ytplay1");
      playButton.addEventListener("click", function () {
        ytPlayer[1].playVideo();
      const seekint1 = setInterval(function (){
          seek1();
      },500);
      var pauseButton = document.getElementById("ytpause1");
      pauseButton.addEventListener("click", function () {
        ytPlayer[1].pauseVideo();
        clearInterval(seekint1);
      });
      });


      var playButton = document.getElementById("ytplay2");
      playButton.addEventListener("click", function () {
        ytPlayer[2].playVideo();
        const seekint2 = setInterval(function(){
            seek2();
        },500);
       var pauseButton = document.getElementById("ytpause2");
        pauseButton.addEventListener("click", function () {
        ytPlayer[2].pauseVideo();
        clearInterval(seekint2);
      });
      });
   
      var playButton = document.getElementById("ytplay3");
      playButton.addEventListener("click", function () {
        ytPlayer[3].playVideo();
      const seekint3 = setInterval(function (){
          seek3();
      },500);
      var pauseButton = document.getElementById("ytpause3");
      pauseButton.addEventListener("click", function () {
        ytPlayer[3].pauseVideo();
        clearInterval(seekint3);
      });
      });


      function seek0() {
        var seekbar0 = document.getElementById("ytseekbar0")
        var currentTime0 = ytPlayer[0].getCurrentTime();  // 現在の再生時間取得
        document.getElementById('ytcurrent0dis').innerHTML = convertTime(currentTime0.toFixed()) +""
        document.getElementById('ytseekbar0').setAttribute('max',ytPlayer[0].getDuration())
        seekbar0.value=currentTime0
        seekbar0.oninput = function(){
          ytPlayer[0].seekTo(seekbar0.value);
        }
        document.getElementById('ytdura0dis').innerHTML = convertTime(ytPlayer[0].getDuration());
      }
        function seek1() {
          var seekbar1 = document.getElementById("ytseekbar1")
          var currentTime1 = ytPlayer[1].getCurrentTime();  // 現在の再生時間取得
          document.getElementById('ytcurrent1dis').innerHTML = convertTime(currentTime1.toFixed()) +""
          document.getElementById('ytseekbar1').setAttribute('max',ytPlayer[1].getDuration())
          seekbar1.value=currentTime1
          seekbar1.oninput = function(){
            ytPlayer[1].seekTo(seekbar1.value);
          }
          document.getElementById('ytdura1dis').innerHTML = convertTime(ytPlayer[1].getDuration());
      }
      function seek2() {
        var seekbar2 = document.getElementById("ytseekbar2")
        var currentTime2 = ytPlayer[2].getCurrentTime();  // 現在の再生時間取得
        document.getElementById('ytcurrent2dis').innerHTML = convertTime(currentTime2.toFixed()) +""
        document.getElementById('ytseekbar2').setAttribute('max',ytPlayer[2].getDuration())
        seekbar2.value=currentTime2
        seekbar2.oninput = function(){
          ytPlayer[2].seekTo(seekbar2.value);
        }
        document.getElementById('ytdura2dis').innerHTML = convertTime(ytPlayer[2].getDuration());
      }
        function seek3() {
          var seekbar3 = document.getElementById("ytseekbar3")
          var currentTime3 = ytPlayer[3].getCurrentTime();  // 現在の再生時間取得
          document.getElementById('ytcurrent3dis').innerHTML = convertTime(currentTime3.toFixed()) +""
          document.getElementById('ytseekbar3').setAttribute('max',ytPlayer[3].getDuration())
          seekbar3.value=currentTime3
          seekbar3.oninput = function(){
            ytPlayer[3].seekTo(seekbar3.value);
          }
          document.getElementById('ytdura3dis').innerHTML = convertTime(ytPlayer[3].getDuration());
      }

      			// 再生時間の表記を「mm:ss」に整える
			const convertTime = function(time_position) {
				
				time_position = Math.floor(time_position);
				var res = null;

				if( 60 <= time_position ) {
				res = Math.floor(time_position / 60);
				res += ":" + Math.floor(time_position % 60).toString().padStart( 2, '0');
				} else {
				res = "0:" + Math.floor(time_position % 60).toString().padStart( 2, '0');
				}

				return res;
			};

    }



    $(".toggle").on("click", function() {
      $(".toggle").toggleClass("checked");
      if(!$('input[name="check"]').prop("checked")) {
        $(".toggle input").prop("checked", true);
        document.getElementById('toch_rupin').innerHTML = "ON"
        alert(gudgeres + '\n初期設定はOFFですので、リロードするたびにONにする必要があります。')
        console.log(new Date().setHours(9, 45, 0, 0) - new Date())
      } else {
        $(".toggle input").prop("checked", false);
        document.getElementById('toch_rupin').innerHTML = "OFF"
      }
    });


    setTimeout(() => {
      var WeekChars =["日","月","火","水","木","金","土"];
      var getyoubi = new Date();
      var todayday = getyoubi.getDay();

    if (todayday == 2) {
      if ($(".toggle input").prop("checked", true)){
          ytPlayer[0].playVideo();
          const seekint0 = setInterval(function(){
              seek0();
          },500);
        function seek0() {
          var seekbar0 = document.getElementById("ytseekbar0")
          var currentTime0 = ytPlayer[0].getCurrentTime();  // 現在の再生時間取得
          document.getElementById('ytcurrent0dis').innerHTML = convertTime(currentTime0.toFixed()) +""
          document.getElementById('ytseekbar0').setAttribute('max',ytPlayer[0].getDuration())
          seekbar0.value=currentTime0
          seekbar0.oninput = function(){
            ytPlayer[0].seekTo(seekbar0.value);
          }
          document.getElementById('ytdura0dis').innerHTML = convertTime(ytPlayer[0].getDuration());
        }
        // 再生時間の表記を「mm:ss」に整える
			const convertTime = function(time_position) {
				
				time_position = Math.floor(time_position);
				var res = null;

				if( 60 <= time_position ) {
				res = Math.floor(time_position / 60);
				res += ":" + Math.floor(time_position % 60).toString().padStart( 2, '0');
				} else {
				res = "0:" + Math.floor(time_position % 60).toString().padStart( 2, '0');
				}

				return res;
			};
  }else if($(".toggle input").prop("checked", false)){
    return false;
  }
  }
  }, new Date().setHours(9, 45, 0, 0) - new Date())



/////////////////////////////////
			//初期表示は非表示
			document.getElementById("target").style.display ="block";
			document.getElementById("target2").style.display ="block";
			
			window.onload = function onload () {
        const p2a = document.getElementById("target");
				if (p2a.style.display=="none") {
				modebtn.textContent = "標準表示モードにする";
				}else{
				modebtn.textContent = "シンプル表示モードにする";
				}
			};

			function clickBtn1(){
				const p1 = document.getElementById("target");
				const modebtn= document.getElementById("displaynone");
			
				if(p1.style.display=="none"){
					// noneで非表示
					p1.style.display ="block";

				}else{
					// blockで表示
					p1.style.display ="none";
				}
			}
			function clickBtn2(){
				const p2a = document.getElementById("target1");
				const modebtn= document.getElementById("displaynone");
			
				if(p2a.style.display=="none"){
					// noneで非表示
					p2a.style.display ="block";

				}else{
					// blockで表示
					p2a.style.display ="none";
				}

				const p2b = document.getElementById("target2");
			
				if(p2b.style.display=="none"){
					// noneで非表示
					p2b.style.display ="block";
				}else{
					// blockで表示
					p2b.style.display ="none";
				}

				const p2c = document.getElementById("target3");
			
				if(p2c.style.display=="none"){
					// noneで非表示
					p2c.style.display ="block";
				}else{
					// blockで表示
					p2c.style.display ="none";
				}

        const p2d = document.getElementById("target4");
			
				if(p2d.style.display=="none"){
					// noneで非表示
					p2d.style.display ="block";
				}else{
					// blockで表示
					p2d.style.display ="none";
				}

        const p2e = document.getElementById("target5");
			
				if(p2e.style.display=="none"){
					// noneで非表示
					p2e.style.display ="block";
				}else{
					// blockで表示
					p2e.style.display ="none";
				}

        const p2f = document.getElementById("target6");
			
				if(p2f.style.display=="none"){
					// noneで非表示
					p2f.style.display ="block";
				}else{
					// blockで表示
					p2f.style.display ="none";
				}

				modebtn.addEventListener('click', () => {
				if (p2a.style.display=="block") {
				modebtn.textContent = "シンプル表示モードにする";
				}else{
				modebtn.textContent = "標準表示モードにする";
				}
			 })
			}
      





      ////////////////////////////////////////
      document.body.addEventListener("keydown", (event) => {
        if (event.key === "q" && event.ctrlKey) {
          var sounds = new Audio();
          sounds.class = "se";
          sounds.src = "audio_o/trumpet1.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
        if (event.key === "w" && event.ctrlKey) {
          var sounds = new Audio();
          sounds.src = "audio_o/trumpet3.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
        if (event.key === "e" && event.ctrlKey) {
          var sounds = new Audio();
          sounds.src = "audio_o/dora.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
        if (event.key === "r" && event.ctrlKey) {
          var sounds = new Audio();
          sounds.src = "audio/小鼓.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
        if (event.key === "t" && event.ctrlKey) {
          var sounds = new Audio();
          sounds.src = "audio/drum-japanese2.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
        if (event.key === "y" && event.ctrlKey) {
          var sounds = new Audio();
          sounds.src = "audio/運命1.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
        if (event.key === "u" && event.ctrlKey) {
          var sounds = new Audio();
          sounds.src = "audio/shock.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
        if (event.key === "i" && event.ctrlKey) {
          var sounds = new Audio();
          sounds.src = "audio/tin.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
        if (event.key === "o" && event.ctrlKey) {
          var sounds = new Audio();
          sounds.src = "audio_o/chan-chan1.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
        if (event.key === "p" && event.ctrlKey) {
          var sounds = new Audio();
          sounds.src = "audio_o/chan-chan2.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
        if (event.key === "a" && event.ctrlKey) {
          var sounds = new Audio();
          sounds.src = "audio_o/drumroll.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
        if (event.key === "s" && event.ctrlKey) {
          var sounds = new Audio();
          sounds.src = "audio/cheerandclap.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
        if (event.key === "d" && event.ctrlKey) {
          var sounds = new Audio();
          sounds.src = "audio/claping1.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
        if (event.key === "f" && event.ctrlKey) {
          var sounds = new Audio();
          sounds.src = "audio/everyone_laugh3.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
        if (event.key === "g" && event.ctrlKey) {
          var sounds = new Audio();
          sounds.src = "audio/dondonpafupafu.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
        if (event.key === "h" && event.ctrlKey) {
          var sounds = new Audio();
          sounds.src = "audio/police-whistle.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
        if (event.key === "j" && event.ctrlKey) {
          var sounds = new Audio();
          sounds.src = "audio/shakine.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
        if (event.key === "k" && event.ctrlKey) {
          var sounds = new Audio();
          sounds.src = "audio/jyan.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
        if (event.key === "l" && event.ctrlKey) {
          var sounds = new Audio();
          sounds.src = "audio/effect1.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
        if (event.key === ";" && event.ctrlKey) {
          var sounds = new Audio();
          sounds.src = "audio/effect2.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
        if (event.key === ":" && event.ctrlKey) {
          var sounds = new Audio();
          sounds.src = "audio/effect3.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
        if (event.key === "z" && event.ctrlKey) {
          var sounds = new Audio();
          sounds.src = "audio/question.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
        if (event.key === "x" && event.ctrlKey) {
          var sounds = new Audio();
          sounds.src = "audio_o/correct.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
        if (event.key === "c" && event.ctrlKey) {
          var sounds = new Audio();
          sounds.src = "audio_o/incorrect.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
        if (event.key === "v" && event.ctrlKey) {
          var sounds = new Audio();
          sounds.src = "audio/timer.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
        if (event.key === "b" && event.ctrlKey) {
          var sounds = new Audio();
          var setClass = "se";
          sounds.src = "audio/timer_fast.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
        if (event.key === "n" && event.ctrlKey) {
          var sounds = new Audio();
          sounds.src = "audio/nschime.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
        if (event.key === "m" && event.ctrlKey) {
          var sounds = new Audio();
          sounds.src = "audio/chime1-1.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
        if (event.key === "," && event.ctrlKey) {
          var sounds = new Audio();
          sounds.src = "audio_o/anouncement-before.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
        if (event.key === "." && event.ctrlKey) {
          var sounds = new Audio();
          sounds.src = "audio_o/anouncement-after.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
        if (event.key === "/" && event.ctrlKey) {
          var sounds = new Audio();
          sounds.src = "audio_o/click.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
        if (event.key === "_" && event.ctrlKey) {
          var sounds = new Audio();
          sounds.src = "audio_o/2click.mp3";
          sounds.currentTime = 0;
          sounds.play();
        }
      
      
      });
      



      const audioselecter = document.getElementById('audioselect')
      window.onload = function () {
        const audioselecter = document.getElementById('audioselect')
        
        audioselecter.onchange = function tagchange(){
          var audiocode = '<audio id="selectedaudio" controls loop preload="metadata" controlslist="nodownload">'+
          '<source src="audio/bgm/'+ '" type="audio/mp3"/>' + '</audio>';
            console.log(audioselecter.value);
            const setaudiofile = audioselecter.value;
            const setaudioname = audioselecter.options[audioselecter.selectedIndex].textContent;
            var audiocode = '<audio id="selectedaudio" controls loop preload="metadata" controlslist="nodownload">'+
            '<source src="audio/bgm/'+ setaudiofile + '" type="audio/mp3"/>' + '</audio>';
            const audioElement = document.getElementById("selectedaudio");
            document.getElementById('audiocontainer').innerHTML = audiocode;
            document.getElementById('audiotitle').innerHTML = setaudioname;
 /*           changedis();
            function changedis(){

            }*/
            } 
        };



        window.addEventListener( "DOMContentLoaded",function ctrlaudio(){

          /*const btn_play = document.getElementById("btn_play");
          const btn_pause = document.getElementById("btn_pause");*/
          const btn_eject = document.getElementById("btn_eject")
          const playback_position = document.getElementById("playback_position");
          const end_position = document.getElementById("end_position");
          const slider_progress = document.getElementById("progress");
          const btn_mute = document.getElementById("btn_mute");
          const slider_volume = document.getElementById("volume");
          const audioElement = document.getElementById("selectedaudio");
        

          // ボリュームの初期設定
          audioElement.volume = slider_volume.value;

          /*btn_play.addEventListener("click", e => {
            audioElement.play();
          });

          btn_pause.addEventListener("click", e => {
            audioElement.pause();
          });*/
          btn_eject.addEventListener("click", e => {
            audioElement.pause();
            audioElement.currentTime = 0;
            audioselecter.selectedIndex = 0;
            const audiocode = '<audio id="selectedaudio" controls loop preload="metadata" controlslist="nodownload">'+
            '<source src="'+'"' + ' type="audio/mp3"/>' + '</audio>';
            document.getElementById('audiocontainer').innerHTML = audiocode;
            document.getElementById('audiotitle').innerHTML = "BGMを選択してください。";
            playback_position.textContent = convertTime(0);
            end_position.textContent =convertTime(0);
          });

          btn_mute.addEventListener("click", e => {

            if( audioElement.muted ) {
              audioElement.muted = false;
              btn_mute.textContent = "消音";
            } else {
              audioElement.muted = true;
              btn_mute.textContent = "消音解除";
            }
          });

          slider_volume.addEventListener("input", e => {
            audioElement.volume = slider_volume.value;
          });

          var playtimer = null;
        
          // 再生開始したときに実行
          const startTimer = function(){
            playtimer = setInterval(function(){
              playback_position.textContent = convertTime(audioElement.currentTime);
              slider_progress.value = Math.floor( (audioElement.currentTime / audioElement.duration) * audioElement.duration);
            }, 500);
          };
        
          // 停止したときに実行
          const stopTimer = function(){
            clearInterval(playtimer);
            playback_position.textContent = convertTime(audioElement.currentTime);
          };
        
          // 再生時間の表記を「mm:ss」に整える
          const convertTime = function(time_position) {
            
            time_position = Math.floor(time_position);
            var res = null;
        
            if( 60 <= time_position ) {
              res = Math.floor(time_position / 60);
              res += ":" + Math.floor(time_position % 60).toString().padStart( 2, '0');
            } else {
              res = "0:" + Math.floor(time_position % 60).toString().padStart( 2, '0');
            }
        
            return res;
          };
        
          // 音声ファイルの再生準備が整ったときに実行
          audioElement.addEventListener('loadeddata', (e)=> {
            slider_progress.max = audioElement.duration;
        
            playback_position.textContent = convertTime(audioElement.currentTime);
            end_position.textContent = convertTime(audioElement.duration);
          });
        
          // 音声ファイルが最後まで再生されたときに実行
          audioElement.addEventListener("ended", e => {
            stopTimer();
          });
        
         /* // 再生ボタンが押されたときに実行
          btn_play.addEventListener("click", e => {
            audioElement.play();
            startTimer();
          });
        
          // 一時停止ボタンが押されたときに実行
          btn_pause.addEventListener("click", e => {
            audioElement.pause();
            stopTimer();
          });*/
        
          // プログレスバーが操作されたときに実行（メモリを動かしているとき）
          slider_progress.addEventListener("input", e => {
            stopTimer();
            audioElement.currentTime = slider_progress.value;
          });
        
          // プログレスバーが操作完了したときに実行
          slider_progress.addEventListener("change", e => {
            startTimer();
          });
        
        });
        