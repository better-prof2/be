# Better Professor - Back End.

Base URL: https://better-professor1.herokuapp.com/

##################################################

# API ENDPOINTS 

# Pofessor Register/Login/Other 

| DESCRIPTION | TYPE | ENDPOINT |
| ----------- | ---- | -------- | 
| Register Professor | POST | /api/auth/register |


| DESCRIPTION | TYPE | ENDPOINT |
| ----------- | ---- | -------- | 
| Login Professor | POST | /api/login |


| DESCRIPTION | TYPE | ENDPOINT |
| ----------- | ---- | -------- | 
| get professor's students | GET | /api/users/all-students/:id |
| get professor's messages | GET | /api/users/:id/messages |
| add students | POST | api/users/:id/students |
| add messages | POST | /api/users/:id/messages | 
| update professor | PUT | 	/api/users/:id |
| delete professor | DEL |  /api/users/:id |


# Student Register/Login/Other

| DESCRIPTION | TYPE | ENDPOINT |
| ----------- | ---- | -------- | 
| Register Student | POST | /api/auth/register/:id |


| DESCRIPTION | TYPE | ENDPOINT |
| ----------- | ---- | -------- | 
| Login Student | POST | /api/auth/login/students |


| DESCRIPTION | TYPE | ENDPOINT |
| ----------- | ---- | -------- | 
| get all student's | GET | /api/students |
| get student's projects | GET | /api/students/:id/projects |
| get student's messages | GET | /api/students/:id/messages |
| add student | POST | /api/students |
| update student | PUT | /api/students/:id/ |
| delete student | DEL | /api/students/:id/ |



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

# LOGOUT ENDPOINT 

| DESCRIPTION | TYPE | ENDPOINT |
| ----------- | ---- | -------- |
| logout | GET | /api/auth/logout |