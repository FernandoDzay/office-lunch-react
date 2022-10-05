# Office Lunch Platform - Frontend

A React.js project, with create-react-app

## About the project
I developed this project for my last Job, just for passion, to improve my programming skills, and because I wanted to automate one of our office activities.
### The context
The office had an agreement with a “Cocina económica/Economic Kitchen” (In Mexico an “Economic Kitchen” is a place who sells homemade meals, having different menus depending of the day).  The agreement was, by a daily minimum amount of orders, we got a discount and food delivering to our office.

So every employee could pick one or more foods from the menu of the day.
To do this, we had an ugly online Excel with the names of all employees and the menu of the day. HR department had to update it every day depending of the menu, at the same time they register each order, so employees could make their respective payments.

In addition, due to the pandemic, we only could go to eat in groups of 5 people in different times. This was unfair because there was no system who rotates the schedule of the groups, some people always ate too early, and some people always ate too late.
### The main needs to be covered for this particular office was the following:
1. The first order of the day for each user, must have a fixed price (for example $20 MXN) no matter what was the price of the food. All the next user orders must have the real price. (This was because the company gave us a discount on the first order of the day).
2. As you can see, there must be 2 types of bills, one for the users (due to the discount), and other for HR (money they must pay to the economic kitchen).
3. The system should have the ability of closing the menu, so HR could request all orders to the economic kitchen without missing any user order.
4. Should be a schedule rotation of groups every day.
5. There must be administrator privileges for HR.
6. There must be a registry of all the orders, prices, and payments.
7. HR can create the Foods of the day, and add it to the menu, so that employees can choose their own Food.

In the project, you can find extra features, like custom image for users, custom images for food cards, notifications (for example birthday notifications) and more.

### Finally
Feel free to play with the project: [https://office-lunch-react.luisdzay.com](https://office-lunch-react.luisdzay.com, 'Office Lunch Platform for testing'). This link is for testing, which resets all the default demo data every day.

To enter as Admin, use luis@gmail.com, Pass: 1234

To enter as No-Admin, use pedro@gmail.com, laura@gmail.com, pablo@gmail.com. All with Pass: 1234

## Development setup
First, download dependencies.

```
npm install
```
Then, you need to configure your own **REACT_APP_API_URL** in **.env.development** file, that is located in the root directory. But for that, you need your local Backend server.

So, if you don't know how to setup the Backend, read this repository: [https://github.com/FernandoDzay/express-office-lunch]('https://github.com/FernandoDzay/express-office-lunch', 'Backend repository'). Or if you want, you can point to my testing online server.
```
REACT_APP_API_URL=https://express-office-lunch.luisdzay.com
```

Finally, just execute:
```
npm start
```
And the project is going to be open in your default browser.

## Production
Setup your own online Backend server, and then configure **.env.production** file.

## Prerequisites
```
node@v16.15.0 or higher
npm@8.5.5 or higher
```

## Features
* Valid HTML5 & CSS3
* Fully Responsive
* Minimal libraries used
* Single Page Application
* JWT Authentication using *local storage*

The project design was taken from this page: [https://designlopers.com/resource/QnVWLzg3bVJWUmtSWHZwQTkwK0Fjdz09/](https://designlopers.com/resource/QnVWLzg3bVJWUmtSWHZwQTkwK0Fjdz09/, 'Layout design'). I didn´t use the template they provide. I copied the design with my own CSS styles and Javascript with React.js.

## Technologies
* React.js with create-react-app
* SASS
* Redux toolkit
* normalize-scss
* react-router-dom

`Quick note: I didn't use any library for the tables, tabs, sidebar, modals, effects and transitions functionalities`