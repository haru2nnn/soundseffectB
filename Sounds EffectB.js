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
(function(){
  'use strict';

  //htmlのidからデータを取得
  //取得したデータを変数に代入

  var timer = document.getElementById('timer');
  var start = document.getElementById('start');
  var stop = document.getElementById('stop');
  var reset = document.getElementById('reset');

  //クリック時の時間を保持するための変数定義
  var startTime;

  //経過時刻を更新するための変数。 初めはだから0で初期化
  var elapsedTime = 0;

  //タイマーを止めるにはclearTimeoutを使う必要があり、そのためにはclearTimeoutの引数に渡すためのタイマーのidが必要
  var timerId;

  //タイマーをストップ -> 再開させたら0になってしまうのを避けるための変数。
  var timeToadd = 0;


  //ミリ秒の表示ではなく、分とか秒に直すための関数, 他のところからも呼び出すので別関数として作る
  //計算方法として135200ミリ秒経過したとしてそれを分とか秒に直すと -> 02:15:200
  function updateTimetText(){

      //m(分) = 135200 / 60000ミリ秒で割った数の商　-> 2分
      var m = Math.floor(elapsedTime / 60000);

      //s(秒) = 135200 % 60000ミリ秒で / 1000 (ミリ秒なので1000で割ってやる) -> 15秒
      var s = Math.floor(elapsedTime % 60000 / 1000);

      //ms(ミリ秒) = 135200ミリ秒を % 1000ミリ秒で割った数の余り
      var ms = elapsedTime % 1000;


      //HTML 上で表示の際の桁数を固定する　例）3 => 03　、 12 -> 012
      //javascriptでは文字列数列を連結すると文字列になる
      //文字列の末尾2桁を表示したいのでsliceで負の値(-2)引数で渡してやる。
      m = ('0' + m).slice(-2); 
      s = ('0' + s).slice(-2);
      ms = ('0' + ms).slice(-3);

      //HTMLのid　timer部分に表示させる　
      timer.textContent = m + ':' + s + ':' + ms;
  }


  //再帰的に使える用の関数
  function countUp(){

      //timerId変数はsetTimeoutの返り値になるので代入する
      timerId = setTimeout(function(){

          //経過時刻は現在時刻をミリ秒で示すDate.now()からstartを押した時の時刻(startTime)を引く
          elapsedTime = Date.now() - startTime + timeToadd;
          updateTimetText()

          //countUp関数自身を呼ぶことで10ミリ秒毎に以下の計算を始める
          countUp();

      //1秒以下の時間を表示するために10ミリ秒後に始めるよう宣言
      },10);
  }

  //startボタンにクリック時のイベントを追加(タイマースタートイベント)
  start.addEventListener('click',function(){

      //在時刻を示すDate.nowを代入
      startTime = Date.now();

      //再帰的に使えるように関数を作る
      countUp();
  });

  //stopボタンにクリック時のイベントを追加(タイマーストップイベント)
  stop.addEventListener('click',function(){

      //タイマーを止めるにはclearTimeoutを使う必要があり、そのためにはclearTimeoutの引数に渡すためのタイマーのidが必要
     clearTimeout(timerId);


      //タイマーに表示される時間elapsedTimeが現在時刻かたスタートボタンを押した時刻を引いたものなので、
      //タイマーを再開させたら0になってしまう。elapsedTime = Date.now - startTime
      //それを回避するためには過去のスタート時間からストップ時間までの経過時間を足してあげなければならない。elapsedTime = Date.now - startTime + timeToadd (timeToadd = ストップを押した時刻(Date.now)から直近のスタート時刻(startTime)を引く)
     timeToadd += Date.now() - startTime;
  });

  //resetボタンにクリック時のイベントを追加(タイマーリセットイベント)
  reset.addEventListener('click',function(){

      //経過時刻を更新するための変数elapsedTimeを0にしてあげつつ、updateTimetTextで0になったタイムを表示。
      elapsedTime = 0;

      //リセット時に0に初期化したいのでリセットを押した際に0を代入してあげる
      timeToadd = 0;

      //updateTimetTextで0になったタイムを表示
      updateTimetText();

  });
})();




/////////////////////////////////

//////////////キー操作////////////////////////////////
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

  var sounds = document.querySelectorAll("sounds");
  for (var i = 0; i < sounds.length; i++) {
    sounds[i].addEventListener(
      "play",
      function () {
        for (var j = 0; j < sounds.length; j++) {
          if (sounds[j] != this) {
            sounds[j].pause();
          }
        }
      },
      false
    );
  }
  
});





setTimeout("redirect()", 0);
function redirect() {
  //    location.href="https://sites.google.com/nnn.ed.jp/ycp-s-soundeffectbs/maintenance-b";
}
