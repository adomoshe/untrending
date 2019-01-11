
'use strict';

$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get('/api/user_data').then(data => {
    $('.username').text(data.displayName);
  });
});

var manipulateData;


function buildQueryURL() {
var articleItems = [artTitle, artSource, artDescription, datePublished, artContent, artImage, artUrl];


///                 TOP HEADLINES                    ///
var frontPage;
var country;
var category;
var queryURL = 'https://newsapi.org/v2/top-headlines?' +
    'country='+ country +'&category=' + category + 
    '&apiKey=b0c7c3494d7f4f67aab159c80198a834';

    country = $("#country-input").val();
    category = $("#category-input").val();
 

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


        var $title = $("<a href=" + artUrl + '><div class="title">' + title + "</div ></a>");
        var $date = $('<div class="date">Date: ' + date + "</div >");
        var $subtitle = $("<a href=" + artUrl + '><div class="description">' + subtitle + "</div ></a>");
        var $blurb = $('<div class="blurb">' + blurb + "</div >");
        $(".front-page-feed").append($title, $subtitle, $date, $blurb);

        console.log(artUrl);
    }

    for (var i = 0; i < data.articles.length; i++) {
        var thumbnail = data.articles[i].urlToImage;
        console.log(thumbnail);

        var $thumbnail = $("<img class ='thumbnail' src=" + thumbnail + ">")

        $(".thumbnail-feed").append($thumbnail)
    }   
}


//                         SOURCES QUERY
var source;
var queryUrl = 'https://newsapi.org/v2/top-headlines?' + 
   'sources=' + source + '&apiKey=b0c7c3494d7f4f67aab159c80198a834'
source = $("#search-input").val();   
console.log(search);




///                 SEARCH QUERY                   ///
var search;
var queryUrl = 'https://newsapi.org/v2/everything?' +
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
  //just a rnm comment
 
  
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

//



function showAlternativeSideNews(manipulateData){

    /*
    ** 
    input: data from current article being viewed
        OR
    input: data points from search query
        if (from search query)
            commonPoints = find CommonViewPointShownRatio(manipulateData)
        else 
            commonPoints = give article a certain point

    using commonPoints -- find articles from sources close the common points, and 1/4 of articles from differing POV

    */

    return manipulateData;
}

// pulls the average common point value of the different sources that come up as results in the search query
function commonView(manipulateData){
    /*
        // put points in an array
        // check for outliers, 
            if there are outliers (checking for 1-3 vs 7-10 conservative level) 
                find more frequent of the two sides, and pick the one that is more frequent
                frequency depends on 5 results more to one side
                    if one is more frequent then choose that and return (that common point)
            else 
                return (average);
                
    */
}

function mixSearchResults(manipulateData){
//manipulate if there is time

    return manipulateData;
}

function chooseAlternateCountryViews(manipulateData){ 
    /*
        if (key words in headline, name of another country, middle east, central america, reference
            to foreign affairs. make a db table or an array of key words for reference)
                find other data from foreign tagged news sources
        else    
    */

    return manipulateData;
}


function loosenCategoryParameters(data){


    /*
        data--> whatever interests the user has. Takes it in and 
        manipulates (search, and top 20 methods so that you check
        key words in the title for sports terms as well as 
        choosing through category)
    */

    return data;
}

