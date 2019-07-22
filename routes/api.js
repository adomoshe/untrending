const router = require('express').Router();
const db = require('../models/index');
const newsAPI = require('../app/news-api/news.js');
const isAuthenticated = require('../config/middleware/isAuthenticated');

router.get('/news/trending', async (req, res) => {
  try {
    console.log('Sending trending articles...');
    const response = await newsAPI.v2.topHeadlines({
      q: '',
      category: '',
      language: 'en',
      country: 'us'
    });
    console.log(response);
    res.json({ response });
  } catch (error) {
    console.error(error);
  }
});

router.get('/news/categories', isAuthenticated, async (req, res) => {
  console.log('Sending articles by category...');
  const choicesArr = [];
  const articleArr = [];

  const { dataValues } = await db.Categories.findOne({
    where: { UserId: req.user.id }
  });
  const categories = Object.entries(dataValues);
  await categories.forEach(([key, category]) => {
    if (category.toString() === 'true') {
      choicesArr.push(key);
    }
  });

  choicesArr.forEach(async choice => {
    const { articles } = await newsAPI.v2.topHeadlines({
      q: '',
      category: choice,
      language: 'en',
      country: 'us',
      pageSize: '4',
      page: '1'
    });
    articleArr.push(articles);
    if (choicesArr.length === articleArr.length) {
      res.json({ articleArr });
    }
  });
});

router.get('/news/search/:query', isAuthenticated, async (req, res) => {
  console.log(`Searching articles about ${req.params.query}`);
  const response = await newsAPI.v2.everything({
    q: req.params.query,
    sources: '',
    domains: '',
    from: '',
    to: '',
    language: 'en',
    sortBy: 'relevancy',
    page: 1
  });
  res.json({ response });
});

router.post('/categories', isAuthenticated, async (req, res) => {
  const {
    business,
    entertainment,
    health,
    science,
    sports,
    technology
  } = req.body.categories;

  const categories = await db.Categories.findOrCreate({
    where: {
      UserId: req.user.dataValues.id
    },
    defaults: {
      business,
      entertainment,
      health,
      science,
      sports,
      technology,
      UserId: req.user.dataValues.id
    }
  });
  if (categories[1] === 'true') {
    console.log('Created');
    res.json('Created');
  } else {
    console.log('Found');
    res.json('Found');
  }
});

router.put('/profile', isAuthenticated, async (req, res) => {
  await db.Categories.update(
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
  );
  res.json('Updated');
});

router.delete('/delete-account', isAuthenticated, async (req, res) => {
  await db.Categories.destroy({
    where: {
      UserId: req.user.dataValues.id
    }
  });
  await db.User.destroy({
    where: {
      id: req.user.dataValues.id
    }
  });
  res.json('Deleted User');
});

router.get('/user', async (req, res) => {
  if (req.session.passport) {
    const categories = await db.Categories.findOne({
      where: { UserId: req.user.dataValues.id }
    });
    res.json({
      user: req.user.dataValues,
      categories
    });
  } else {
    console.log('User is not logged in');
    res.json(null);
  }
});

module.exports = router;
