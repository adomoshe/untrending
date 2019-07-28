const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');
const db = require('./models/index');
const routes = require('./routes');

const untrending = require('./app/untrending/untrending');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(
  session({
    secret: 'chicken',
    secure: 'auto',
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

db.sequelize.authenticate().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
});
const article = {
  source: {
    id: 'bbc-news',
    name: 'BBC News'
  },
  author: 'https://www.facebook.com/bbcnews',
  title: 'Iran seizes 1,000 Bitcoin mining machines after power spike',
  description:
    'Large racks of the computers constantly mining Bitcoin have led to a spike in electricity consumption.',
  url: 'https://www.bbc.co.uk/news/technology-48799155',
  urlToImage:
    'https://ichef.bbci.co.uk/news/1024/branded_news/B515/production/_107575364_gettyimages-934467750.jpg',
  publishedAt: '2019-06-28T09:57:30Z',
  content:
    'Image copyrightGetty ImagesImage caption\r\n Bitcoin mining centres often house hundreds or even thousands of computers dedicated to the cryptocurrency network\r\nAuthorities in Iran have seized roughly 1,000 Bitcoin mining machines from two former factories, acc… [+1373 chars]'
};

untrending(article);
