# h00d cms

h00d cms is my very simple, very barebones cms.

It runs on a **node.js** server envivronment and handles request with the web framework **express.js**. The view engine used is **handlebars.js**. The data is stored with **MongoDB**.

## Demo

If you want to see it in action, you can visit a live-version deploayed wiht heroku here: [maltesblog.herokuapp.com](https://maltesblog.herokuapp.com/)

For the backend, the management of the content, you can check here:  [maltesblog.herokuapp.com/admin](https://maltesblog.herokuapp.com/admin)

## How It Works

### Data Structure

The data is stored in three schemas:
* Category
    * name: String
* Post
  *  title: String
  *  text: String
  *  excerpt: String
  *  imgurl: String
  *  date: Date
  *  category: ObjectID of an element of the Category collection
* StaticContent
  *  title: String
  *  content: String
  *  imgurl: String

_"StaticContent" is where sites like the about page or the contact page are stored._

### Routing

Express listens for two main routes:

The frontend under the root "/" as well as the backend under "/admin".

For the different get and posts request it gets the needed data from the MongoDB database with the help of mongoose.

### Views

The views are obivously filled with the contents of the database.

What I really like is how the main navigation bar is made up of the different categories.

I implemented helpers for handlebars used in a variety of cases, most notably to switch between left and right sided text displays in the overview.




**As of yet, nothing is really responsive. There only exists a desktop-display.**