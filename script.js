var user_notice = document.getElementById('user_notice');

var xhr_create_account = new XMLHttpRequest();

xhr_create_account.onload = function () {
    var return_val = xhr_create_account.responseText;
    console.log(return_val);
    if (return_val == 0) {
        console.log('username exists');
        user_notice.innerHTML = 'That username already exists!';
        return;
    }
    // if new account created
    else if (return_val == 1) {
        console.log('account created');
        user_notice.innerHTML = 'Account created! Please log in!';
        document.getElementById('password').value = '';
        return;
    }
}

var xhr_verify_login = new XMLHttpRequest();

xhr_verify_login.onload = function () {
    var return_val = xhr_verify_login.responseText;
    if (return_val == 0) {
        console.log('wrong password');
        user_notice.innerHTML = 'Incorrect username or password!';
        return;
    } else if (return_val == 1) {
        console.log('logged in!');
        Cookies.set('username', document.getElementById('username').value, {
            expires: 7
        });
        Cookies.set('logged_in', 'true');
        window.location.href = 'http://homer.stuy.edu/~jchirinos/MediaPlatform/'
    }
}

function create_account() {

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var re = /^[a-z0-9]+$/i;
    if (!(re.test(username)) || !(re.test(password))) {
        user_notice.innerHTML = 'Invalid username or password!';
        return;
    }

    xhr_create_account.open("GET", 'http://homer.stuy.edu/~jchirinos/MediaPlatform/data/create_account.py?username=' + username + '&password=' + password);
    xhr_create_account.send();
}

function log_in() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var re = /^[a-z0-9]+$/i;
    if (!(re.test(username)) || !(re.test(password))) {
        user_notice.innerHTML = 'Invalid username or password!';
        return;
    }

    xhr_verify_login.open("GET", 'http://homer.stuy.edu/~jchirinos/MediaPlatform/data/verify_login.py?username=' + username + '&password=' + password);
    xhr_verify_login.send();
}
