const version = "4.1";
const verdis = document.getElementById('sitever');
const vermsg = "Version: "+version;
verdis.innerHTML = vermsg;



const btn = document.querySelector("#modeChange");

// デバイスがライトモードかどうかチェック
const isLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// ローカルストレージに保存するための適当なKey名
const keyLocalStorage = 'se-cs-theme-mode';

// ローカルストレージの情報を取得
const localTheme = localStorage.getItem(keyLocalStorage);

// ローカルストレージの中身と、端末がライトモードかどうか（ie,edgeには無意味）をチェック
if(localTheme === 'light') {
  // ローカルストレージの情報が優先
    document.body.classList.remove("darkTheme");
    document.body.classList.add("lightTheme");
    btn.checked = false
} else if(localTheme === 'dark') {
    document.body.classList.remove("lightTheme");
    document.body.classList.add("darkTheme");
    btn.checked = true
} else if(isLight) {
    document.body.classList.remove("darkTheme");
    document.body.classList.add("lightTheme");
    btn.checked = false
} else if(isDark) {
    document.body.classList.remove("lightTheme");
    document.body.classList.add("darkTheme");
    btn.checked = true
}
 
// チェックした時の挙動
btn.addEventListener("change", () => {
  if (btn.checked == true) {
    // ダークモード
    document.body.classList.remove("lightTheme");
    document.body.classList.add("darkTheme");
    localStorage.setItem(keyLocalStorage,'dark');
  } else {
    // ライトモード
    document.body.classList.remove("darkTheme");
    document.body.classList.add("lightTheme");
    localStorage.setItem(keyLocalStorage,'light');
  }
});

