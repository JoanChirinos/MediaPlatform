#! /usr/bin/python3

# Unfortunately, this assumes that nobody has the same name xD

import cgi, cgitb
cgitb.enable()

def make_dict():
    straw = open('accounts.txt', 'r')
    accounts = straw.read()
    straw.close()
    
    account_dict = {}
    for i in accounts.split('\n'):
        account_details = i.split('|', 2)
        account_dict[account_details[0]] = account_details[1] #username: password
    
    return account_dict

def account_exists(username):
    d = make_dict()
    return (username in d)

def create_account(username, password):
    file = open('accounts.txt', 'a')
    file.write('\n' + username + '|' + password)
    file.close()
    
def go():
    fs = cgi.FieldStorage()
    username = fs.getvalue('username', 'NONE')
    password = fs.getvalue('password')
    
    if username == 'NONE':
        return 'invalid username'
    elif not account_exists(username):
        create_account(username, password)
    else:
        return 'Account already exists!'

go()
