#! /usr/bin/python3

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

def go():
    fs = cgi.FieldStorage()
    username = fs.getvalue('username')
    password = fs.getvalue('password')
    
    d = make_dict()
    
    if d[username] == password:
        return '1' #login complete!
    else:
        return '0' #wrong password

go()
