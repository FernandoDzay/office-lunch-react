# Office Lunch Platform - Frontend

A React.js project, with create-react-app

## Development setup
___

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
___

Setup your own online Backend server, and then configure **.env.production** file.

## Prerequisites
___

```
node@v16.15.0 or higher
npm@8.5.5 or higher
```

## Features
___

* Valid HTML5 & CSS3
* Fully Responsive
* Minimal libraries used
* Single Page Application
* JWT Authentication using *local storage*

The project design was taken from this page: [https://designlopers.com/resource/QnVWLzg3bVJWUmtSWHZwQTkwK0Fjdz09/](https://designlopers.com/resource/QnVWLzg3bVJWUmtSWHZwQTkwK0Fjdz09/, 'Layout design'). I didn´t use the template they provide. I copied the design with my own CSS styles and Javascript with React.js.

## Technologies
___

* React.js with create-react-app
* SASS
* Redux toolkit
* normalize-scss
* react-router-dom

`Quick note: I didn't use any library for the tables, tabs, sidebar, modals, effects and transitions functionalities`