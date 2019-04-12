const express = require('express');
const app = express();

const Sequelize = require('sequelize');
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize('untrending_db', 'root', '', {
      host: 'localhost',
      dialect: 'mysql'
    });

const session = require('express-session');
const passport = require('./config/passport');

const PORT = process.env.PORT || 5000;
const routes = require('./routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
// app.use(session({ secret: 'chicken', secure: 'auto' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

sequelize.authenticate().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
});
