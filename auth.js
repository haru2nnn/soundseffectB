firebase.auth().onAuthStateChanged(function(user) {
    //
            var now_hour = new Date().getHours();
            if ( 0 <= now_hour && now_hour <= 4 ){
               var greetingmsg =  "こんばんは、";
               document.getElementById('login-status').style.color = "#7f7fff";
        
            } else if ( 5 <= now_hour && now_hour <= 9 ) {
                var greetingmsg = "おはようございます、";
                document.getElementById('login-status').style.color = "#ea5532";
        
            } else if ( 10 <= now_hour && now_hour <= 17) {
                var greetingmsg = "こんにちは、 ";
                document.getElementById('login-status').style.color = "#006e54";
        
            } else if ( 18 <= now_hour && now_hour <=23) {
                var greetingmsg = "こんばんは、";
                document.getElementById('login-status').style.color = "#7f7fff";
            }

    if (user) { // ログイン時
        var cuseremail = user.email
        var username = user.displayName
        var loginText = greetingmsg + username + ' さん ' + "["+ cuseremail + "] " + "<button onclick='logOut()'>ログアウト</button>";
        document.getElementById('login-status').innerHTML = loginText;
        document.getElementById("not-loginned").style.display = "none";
        document.getElementById("loginned").style.display = "block";
        document.getElementById("menu-button").style.display = "block";
        document.getElementById("login-status").style.display = "block";
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
        var ref = document.referrer;
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        ui.start('#firebaseui-auth-container', {
            signInSuccessUrl: ref,
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
        });
        document.getElementById("loginned").style.display = "none";
        document.getElementById("menu-button").style.display = "none";
        document.getElementById("login-status").style.display = "none";
        document.getElementById("not-loginned").style.display = "block";
    }
    });
    function logOut() {
        firebase.auth().signOut().then(function() {
            alert("ログアウトしました。次回使用時は再ログインしてください。");
            location.reload();
        });
    }
   
