function welcome() {
    var username = Cookies.get('username');
    console.log(username);
    if (username != undefined) {
        document.getElementById('welcome').innerHTML = 'Welcome ' + username;
    } else {
        window.location.href = 'http://homer.stuy.edu/~jchirinos/MediaPlatform/login.html';
    }
}
