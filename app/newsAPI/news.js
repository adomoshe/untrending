'use strict';

require('dotenv').config();
const request = require('request');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('abf7b2766a1549eca7580d1b261d5838');

const queryURL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${
  process.env.NEWS_API_KEY
}`;


 
// To query top headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
newsapi.v2.topHeadlines({
  q: 'trump',
  category: 'politics',
  language: 'en',
  country: 'us'
}).then(response => {
  console.log(response);
  console.log(response.articles[0].content);
});
 
// To query everything
// You must include at least one q, source, or domain
// newsapi.v2.everything({
//   q: 'trump',
//   sources: 'bbc-news,the-verge',
//   domains: 'bbc.co.uk,techcrunch.com',
//   from: '2017-12-01',
//   to: '2017-12-12',
//   language: 'en',
//   sortBy: 'relevancy',
//   page: 2
// }).then(response => {
//   console.log(response);
  /*
    {
      status: "ok",
      articles: [...]
    }
  */
// });
 
// To query sources
// All options are optional
// newsapi.v2.sources({
//   category: 'technology',
//   language: 'en',
//   country: 'us'
// }).then(response => {
//   console.log(response);
  /*
    {
      status: "ok",
      sources: [...]
    }
  */
// });