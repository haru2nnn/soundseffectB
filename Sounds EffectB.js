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
(function () {
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

//////////タイマースクリプト(header)/////////////
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
setInterval("showClock()", 1000);

var timer1; //タイマーを格納する変数（タイマーID）の宣言

//カウントダウン関数を1000ミリ秒毎に呼び出す関数
function cntStart() {
  document.timer.elements[2].disabled = true;
  timer1 = setInterval("countDown()", 1000);
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



setTimeout("redirect()", 0);
function redirect() {
  //    location.href="https://sites.google.com/nnn.ed.jp/ycp-s-soundeffectbs/maintenance-b";
}


// YouTube Player APIを読み込む
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
 
// プレーヤーを埋め込む場所
var ytArea = 'rupin3rdyt';
  
// 埋め込むYouTube ID
var ytID = 'NfQ-GsSyNhc';
  
// プレーヤーのサイズを指定
var ytWidth = 560;
var ytHeight = 315;
  
// API読み込み後にプレーヤー埋め込み
function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player(ytArea, {
        height: ytHeight,
        width: ytWidth,
        videoId: ytID
    });
}
var vol = document.getElementById('vol');
vol.addEventListener('click', function () {
    ytPlayer.setVolume(1);
});