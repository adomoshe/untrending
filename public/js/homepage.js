'use strict';
$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  // $.get('/api/user_data').then(data => {
  //   $('.username').text(data.displayName);
  // });
});





///                 TOP HEADLINES                    ///
var frontPage;
var queryURL = 'https://newsapi.org/v2/top-headlines?' +
    'country=us&' +
    'apiKey=b0c7c3494d7f4f67aab159c80198a834';

$.ajax({
    url: queryURL,
    method: "GET",
    error: function () {
        console.log("error");
    },
    success: function (data) {
        processData(data);
    }
});

function processData(data) {
    var articleItems = [artTitle, artSource, artDescription, datePublished, artContent, artImage, artUrl];

    for (var i = 0; i < data.articles.length; i++) {

        var artTitle = data.articles[i].title;
        console.log(artTitle);

        var artSource = data.articles[i].source.name;
        console.log(artSource); 

        var artDescription = data.articles[i].description;
        console.log(artDescription);

        var datePublished = data.articles[i].publishedAt;
        console.log(datePublished);

        var artContent = data.articles[i].content;
        console.log(artContent);


        var artImage = data.articles[i].urlToImage;
        console.log(artImage);

        var artUrl = data.articles[i].url;
        console.log(artUrl);


        var $artTitle = $("<a href=" + artUrl + '><div class="title">' + artTitle + "</div ></a>");
        var $datePublished = $('<div class="date">Date: ' + datePublished + "</div >");
        var $artDescription = $("<a href=" + artUrl + '><div class="description">' + subtitle + "</div ></a>");
        var $artContent = $('<div class="blurb">' + artContent + "</div >");
        $(".front-page-feed").append($artTitle, $artDescription, $datePublihed, $artContent);
        console.log(artUrl);
    }

    for (var i = 0; i < data.articles.length; i++) {
        var thumbnail = data.articles[i].urlToImage;
        console.log(thumbnail);

        var $thumbnail = $("<img class ='thumbnail' src=" + thumbnail + ">")

        $(".thumbnail-feed").append($thumbnail)
    }   
}


///                 SEARCH QUERY                   ///
var search;
var url = 'https://newsapi.org/v2/everything?' +
          'q='+ search +'&' +
          'from=2019-01-10&' +
          'sortBy=popularity&' +
          'apiKey=b0c7c3494d7f4f67aab159c80198a834';




search = $("#search-input").val();
console.log(search);

// CLICK HANDLERS
// ==========================================================

// on click of submit button, user input = search, and call processData. 
$("#search-input").on("click", function(event) {
   
    event.preventDefault();
  
 
  
    // Build the query URL for the ajax request to the NYT API
    var queryURL = buildQueryURL();
  
    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the processData function
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(processData);
  });
  
  //  .on("click") function associated with the clear button
  $("#clear-all").on("click", clear);









<<<<<<< HEAD
///                 RIP OUT SOURCES FOR FILTERING ALGORITHM                   ///
=======
///                 RIP OUT SOURCES FOR FILTERING ALGORITHM                   ///


///code algorithm here///
>>>>>>> 490df8ada71f7a0a0642aae8984eb1e64f4c7c85
