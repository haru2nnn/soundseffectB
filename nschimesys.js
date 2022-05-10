document.getElementById("page-contents").style.display = "none";
document.getElementById('loading').style.display="block";

($(function() {
    setTimeout(function() {
	$('#loading').fadeOut();
	document.getElementById('page-contents').style.display="block";
}, 1200);
}));


/*document.body.onmousemove=() =>{
	var firstmove;	
	if (!firstmove) {
		const audioElement = document.querySelector("audio");
		audioElement.play();
		audioElement.pause();
		audioElement.currentTime = 0;
		firstmove = true
	}
	if (firstmove=true) {
		return false
	}
	return false
				
}*/

document.addEventListener('DOMContentLoaded', function() {
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
			
			window.onload = function onload () {	
				chimelist();
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

			btn_play.addEventListener("click", e => {
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

			btn_pause.addEventListener("click", e => {
				audioElement.pause();
				document.getElementById("info1").innerHTML = "";
				stopTimer();
			});

			btn_stop.addEventListener("click", e => {
				audioElement.pause();
				audioElement.currentTime = 0;
				document.getElementById("info1").innerHTML = "";
				document.getElementById("info2").innerHTML = "";
				stopTimer();
			});

			btn_mute.addEventListener("click", e => {

				if( audioElement.muted ) {
					audioElement.muted = false;
					var muteicon = '<i class="fa-solid fa-volume-xmark"></i>'
					btn_mute.innerHTML = muteicon+"消音";
					} else {
					audioElement.muted = true;
					var muteofficon = '<i class="fa-solid fa-volume-high"></i>'
					btn_mute.innerHTML = muteofficon+"消音解除";
				}
			});

			slider_volume.addEventListener("input", e => {
				audioElement.volume = slider_volume.value;
				slider_volume.value = audioElement.volume;
			});

			slider_volume.addEventListener("input", e => {
				var audiovol = slider_volume.value*100
				document.getElementById('audiovolume').innerText = audiovol.toFixed();
			});

			btn_slow.addEventListener("click", (e) => {
				audioElement.playbackRate = 0.8;
				volume.value = audioElement.playbackRate
				speedchange();
			});

			btn_normal.addEventListener("click", (e) => {
				audioElement.playbackRate = 1.0;
				volume.value = audioElement.playbackRate
				speedchange();
			});

			btn_fast.addEventListener("click", (e) => {
				audioElement.playbackRate = 1.2;
				volume.value = audioElement.playbackRate
				speedchange();
			});

			var volume = document.getElementById("input_volume");
			volume.addEventListener('input',function(){
				audioElement.playbackRate = volume.value
				volume.value = audioElement.playbackRate
			});
			volume.addEventListener('input',function(){
				var audiospeed = volume.value*100
				document.getElementById('audiospeed').innerText = "🏃🏻" + audiospeed.toFixed() + "%";
			});
			function speedchange() {
				var audiospeed = volume.value*100
				document.getElementById('audiospeed').innerText = "🏃🏻" + audiospeed.toFixed() + "%";
			}

			var playtimer = null;

			// 再生開始したときに実行
			const startTimer = function(){
				playtimer = setInterval(function(){
				playback_position.textContent = convertTime(audioElement.currentTime);
				slider_progress.value = Math.floor( (audioElement.currentTime / audioElement.duration) * audioElement.duration+1);
				}, 100);
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


			// プログレスバーが操作されたときに実行（メモリを動かしているとき）
			slider_progress.addEventListener("input", e => {
				stopTimer();
				audioElement.currentTime = slider_progress.value;
			});

			// プログレスバーが操作完了したときに実行
			slider_progress.addEventListener("change", e => {
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
						if( audioElement.muted ) {
						audioElement.muted = false;
						var muteicon = '<i class="fa-solid fa-volume-xmark"></i>'
						btn_mute.innerHTML = muteicon+"消音";
						} else {
						audioElement.muted = true;
						var muteofficon = '<i class="fa-solid fa-volume-high"></i>'
						btn_mute.innerHTML = muteofficon+"消音解除";
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
					
					const chsubmit = document.getElementById('chsubmit');
					const ch_hours = document.getElementById('ch_hours');
					const ch_mins = document.getElementById('ch_mins');
					
					ch_hours.oninput = function(){
						document.getElementById('disch_h').innerHTML = ch_hours.value;
					};
					ch_mins.oninput = function(){
						document.getElementById('disch_m').innerHTML = ch_mins.value;
					};	
					chsubmit.addEventListener("click", e => {
						alert(ch_hours.value+":"+ch_mins.value+"にチャイムを設定しました。")
						setTimeout( function(){
						chime();
						}, new Date().setHours(ch_hours.value, ch_mins.value, 0, 0) - new Date())
					});
							

/******************************************************************/
										function chimelc(ch,cm,cs,tt,msg){
											var nowdate= new Date();
											var nowdate2 = new Date();
											var fomula = nowdate.setHours(ch,cm,cs)-nowdate2;
											clearTimeout(chimer);
											var chimer = setTimeout(()=> {
												if (fomula > 0) {
												document.getElementById("info3").innerHTML = msg;
												document.getElementById("timetable").innerHTML = "< "+tt+"> ";
												document.getElementById("timetable2").innerHTML = "< "+tt+"> ";
												chime();
												console.log(new Date()+'_chimelaunchfunc')
												}else if(fomula < 0) {
												document.getElementById("timetable").innerHTML = "< "+tt+"> ";
												document.getElementById("timetable2").innerHTML = "< "+tt+"> ";
												}
											}, new Date().setHours(ch,cm,cs)-new Date())
										}

										function chimelist(){
											chimelc(9,0,0,"登校時間","おはようございます！本日もよろしくお願いします！");
											chimelc(9,30,0,"朝礼","おはようございます！本日もよろしくお願いします！");
											chimelc(9,45,0,"1限","");
											chimelc(10,35,0,"1限→2限 休み時間","");
											chimelc(10,45,0,"2限","");
											chimelc(11,35,0,"2限→3限 休み時間","");
											chimelc(11,45,0,"3限","");
											chimelc(12,35,0,"お昼休み","午前中お疲れ様でした！");
											chimelc(13,15,0,"4限","午後もよろしくお願いします！");
											chimelc(14,05,0,"4限→5限 休み時間","");
											chimelc(14,15,0,"5限","");
											chimelc(15,05,0,"5限→6限 休み時間","");
											chimelc(15,15,0,"6限","");
											chimelc(16,05,0,"終礼","午後もお疲れ様でした！<br>本日もチャイムシステムをご利用いただきありがとうございます！");
											chimelc(16,15,0,"放課後","");
											chimelc(17,30,0,"最終下校時刻","");


											/*chimelc(5,44,0,"試験放送1","試験放送中。こちらが表示された場合はお問合せください。");
											chimelc(5,45,0,"試験放送2","試験放送中。");
											chimelc(5,46,0,"試験放送3","試験放送中。");
											chimelc(5,43,0,"試験放送4","試験放送中。");*/
											
											document.getElementById("info1").innerHTML = "";
											document.getElementById("info2").innerHTML = "";
											document.getElementById("info3").innerHTML = "";
											audioElement.pause();
											audioElement.currentTime = 0;
										}


									const perbtn = document.getElementById('statepermission');
									perbtn.onclick = function stpermit() {
									IdleDetector.requestPermission();
									}
							
									let idleDetector = null, controller = null;
									window.addEventListener("load", async function() {
										if (idleDetector !== null) {
											controller.abort();
											idleDetector = null;
											return;
										}
										try {
											idleDetector = new IdleDetector();
											controller = new AbortController();
											const signal = controller.signal;
											idleDetector.addEventListener('change', () => {
												const userState = idleDetector.userState;
												const screenState = idleDetector.screenState;
											if(idleDetector.screenState =='locked'){
												console.log(new Date()+"_locked")
												chimelist();
												document.getElementById("info1").innerHTML = "";
												document.getElementById("info2").innerHTML = "";
												document.getElementById("timetable").innerHTML = "";
												document.getElementById("info3").innerHTML = "";
												audioElement.pause();
												audioElement.currentTime = 0;
											}
											});
											await idleDetector.start({
												threshold: 300000,
												signal,
											});
										} catch (err) {
											console.error(err.name, err.message);
										}
									
									});
                    
						
									setTimeout(() => {
                                        chime();
										audioElement.pause();
										document.getElementById("info2").innerHTML = "";
									}, new Date().setHours(8,0,0)-new Date())
			});


			
			var windowWidth = $(window).width();
			var windowSm = 640;
			if (windowWidth > windowSm) {
				$(function(){
				// 変数に要素を入れる
				var open = $('.clock'),
					close = $('.modal-close'),
					container = $('.modal-container');
			
				//開くボタンをクリックしたらモーダルを表示する
				open.on('click',function(){	
					container.addClass('active');
					return false;
				});
			
				//閉じるボタンをクリックしたらモーダルを閉じる
				close.on('click',function(){	
					container.removeClass('active');
				});
			
				//モーダルの外側をクリックしたらモーダルを閉じる
				$(document).on('click',function(e) {
					if(!$(e.target).closest('.modal-body').length) {
						container.removeClass('active');
					}
				});
			});
			} else {
				open.on('click',function(){	
				window.alert("画面サイズが"+windowSm+"以下の端末ではこちらの機能は利用できません。")
				return false
				});
			}
			
			

			