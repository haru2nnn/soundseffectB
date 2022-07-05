document.getElementById("page-contents").style.display = "none";
document.getElementById('loading').style.display="block";

($(function() {
    setTimeout(function() {
	$('#loading').fadeOut();
	document.getElementById('page-contents').style.display="block";
}, 1200);
}));


if(location.hostname=="haru2nnn.github.io"||"localhost" ||location.pathname.match(/Users/&&/haruhito_nnn/)){

}else{
  document.head.remove();
  document.body.remove();
  window.location.replace("about:blank")
}

// initialize
var st = new SelfTimer(new Date());
// non-callback
if( st.on().DatesBetween('2022-7-5', '2022-7-7') )
{ // callback
  var particlesw = document.getElementById("particle");
  particlesw.id="particles-js";
  var tnbtwrap = document.getElementById("wrapper");
  tnbtwrap.id = "tnbtwrapper";
}

/*****FOR TANABATA DESIGN*/
try {
  particlesJS("particles-js", {
	"particles":{
		"number":{
			"value":346,//この数値を変更すると星の数が増減できる
			"density":{
				"enable":true,
				"value_area":800
			}
		},
		"color":{
			"value":"#ffffff"
		},
		"shape":{
			"type":"circle",//形状はcircleを指定
			"stroke":{
				"width":0
			},
			},
		"opacity":{
			"value":1,//シェイプの透明度
			"random":true,//シェイプの透明度をランダムにする
			"anim":{
				"enable":true,//シェイプの透明度をアニメーションさせる
				"speed":3,//シェイプの透明度をアニメーションさせる
				"opacity_min":0,//透明度の最小値０
				"sync":false//全てを同時にアニメーションさせない
			}
		},
		"size":{
			"value":2,
			"random":true,
			"anim":{
				"enable":false,
				"speed":4,
				"size_min":0.3,
				"sync":false
			}
		},
		"line_linked":{
			"enable":false,
		},
		"move":{
			"enable":true,
			"speed":120,//この数値を小さくするとゆっくりな動きになる
		"direction":"none",//方向指定なし
		"random":true,//動きはランダムに
		"straight":true,//動きをとどめる
			"out_mode":"out",
			"bounce":false,
			"attract":{
				"enable":false,
				"rotateX":600,
				"rotateY":600
			}
		}
	},
	"interactivity":{
		"detect_on":"canvas",
		"events":{
			"onhover":{
				"enable":false,
			},
			"onclick":{
				"enable":false,
			},
			"resize":true
		}
	},
	"retina_detect":true
});
} catch (err) {
  console.error(err)
}
/***********************************/

// 即時関数
(function seplay () {
  // 設定
  var setClass = "sounds"; // ボタン要素のクラス名
  var setStopButtonId = "stop-button"; // 停止ボタンに付けるID

  // クラス名が付いた要素を取得する
  var sounds = document.getElementsByClassName(setClass);

  // 全ての要素にクリックイベントを設定する
  for (var i = 0, l = sounds.length; l > i; i++) {
    // クリックイベントの設定
    sounds[i].onclick = function () {
      // ファイル名の取得
      var file = this.getAttribute("data-file");

        // ブラウザが[.mp3]に対応している場合は[.mp3]を読み込む
        var filedir = file + ".mp3";

        seplay(filedir);

      // 終了
      return false;
    };
  }

  // 前回の音声を停止する関数
  function stopCurrentSound() {
    var seplayer =  document.getElementById("seplayer");
    seplayer.pause();
    seplayer.setAttribute("src","");
  }

  // 停止ボタンをクリックした時のイベント
  document.getElementById(setStopButtonId).onclick = function () {
    stopCurrentSound();
    return false;
  };
  document.body.addEventListener("keydown", (event) => {
    if (event.key === "q" && event.ctrlKey) {
      seplay("audio_o/trumpet1.mp3");
    }
    if (event.key === "w" && event.ctrlKey) {
      seplay("audio_o/trumpet3.mp3");
    }
    if (event.key === "e" && event.ctrlKey) {
      seplay("audio_o/dora.mp3");
    }
    if (event.key === "r" && event.ctrlKey) {
      seplay("audio/小鼓.mp3");
    }
    if (event.key === "t" && event.ctrlKey) {
      seplay("audio/drum-japanese2.mp3");
    }
    if (event.key === "y" && event.ctrlKey) {
      seplay("audio/運命1.mp3");
    }
    if (event.key === "u" && event.ctrlKey) {
      seplay("audio/shock.mp3");
    }
    if (event.key === "i" && event.ctrlKey) {
      seplay("audio/tin.mp3");
    }
    if (event.key === "o" && event.ctrlKey) {
      seplay("audio_o/chan-chan1.mp3");
    }
    if (event.key === "p" && event.ctrlKey) {
      seplay("audio_o/chan-chan2.mp3");
    }
    if (event.key === "a" && event.ctrlKey) {
      seplay("audio_o/drumroll.mp3");
    }
    if (event.key === "s" && event.ctrlKey) {
      seplay("audio/cheerandclap.mp3");
    }
    if (event.key === "d" && event.ctrlKey) {
      seplay("audio/claping1.mp3");
    }
    if (event.key === "f" && event.ctrlKey) {
      seplay("audio/everyone_laugh3.mp3");
    }
    if (event.key === "g" && event.ctrlKey) {
      seplay("audio/dondonpafupafu.mp3");
    }
    if (event.key === "h" && event.ctrlKey) {
      seplay("audio/police-whistle.mp3");
    }
    if (event.key === "j" && event.ctrlKey) {
      seplay("audio/shakine.mp3");
    }
    if (event.key === "k" && event.ctrlKey) {
      seplay("audio/jyan.mp3");
    }
    if (event.key === "l" && event.ctrlKey) {
      seplay("audio_o/kirari1.mp3");
    }
    if (event.key === ";" && event.ctrlKey) {
      seplay("audio/effect1.mp3");
    }
    if (event.key === "z" && event.ctrlKey) {
      seplay("audio/question.mp3");
    }
    if (event.key === "x" && event.ctrlKey) {
      seplay("audio_o/correct.mp3");
    }
    if (event.key === "c" && event.ctrlKey) {
      seplay("audio_o/incorrect.mp3");
    }
    if (event.key === "v" && event.ctrlKey) {
      seplay("audio/timer.mp3");
    }
    if (event.key === "b" && event.ctrlKey) {
      seplay("audio/timer_fast.mp3");
    }
    if (event.key === "n" && event.ctrlKey) {
      seplay("audio/nschime.mp3");
    }
    if (event.key === "m" && event.ctrlKey) {
      seplay("audio/chime1-1.mp3");
    }
    if (event.key === "," && event.ctrlKey) {
      seplay("audio_o/anouncement-before.mp3");
    }
    if (event.key === "." && event.ctrlKey) {
      seplay("audio_o/anouncement-after.mp3");
    }
    if (event.key === "/" && event.ctrlKey) {
      seplay("audio_o/click.mp3");
    }
    if (event.key === "_" && event.ctrlKey) {
      seplay("audio_o/2click.mp3");
    }
  });
  
  const seplayer =  document.getElementById("seplayer");
  
  function seplay(file) {
    seplayer.setAttribute("src",file);
    seplayer.currentTime=0;
    seplayer.play();
  }
  
  const se_volume = document.getElementById("se_volume");
  const seloopset = document.getElementById("seloopck");
  seplayer.volume = slider_volume.value;
  seloopset.addEventListener("change", e=>{
    if(seloopset.checked==true){
      seplayer.loop = true;
      document.getElementById("selpset").innerHTML="ループ";

    }else if(seloopset.checked==false){
      seplayer.loop = false;
      document.getElementById("selpset").innerHTML="ループ解除";
    }
  });

  se_volume.addEventListener("input", e => {
    seplayer.volume = se_volume.value;
    document.getElementById("sevoldis").innerHTML=(seplayer.volume*100).toFixed();
  });

})();

//var audios = document.querySelectorAll("audio");
var audios = document.getElementsByClassName("bgmplayer")
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
setInterval("showClock()", 250);
/*//////////タイマースクリプト(header)/////////////
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




setTimeout("redirect()", 0);
function redirect() {
  //    location.href="https://sites.google.com/nnn.ed.jp/ycp-s-soundeffectbs/maintenance-b";
}


/////////////////////////////////
			//初期表示は非表示
			//document.getElementById("target").style.display ="block";
			//document.getElementById("target2").style.display ="block";
			
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
			}*/
      const audioselecter = document.getElementById('audioselect')
      window.onload = function () {
        const audioselecter = document.getElementById('audioselect')
        
        audioselecter.onchange = function tagchange(){
            console.log(audioselecter.value);
            const setaudiofile = audioselecter.value;
            const setaudioname = audioselecter.options[audioselecter.selectedIndex].textContent;
            const audioElement = document.getElementById("selectedaudio");
            audioElement.setAttribute('src',"audio/bgm/"+setaudiofile);
            document.getElementById('audiotitle').innerHTML = setaudioname;
            } 
        };


/********************セレクトBGM用********************************/
        window.addEventListener( "DOMContentLoaded",function ctrlaudio(){
          const btn_eject = document.getElementById("btn_eject")
          const btn_mute = document.getElementById("btn_mute");
          const slider_volume = document.getElementById("slider_volume");
          const audioElement = document.getElementById("selectedaudio");
          const loopset = document.getElementById("adloopck");
          const btn_fi = document.getElementById("btn_fi");
          const btn_fo = document.getElementById("btn_fo");
          const alladstop = document.getElementById("alladstop");
        
          if(loopset.checked=true){
            audioElement.loop=true;
          }

          // ボリュームの初期設定
          audioElement.volume = slider_volume.value;

          btn_eject.addEventListener("click", e => {
            audioElement.pause();
            audioElement.currentTime = 0;
            audioselecter.selectedIndex = 0;
            audioElement.setAttribute('src',"");
            document.getElementById('audiotitle').innerHTML = "BGMを選択してください。";
          });

          btn_mute.addEventListener("click", e => {

            if( audioElement.muted ) {
              audioElement.muted = false;
              btn_mute.textContent = "ミュート";
            } else {
              audioElement.muted = true;
              btn_mute.textContent = "ミュート解除";
            }
          });
          

          btn_fi.addEventListener("click",e=>{
            var nowslidvol = slider_volume.value;
            slider_volume.value=0;
            audioElement.volume=slider_volume.value;
            audioElement.play();

            const audiofi =  setInterval(() => {
            if (slider_volume.value < nowslidvol) {
              slider_volume.value= audioElement.volume+0.025;
              audioElement.volume=slider_volume.value;
            }else {
              clearInterval(audiofi);
              return false;
            } 
            if(slider_volume.value == nowslidvol){
              document.getElementById('advoldis').innerHTML = (slider_volume.value*100).toFixed();
              clearInterval(audiofi);
              return false;
            } 
            document.getElementById('advoldis').innerHTML = (slider_volume.value*100).toFixed();
          }, 100);
          });
          
          btn_fo.addEventListener("click",e=>{
            var nowslidvol = slider_volume.value;
            const audiofo =  setInterval(() => {
            if (0< slider_volume.value) {
              slider_volume.value= audioElement.volume-0.025;
              audioElement.volume=slider_volume.value
            }else {
              clearInterval(audiofo);
              return false;
            } 
            if(slider_volume.value == 0){
              document.getElementById('advoldis').innerHTML = (slider_volume.value*100).toFixed();
              audioElement.pause();
              clearInterval(audiofo);
              slider_volume.value = nowslidvol;
              return false;
            } 
            document.getElementById('advoldis').innerHTML = (slider_volume.value*100).toFixed();
          }, 75);
          })
          
          

          loopset.addEventListener("change", e=>{
            if(loopset.checked==true){
              audioElement.loop = true;
              document.getElementById("lpset").innerHTML="ループ";

            }else if(loopset.checked==false){
              audioElement.loop = false;
              document.getElementById("lpset").innerHTML="ループ解除";
            }
          });

          slider_volume.addEventListener("input", e => {
            audioElement.volume = slider_volume.value;
            document.getElementById("advoldis").innerHTML=(audioElement.volume*100).toFixed();
          });
                    
          alladstop.onclick = function(){
            const findtarget = document.querySelectorAll('audio');
            for(i=0;i<findtarget.length;i++){
                findtarget[i].pause();
            }
            return false;
          }
        });
/****************************************/
/*************アップロードBGM用************/
          window.addEventListener( "DOMContentLoaded",function uctrlaudio(){
            const ubtn_eject = document.getElementById("ubtn_eject")
            const ubtn_mute = document.getElementById("ubtn_mute");
            const uslider_volume = document.getElementById("uslider_volume");
            const uaudioElement = document.getElementById("uploadaudio");
            const uloopset = document.getElementById("uadloopck");
            const ubtn_fi = document.getElementById("ubtn_fi");
            const ubtn_fo = document.getElementById("ubtn_fo");
            const upfile = document.getElementById('openmp3');

            upfile.onchange =() =>{
              var fileValue = $(upfile)[0].files[0].name
              document.getElementById('uaudiotitle').innerHTML = fileValue;
            }
            $(upfile).change(function(){
              if (this.files.length > 0) {
                // 選択されたファイル情報を取得
                var file = this.files[0];
                
                // readerのresultプロパティに、データURLとしてエンコードされたファイルデータを格納
                var reader = new FileReader();
                reader.readAsDataURL(file);
                
                reader.onload = function() {
                  $(uaudioElement).attr('src', reader.result );
                }
              }
            });
            
          
            if(uloopset.checked=true){
              uaudioElement.loop=true;
            }
  
            // ボリュームの初期設定
            uaudioElement.volume = uslider_volume.value;
  
            ubtn_eject.addEventListener("click", e => {
              uaudioElement.pause();
              uaudioElement.currentTime = 0;
              uaudioElement.setAttribute('src',"");
              document.getElementById('uaudiotitle').innerHTML = "BGMをアップロードしてください。";
            });
  
            ubtn_mute.addEventListener("click", e => {
  
              if( uaudioElement.muted ) {
                uaudioElement.muted = false;
                ubtn_mute.textContent = "ミュート";
              } else {
                uaudioElement.muted = true;
                ubtn_mute.textContent = "ミュート解除";
              }
            });
            
  
            ubtn_fi.addEventListener("click",e=>{
              var getvolume = uslider_volume.value
              uslider_volume.value=0;
              uaudioElement.volume=uslider_volume.value;
              uaudioElement.play();
  
              const uaudiofi =  setInterval(() => {
              if(uslider_volume.value == getvolume){
                clearInterval(uaudiofi);
                return false;
              } 
              if (uslider_volume.value < getvolume) {
                uslider_volume.value= uaudioElement.volume+0.01;
                uaudioElement.volume=uslider_volume.value;
              }else {
                clearInterval(uaudiofi);
                return false;
              } 

              document.getElementById('uadvoldis').innerHTML = (uslider_volume.value*100).toFixed();
            }, 50);
            });
            
            ubtn_fo.addEventListener("click",e=>{
              const uaudiofo =  setInterval(() => {
              if (0< uslider_volume.value <= 1) {
                uslider_volume.value= uaudioElement.volume-0.025;
                uaudioElement.volume=uslider_volume.value
              }else {
                clearInterval(uaudiofo);
                return false;
              } 
              if(uslider_volume.value == 0){
                document.getElementById('uadvoldis').innerHTML = "0"
                uaudioElement.pause();
                clearInterval(uaudiofo);
                return false;
              } 
              document.getElementById('uadvoldis').innerHTML = (uslider_volume.value*100).toFixed();
            }, 50);
            })
            
            
  
            uloopset.addEventListener("change", e=>{
              if(uloopset.checked==true){
                uaudioElement.loop = true;
                document.getElementById("ulpset").innerHTML="ループ";
  
              }else if(uloopset.checked==false){
                uaudioElement.loop = false;
                document.getElementById("ulpset").innerHTML="ループ解除";
              }
            });
  
            uslider_volume.addEventListener("input", e => {
              uaudioElement.volume = uslider_volume.value;
              document.getElementById("uadvoldis").innerHTML=(uaudioElement.volume*100).toFixed();
  
            });
          });
/***************/  

        