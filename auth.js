/*admin
  .auth()
  .setCustomUserClaims(uid, { admin: true })
  .then(() => {
    // 
  });*/
//今すぐ実行する処理
(function() {
    firebase.auth().onAuthStateChanged(function checkauth(user) {
        //
                var now_hour = new Date().getHours();
                if ( 0 <= now_hour && now_hour <= 4 ){
                var greetingmsg =  " こんばんは、";
                document.getElementById('login-status').style.color = "#7f7fff";
            
                } else if ( 5 <= now_hour && now_hour <= 9 ) {
                    var greetingmsg = " おはようございます、";
                    document.getElementById('login-status').style.color = "#ea5532";
            
                } else if ( 10 <= now_hour && now_hour <= 17) {
                    var greetingmsg = " こんにちは、 ";
                    document.getElementById('login-status').style.color = "#006e54";
            
                } else if ( 18 <= now_hour && now_hour <=23) {
                    var greetingmsg = " こんばんは、";
                    document.getElementById('login-status').style.color = "#7f7fff";
                }

        if (user) { // ログイン時
            var personicon = '<i class="fa-solid fa-user-check"></i>'
            var cuseremail = user.email
            var username = user.displayName
            const photoURL = user.photoURL;
            var loginText = personicon+greetingmsg + username + ' さん ' + "["+ cuseremail + "] ";
            var img = document.getElementById('uimage');
            img.setAttribute('src', photoURL);
            if(!photoURL){
                img.style.cssText +=  'display: none!important'
            }
            var uicon = username.charAt(0);
            var UPstr = uicon.toUpperCase();
            document.getElementById('uicon').innerHTML = UPstr;

            document.getElementById('login-status').innerHTML = loginText;
                // 存在確認済のメールアドレスかどうか(true or false)
                var verified = firebase.auth().currentUser.emailVerified;
                var currentUser = user
                // 未確認のメールアドレスの場合、メールを送信する
                if (!verified) {
                    // メール送信処理
                    firebase.auth().currentUser.sendEmailVerification();
                    var email = firebase.auth().currentUser.email;
                    alert('アカウントが認証されていません。\n確認メールを送信しました。ご確認ください。', email);
                }
        } else {  // 未ログイン時
            window.location.replace('login.html');
        }

      });
}());
    
 function logOut() {
            firebase.auth().signOut().then(function() {
                alert("ログアウトしました。次回使用時は再ログインしてください。");
                location.reload();
            });
        }
