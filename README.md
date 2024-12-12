![Logo](https://raw.githubusercontent.com/natalio123/FitGuard/main/.github/fitGuard.png)
# Bangkit 2024 Capstone Team :  C242-PS402
Hello, this is our repository. We are a team of 7 people with 3 Machine Learning, 2 Mobile Developer and 2 Cloud Computing.

## Capstone Project Team: 
| Name | Bangkit-ID | Role |
| ------ | ------ | ------ | 
| Gilang Ramadhan  | C764B4KY1627  | Cloud Computing Engineer |
| Alfridus Elman  | C764B4KY0368  | Cloud Computing Engineer |
| Andreas Dwiputra Turangan | M309B4KY0523  | Machine Learning Engineer |
| Dafa Khairu Fadillah Wantasen | A309B4KY0960 | Mobile Developer Engineer |
| Yermia Turangan | M309B4KY4529 | Machine Learning Engineer |
| Jennifer Elisabeth Laluyan  | A309B4KX2055 | Mobile Developer Engineer |
| Natalio Michael Tumuahi  | M309B4KY3256 | Machine Learning Engineer |

## What is the purpose of our project?
We make to help diabetes patients manage daily care through activity reminders, health data tracking, and health advice.

## Tech Stack
![tech](https://raw.githubusercontent.com/natalio123/FitGuard/main/.github/tech-stack.jpg)

## Project Demo
Watch for us soon on youtube

## Service Avaliable

> Base url of this service is: http://localhost:3000

  <pre>POST /login</pre>
  <pre>POST  /register</pre>
  <pre>POST  /predict</pre>

- Users
  <pre>GET  /user</pre>
  <pre>PUT  /user</pre>
  <pre>DEL  /user/change-password</pre>

- Healths
  <pre>POST  /health</pre>
  <pre>GET  /health</pre>
  <pre>GET  /health/{healthId}</pre>
  <pre>PUT  /health/{healthId}</pre>
  <pre>DEL  /health/{healthId}</pre>

- Medications
  <pre>POST  /medication</pre>
  <pre>GET  /medication</pre>
  <pre>GET  /medication/{medicationId}</pre>
  <pre>PUT  /medication/{medicationId}</pre>
  <pre>DEL  /medication/{medicationId}</pre>

- Medication Details
  <pre>POST  /medication/{medicationId}</pre>
  <pre>GET  /medication/{medicationId}</pre>
  <pre>GET  /medication/{medicationId}/{medicationDetailId}</pre>
  <pre>PUT  /medication/{medicationId}/{medicationDetailId}</pre>
  <pre>DEL  /medication/{medicationId}/{medicationDetailId}</pre>

- Nutritions
  <pre>POST  /nutrition</pre>
  <pre>GET  /nutrition</pre>
  <pre>GET  /nutrition/{medicationId}</pre>
  <pre>PUT  /nutrition/{medicationId}</pre>
  <pre>DEL  /nutrition/{medicationId}</pre>

- Physicals
  <pre>POST  /physical</pre>
  <pre>GET  /physical</pre>
  <pre>GET  /physical/{medicationId}</pre>
  <pre>PUT  /physical/{medicationId}</pre>
  <pre>DEL  /physical/{medicationId}</pre>

- Waters
  <pre>POST  /water</pre>
  <pre>GET  /water</pre>
  <pre>GET  /water/{medicationId}</pre>
  <pre>PUT  /water/{medicationId}</pre>
  <pre>DEL  /water/{medicationId}</pre>

# Quick Look

## Architecture

![arsitektur](https://raw.githubusercontent.com/natalio123/FitGuard/back-end/.github/arsitektur.jpg)

# Authentications

This service is using token for authentication. You should have an account to access this service. First if you don't have an account, create a new account. Then, create a token for authentication. It's like login, you need to authenticate yourself with username and password. If the autentication is valid, you will get a token. You can use this token to access the service. If dont, you will get a error message.

# Testing

This Web service uses Postman to test.

- You can download the Postman documentation [here]([https://documenter.getpostman.com/view/12239151/Uz5DrdGT](https://documenter.getpostman.com/view/39610757/2sAYHwKjuN)).

If you want to contribute to this project, please contact me.
