//main.js

const express = require('express');
const expresssHandlebars = require('express-handlebars').create({
    layoutsDir: "views/layouts",
    partialsDir:  "views/layouts/partials",
    defaultLayout: 'main',
    extname: 'handlebars',
    helpers: {
      printDate: function(date) {
        let html = "";
        if(date.getDate() < 10){
          html +="0";
          html += date.getDate();
        }
        else {
          html += date.getDate();
        }
        html += ".";
        if(date.getMonth()+1 < 10){
          html +="0";
          html += date.getMonth() + 1;
        }
        else {
          html += date.getMonth() + 1;
        }
        html += ".";
        html += date.getFullYear();
        return html;
      },

      previewImgPosition: function(index){
        if(index % 2 == 0) {
          return "left";
        }
        else { return "right" }
      },

      previewContentPosition: function(index){
        if(index % 2 == 0) {
          return "right";
        }
        else { return "left" }
      },

      setActiveIfCurrent: function(currentCatName, activeCatName){
        if(currentCatName == activeCatName) {
          return "class='active-nav'";
        }
      },

      setHomeAsActive: function(isHomeMain){
        if(isHomeMain) {
          return "class='active-nav'";
        }
      }
    }
  });

const bodyParser = require('body-parser');


const mongoose = require('mongoose');
const dbUrl = 'mongodb+srv://etlaMadmin:4A4xMHfovUVuaAdu@etlam21.cu9pt.mongodb.net/blogDatabase?retryWrites=true&w=majority';

mongoose.connect(dbUrl, { connectTimeoutMS: 300000, socketTimeoutMS: 300000, useNewUrlParser: true, useUnifiedTopology: true}) 
    .then(() => console.log('Connection established to', dbUrl))
    .catch(err => console.error('Unable to connect to the mongoDB server. Error:', err.message));

const app = express();

// The app uses the folder public for
// static files, such as css and images (these
// are freely accessible for a client)
app.use(express.static('public'), bodyParser.urlencoded({ extended: false }));

// Set the template engine
app.engine('handlebars', expresssHandlebars.engine); //expresssHandlebars());
app.set('view engine', 'handlebars');

// A route definition
// app.METHOD(PATH, HANDLER)
// app.get('/', (req, res) => res.send('Hello World!'));

// Route modules
app.use('/', require('./routes/blog'));
app.use('/admin', require('./routes/admin'));

// Have the app listen to port 5000
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on ${port}`));