/* eslint-disable comma-dangle */
/* eslint-disable arrow-parens */
const router = require('express').Router();
const db = require('../models');
const newsapi = require('../app/news-api/news.js');

router.get('/news/trending', (req, res) => {
  console.log('Sending trending articles...');
  newsapi.v2
    .topHeadlines({
      q: '',
      category: '',
      language: 'en',
      country: 'us'
    })
    .then(response => {
      res.json({
        response
      });
    });
});

router.get('/news/categories', (req, res) => {
  console.log('Sending articles by category...');
  const articleArr = [];
  const apiCall = choicesArr => {
    const apiPromise = new Promise((resolve, reject) => {
      console.log('In apiCall function');
      choicesArr.forEach(choice => {
        newsapi.v2
          .topHeadlines({
            q: '',
            category: `${choice}`,
            language: 'en',
            country: 'us',
            pageSize: '4',
            page: '1'
          })
          .then(response => {
            console.log(choice, response.articles);
            articleArr.push(response.articles);
            if (choicesArr.length === articleArr.length) {
              console.log('Resolving apiPromise');
              resolve('Success');
            }
          });
      });
    });
    apiPromise
      .then(val => {
        console.log(val, articleArr);
        res.json({ articleArr });
        console.log('Done');
      })
      .catch(reason => {
        console.log(reason);
      });
  };

  db.Categories.find({
    where: {
      UserId: req.user.id
    }
  }).then(data => {
    const cat = data.dataValues;
    const choices = [];

    if (cat.business) {
      choices.push('business');
    }
    if (cat.entertainment) {
      choices.push('entertainment');
    }
    if (cat.health) {
      choices.push('health');
    }
    if (cat.science) {
      choices.push('science');
    }
    if (cat.sports) {
      choices.push('sports');
    }
    if (cat.technology) {
      choices.push('technology');
    }
    console.log(choices);
    apiCall(choices);
  });
});

router.get('/news/search/:query', (req, res) => {
  console.log(`Searching articles about ${req.params.query}`);
  newsapi.v2
    .everything({
      q: req.params.query,
      sources: '',
      domains: '',
      from: '',
      to: '',
      language: 'en',
      sortBy: 'relevancy',
      page: 1
    })
    .then(response => {
      res.json({
        response
      });
    });
});

router.post('/categories', (req, res) => {
  if (req.session.passport) {
    db.Categories.findOrCreate({
      where: {
        UserId: req.user.dataValues.id
      },
      defaults: {
        business: req.body.categories.business,
        entertainment: req.body.categories.business,
        health: req.body.categories.health,
        science: req.body.categories.science,
        sports: req.body.categories.sports,
        technology: req.body.categories.technology,
        UserId: req.user.dataValues.id
      }
    }).then(categories => {
      if (categories[1] === 'true') {
        console.log('Created');
        res.json('Created');
      } else {
        console.log('Found');
      }
    });
  } else {
    console.log('Unauthorized access');
  }
});

router.put('/profile', (req, res) => {
  if (req.session.passport && req.user) {
    db.Categories.update(
      {
        business: req.body.business,
        entertainment: req.body.business,
        health: req.body.health,
        science: req.body.science,
        sports: req.body.sports,
        technology: req.body.technology
      },
      {
        where: {
          UserId: req.user.dataValues.id
        }
      }
    ).then(() => {
      res.json('Updated');
    });
  } else {
    console.log('User is not logged in');
    res.json(null);
  }
});

router.delete('/delete-account', (req, res) => {
  db.Categories.destroy({
    where: {
      UserId: req.user.dataValues.id
    }
  }).then(deletedCategories => {
    db.User.destroy({
      where: {
        id: req.user.dataValues.id
      }
    }).then(deletedUser => {
      if (deletedUser === 1 && deletedCategories === 1) {
        res.json('Deleted User');
      }
    });
  });
});

// Route for getting some data about our user to be used client side
router.get('/user', (req, res) => {
  if (req.session.passport && req.user) {
    db.Categories.findOne({ where: { UserId: req.user.dataValues.id } }).then(
      categories => {
        res.json({
          user: req.user.dataValues,
          categories: categories
        });
      }
    );
  } else {
    console.log('User is not logged in');
    res.json(null);
  }
});

module.exports = router;
