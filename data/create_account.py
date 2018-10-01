#! /usr/bin/python3

# Unfortunately, this assumes that nobody has the same name xD

import cgi, cgitb
cgitb.enable()

print('Content-type: text/html\n\n')

def make_dict():
    straw = open('accounts.txt', 'r')
    accounts = straw.read()
    straw.close()
    
    account_dict = {}
    for i in accounts.split('\n'):
        if i == '':
            break
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
    username = fs.getvalue('username')
    password = fs.getvalue('password')
    
    if not account_exists(username):
        create_account(username, password)
        print('1') # ACCOUNT CREATION COMPLETED
    else:
        print('0') # USERNAME EXISTS

go()
