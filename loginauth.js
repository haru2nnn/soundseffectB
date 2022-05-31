firebase.auth().onAuthStateChanged(function checkauth(user) {
    if (user) { // ログイン時
        if(document.referrer){
            window.location.replace(document.referrer);
        }else{
            window.location.replace('redirect.html');
        }
    } else {  // 未ログイン時
        var ref = function(){
            window.location.replace('login.html');
        }
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        ui.start('#firebaseui-auth-container', {
            signInSuccessUrl: ref,
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
        });
    }

    });
