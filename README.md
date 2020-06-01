# Better Professor - Back End.

Base URL: https://better-professor1.herokuapp.com/

##################################################

# API ENDPOINTS 

# Pofessor Register And Login 

| DESCRIPTION | TYPE | ENDPOINT |
| ----------- | ---- | -------- | 
| Register Professor | POST | /api/auth/register |


| DESCRIPTION | TYPE | ENDPOINT |
| ----------- | ---- | -------- | 
| Login Professor | POST | /api/login |

# Student Register And Login 

| DESCRIPTION | TYPE | ENDPOINT |
| ----------- | ---- | -------- | 
| Register Student | POST | /api/auth/register/:id |


| DESCRIPTION | TYPE | ENDPOINT |
| ----------- | ---- | -------- | 
| Login Student | POST | /api/auth/login/students |



BODY

| NAME | TYPE | REQUIRED | DETAILS |
| ---- | ---- | -------- | ------- |
| fullname | string | yes | full name |
| username | string | yes | username (required for login) | 
| password | string | yes | password (required for login) | 
| email | string | yes | email |
| role:admin | string | no | 

EXAMPLE

```
  {
      "fullname": "Tatyana Dzhura",
      "username": "TatyanaDz",
      "password": "123abc",
      "email": "example@gmail.com",
      "role": "admin"
  }

```

