var error = document.getElementById('error');

var create_account_request = new XMLHttpRequest();

create_account_request.onload = function () {
    var return_val = create_account_request.responseText;
    console.log(return_val);
    if (return_val == 0) {
        console.log('username exists');
        error.innerHTML = 'That username already exists!';
        return;
    }
    // if new account created
    else if (return_val == 1) {
        console.log('account created');
        error.innerHTML = 'Account created! Please log in!';
        document.getElementById('password').value = '';
        return;
    } else {
        console.log('why isnt this working?');
    }
}

function create_account() {

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var re = /^[a-z0-9]+$/i;
    if (!(re.test(username)) || !(re.test(password))) {
        error.innerHTML = 'Invalid username or password!';
        return;
    }

    create_account_request.open("GET", 'http://homer.stuy.edu/~jchirinos/MediaPlatform/data/create_account.py?username=' + username + '&password=' + password);
    create_account_request.send();
}
