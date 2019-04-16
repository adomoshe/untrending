/* eslint-disable comma-dangle */
/* eslint-disable arrow-parens */
const router = require('express').Router();
const db = require('../models');
const newsAPI = require('../app/news-api/news.js');

router.get('/news/trending', (req, res) => {
  console.log('Sending trending articles...');
  newsAPI.v2
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
      choicesArr.forEach(choice => {
        newsAPI.v2
          .topHeadlines({
            q: '',
            category: `${choice}`,
            language: 'en',
            country: 'us',
            pageSize: '4',
            page: '1'
          })
          .then(response => {
            articleArr.push(response.articles);
            if (choicesArr.length === articleArr.length) {
              resolve('Success');
            }
          });
      });
    });
    apiPromise
      .then(() => {
        res.json({ articleArr });
        console.log('Done');
      })
      .catch(reason => {
        console.log(reason);
      });
  };
  db.Categories.find({
    where: { UserId: req.user.id }
  }).then(data => {
    const cats = Object.entries(data.dataValues);
    const choices = [];
    cats.forEach(([key, cat]) => {
      if (cat) {
        console.log(`${key}: ${cat}`);
        choices.push(cat);
      }
    });
    apiCall(choices);
  });
});

router.get('/news/search/:query', (req, res) => {
  console.log(`Searching articles about ${req.params.query}`);
  newsAPI.v2
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
    const cat = req.body.categories;
    db.Categories.findOrCreate({
      where: {
        UserId: req.user.dataValues.id
      },
      defaults: {
        business: cat.business,
        entertainment: cat.business,
        health: cat.health,
        science: cat.science,
        sports: cat.sports,
        technology: cat.technology,
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

router.get('/user', (req, res) => {
  if (req.session.passport && req.user) {
    db.Categories.findOne({ where: { UserId: req.user.dataValues.id } }).then(
      categories => {
        res.json({
          user: req.user.dataValues,
          categories
        });
      }
    );
  } else {
    console.log('User is not logged in');
    res.json(null);
  }
});

module.exports = router;
