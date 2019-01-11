'use strict';
$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  $.get('/api/user').then(data => {
    const $header = $('#btn-insert');
    if (data) {
        console.log(data)
        // Below is our user object
        console.log(data.user)
        // Below is our categories object for the above user
        console.log(data.categories)
      const $logout = $('<a>');
      $logout.attr('class', 'navbar-brand');
      $logout.attr('id', 'logout-button');
      $logout.html('Logout');
      $logout.attr('href', '/logout');
      $header.append($logout);
    } else {
      console.log('User not logged in');
      const $signin = $('<a>');
      $signin.attr('class', 'navbar-brand');
      $signin.attr('id', 'signin-button');
      $signin.html('Sign In With Google');
      $signin.attr('href', '/auth/google');
      $header.append($signin);
    }
  });

  ///                 TOP HEADLINES                    ///
  var frontPage;
  var queryURL =
    'https://newsapi.org/v2/top-headlines?' +
    'country=us&' +
    'apiKey=abf7b2766a1549eca7580d1b261d5838';

  $.ajax({
    url: queryURL,
    method: 'GET',
    error: function() {
      console.log('error');
    },
    success: function(data) {
      processData(data);
    }
  });

  function processData(data) {
    // var articleItems = [];

    for (var i = 0; i < data.articles.length; i++) {
      var title = data.articles[i].title;
      // console.log(title);

      var subtitle = data.articles[i].description;
      // console.log(subtitle);

      var date = data.articles[i].publishedAt;
      // console.log(date);

      var blurb = data.articles[i].content;
      // console.log(blurb);

      var artUrl = data.articles[i].url;
      // console.log(artUrl);

      var $title = $(
        '<a href=' + artUrl + '><div class="title">' + title + '</div ></a>'
      );
      var $date = $('<div class="date">Date: ' + date + '</div >');
      var $subtitle = $(
        '<a href=' +
          artUrl +
          '><div class="description">' +
          subtitle +
          '</div ></a>'
      );
      var $blurb = $('<div class="blurb">' + blurb + '</div >');
      $('.front-page-feed').append($title, $subtitle, $date, $blurb);
      // console.log(artUrl);
    }

    for (var i = 0; i < data.articles.length; i++) {
      var thumbnail = data.articles[i].urlToImage;
      // console.log(thumbnail);

      var $thumbnail = $("<img class ='thumbnail' src=" + thumbnail + '>');

      $('.thumbnail-feed').append($thumbnail);
    }
  }

  ///                 SEARCH QUERY                   ///
  var search;
  var url =
    'https://newsapi.org/v2/everything?' +
    'q=' +
    search +
    '&' +
    'from=2019-01-10&' +
    'sortBy=popularity&' +
    'apiKey=abf7b2766a1549eca7580d1b261d5838';

  // on click of submit button, user input = search, and call processData.

  // search = $("#search-input").val();
  // console.log(search);

  ///                 RIP OUT SOURCES FOR FILTERING ALGORITHM                   ///

  ///code algorithm here///
});
