'use strict';

require('dotenv').config({path: '../.env'});
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

module.exports = newsapi;