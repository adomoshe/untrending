'use strict';
// var mysql = require("mysql2");

// var fromSearch = false;

// var connection = mysql.createConnection({
//   host: "localhost",
//   // Your port; if not 3306
//   port: 3306,
//   // Your username
//   user: "root",
//   // Your password
//   password: "",
//   database: "untrending_db"
// });

$(document).ready(() => {
  $('.unfold-nav').hide();
  $('.categories-list').hide();
  $.get('/api/user').then(data => {
    const $nav = $('.unfold-nav');
    if (data) {
      const $logout = $('<a>');
      $logout.attr('class', 'nav-category');
      $logout.attr('id', 'logout-button');
      $logout.html('Logout');
      $logout.attr('href', '/logout');
      $nav.append($logout);
      const $userInfo = $('<a>');
      $userInfo.attr('class', 'nav-category');
      $userInfo.attr('id', 'user-info');
      $userInfo.html(data.user.username);
      $userInfo.attr('href', '/profile');
      $nav.append($userInfo);
      trendingCall();
    } else {
      const $signin = $('<a>');
      $signin.attr('class', 'nav-category');
      $signin.attr('id', 'signin-button');
      $signin.html('Sign In With Google');
      $signin.attr('href', '/auth/google');
      $nav.append($signin);
      trendingCall();
    }
  });
});

const trendingCall = () => {
  $.get('/newsapi/trending').then(data => {
    displayArticles(data);
  });
};

const categoriesCall = cat => {
  $.get(
    `/newsapi/categories/${cat.business}/${cat.entertainment}/${cat.health}/${
      cat.science
    }/${cat.sports}/${cat.technology}`
  ).then(data => {
    displayArticles(data);
  });
};

$('#search-btn').on('click', event => {
  event.preventDefault();
  const query = $('#search-input')
    .val()
    .trim()
    .toLowerCase();
  document.getElementById('search-form').reset();
  $.get(`/newsapi/search/${query}`).then(data => {
      displayArticles(data);
  });
});

const displayArticles = articles => {
  $('.thumbnail-feed').empty();
  const article = articles.response.articles;
  const articleHolder = [];
  for (let i = 0; i < article.length; i++) {
    if (article[i].title && article[i].description && article[i].content) {
      let title = article[i].title;
      let subtitle = article[i].description;
      let date = article[i].publishedAt;
      let blurb = article[i].content.split('[+')[0];
      let artUrl = article[i].url;
      let thumbnail = article[i].urlToImage;
      let formattedDate = new Date(date);
      formattedDate.toString().split('GMT')[0];

      let $title = $(
        `<a href=${artUrl}><div class='title'>${title}</div ></a>`
      );

      let $date = $(
        `<div class='date'><mark>PUBLISHED ON: ${formattedDate}<mark></div >`
      );

      let $subtitle = $(`<div class='subtitle'>'${subtitle}'</div >`);
      let $blurb = $(`<div class='blurb'>${blurb}</div >`);
      let $artUrl = $(`<a href=${artUrl}>READ ARTICLE</a>`);

      let $thumbnail = $(
        `<img class='thumbnail' src=${thumbnail} data-article=${i}> <br>`
      );

      articleHolder.push({
        title: $title,
        date: $date,
        subtitle: $subtitle,
        blurb: $blurb,
        arturl: $artUrl
      });
      $('.thumbnail-feed').prepend($thumbnail);
    } else {
      articleHolder.push({ article: null });
      continue;
    }
  }

  $('.thumbnail').mouseover(function(event) {
    $('.front-page-feed').empty();
    const id = $(this).data('article');
    const article = articleHolder[id];
    $('.front-page-feed').append(
      article.title,
      article.date,
      article.subtitle,
      article.blurb,
      article.arturl
    );
  });
};

///                 NAV BAR                 ///
$('#fold-nav-line').on('click', function() {
  $('#fold-nav-line').hide();
  $('.unfold-nav').show();

  $('#unfold-nav-logo').mouseover(function() {
    $('.categories-list').show();

    $('.nav-category').on('click', function() {
      // needs to refilter newsfeed by topic
    });
  });

  $('#x').on('click', function() {
    $('#fold-nav-line').show();
    $('.unfold-nav').hide();
    $('.categories-list').hide();
  });
});

// $(".unfold-nav").mouseout(function() {
//     $("#fold-nav-line").show();
//     $(".unfold-nav").hide();
//     $(".categories-list").hide();

// })

///                 TOP HEADLINES                    ///

var frontPage;
var articleHolder = [];

// var headlines = [];

function processData(data) {
  console.log(data);

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
    console.log(artUrl);

    // var fullArt = data.articles[i].content;
    // console.log(fullArt)

    var $title = $(
      '<a href=' + artUrl + '><div class="title">' + title + '</div ></a>'
    );
    var $date = $(
      '<div class="date"><mark>PUBLISHED AT: ' + date + '<mark></div >'
    );
    var $subtitle = $('<div class="subtitle">' + subtitle + '</div >');
    var $blurb = $('<div class="blurb">' + blurb + '</div >');
    var $artUrl = $(
      '<a  href=' +
        artUrl +
        "><img class='arrow' src='./assets/readartarrow.png'></a>"
    );

    // headlines.push(title);
    // console.log(headlines[20]);
    // module.exports = {headlines: headlines};

    articleHolder.push({
      title: $title,
      date: $date,
      subtitle: $subtitle,
      blurb: $blurb,
      arturl: $artUrl,
      id: i
    });
  }

  for (var i = 0; i < data.articles.length; i++) {
    var thumbnail = data.articles[i].urlToImage;
    // console.log(thumbnail);

    var $thumbnail = $(
      `<img class ='thumbnail' src=${thumbnail} data-article=${i}> <br>`
    );

    $('.thumbnail-feed').append($thumbnail);
  }

  // $('.thumbnail').each(function(){
  //     $(this).parallax("50%", 0.6);
  //  });

  // $('.thumbnail').parallax({imageSrc: thumbnail});

  $('.thumbnail').mouseover(function() {
    $('.front-page-feed').empty();
    var id = $(this).attr('data-article');
    console.log(id);

    articleHolder.forEach(function(article) {
      // console.log(article.id)

      if (id == article.id) {
        var editedBlurb = article.blurb[0].innerText.split('[')[0];

        console.log(editedBlurb);
        var $editedBlurb = $(
          '<div class="edited-blurb">' + editedBlurb + '</div>'
        );
        $('.front-page-feed').append(
          article.title,
          article.date,
          article.subtitle,
          $editedBlurb,
          article.arturl
        );
      }
    });
  });
}

// var x;
// var index = 0;

// function setup() {
//     createCanvas(1000, 100);
//     x = width;
// }

// function draw() {
//     background(255);
//     fill(0);

//     // Display headline at x  location
//     // textFont(f,16);
//     textAlign(LEFT);
//     text(headlines[index],x,180);

//     // Decrement x
//     x = x - 3;

//     // If x is less than the negative width,
//     // then it is off the screen
//     var w = textWidth(headlines[index]);
//     if (x < -w) {
//       x = width;
//       index = (index + 1) % headlines.length;
//     }
//   }

//   setup();
//   draw();

///              FILTERING ALGORITHM                   ///

var search;

function findCountry(name) {
  var countryAcr = 'https://restcountries.eu/rest/v2/name/{' + name + '}';
  var countryRef = '';
  $.ajax({
    url: countryAcr,
    method: 'GET',
    error: function() {
      console.log('error');
    },
    success: function(data) {
      return data[0].alpha2Code;
    }
  });
}

function showAlternativeSideNews(manipulateData) {
  if (fromSearch) {
    return commonView(manipulateData); //immediately picks out the more suitable Data Points
  } else {
    var query = 'SELECT * FROM ratingSitesUS WHERE id IN (?)';
    connection.query(query, manipulateData.articles[0].source.id, function(
      err,
      res
    ) {
      if (err) {
        callAPI(manipulateData.articles[0]);
      } else {
        callAPI(manipulateData.articles[0]);
      }
    });
  }
}

function callAPI(parameter) {
  var search = parameter.description;

  $.get(`/newsapi/search/${search}`).then(data => {
    displayArticles(commonView(data));
  });
}

function commonView(manipulateData) {
  // chooses the reliable sites and the points that are different from the common results and displays them

  var commonPoints = [];
  var chosenAltData = [];
  var tempAltData = [];
  for (var i; manipulateData.totalResults - 1; i++) {
    var query = 'SELECT * FROM ratingSitesUS WHERE id IN (?)';
    connection.query(query, manipulateData.articles[i].source.id, function(
      err,
      res
    ) {
      if (err) {
        return manipulateData;
      } else {
        if (res.reliabilityRating > 3) {
          //making sure article is reliable
          commonPoints.push(res.conservativeRating); //adding conservative rating for calculation
          if (tempAltData.length < 20) {
            tempAltData.push(manipulateData.articles[i]);
          }
        }
      }
    });
  }
  //calculate commonPoints average
  var average = commonPoints[0];
  for (var i = 1; i < commonPoints.length; i++) {
    average += commonPoints[i];
  }
  average = commonPoints[0] / commonPoints.length - 1;

  for (var i = 1; i < commonPoints.length; i++) {
    if (average > commonPoints[i] + 3 || average < commonPoints[i] - 3) {
      chosenAltData.push(tempAltData[i]);
      tempAltData[i] = null;
    }
  }

  for (var i = 1; i < tempAltData.length; i++) {
    if (tempAltData[i] != null) {
      chosenAltData.push(tempAltData[i]);
    }
  }
  return chosenAltData;
}

function mixSearchResults(manipulateData) {
  //manipulate if there is time

  return manipulateData;
}

function chooseAlternateCountryViews(manipulateData) {
  /*
        if (key words in headline, name of another country, middle east, central america, reference
            to foreign affairs. make a db table or an array of key words for reference)
                find other data from foreign tagged news sources
        else    
    */

  return manipulateData;
}

function keyWord() {
  var querySites = [];
}

function loosenCategoryParameters(data) {
  /*
        data--> whatever interests the user has. Takes it in and 
        manipulates (search, and top 20 methods so that you check
        key words in the title for sports terms as well as 
        choosing through category)
    */

  return data;
}
