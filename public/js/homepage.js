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
      const $userInfo = $('<a>');
      $userInfo.attr('class', 'navbar-brand');
      $userInfo.attr('id', 'user-info');
      $userInfo.html(data.user.username);
      $userInfo.attr('href', '/profile');
      $header.append($userInfo);
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
});


///                 TOP HEADLINES                    ///
var frontPage;
var articleHolder = [];
var queryURL = 'https://newsapi.org/v2/top-headlines?' +
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

        
        var $title = $("<a href=" + artUrl + '><div class="title">' + title + "</div ></a>");
        var $date = $('<div class="date"><mark>PUBLISHED AT: ' + date + "<mark></div >");
        var $subtitle = $('<div class="subtitle">' + subtitle + "</div >");
        var $blurb = $('<div class="blurb">' + blurb + "</div >");
        var $artUrl = $("<a href=" + artUrl + ">READ ARTICLE</a>")




        articleHolder.push(
            {
                title: $title,
                date: $date,
                subtitle: $subtitle,
                blurb: $blurb,
                arturl: $artUrl,
                id: i   
            }
        )
       
    }


    for (var i = 0; i < data.articles.length; i++) {
      var thumbnail = data.articles[i].urlToImage;
      // console.log(thumbnail);

        var $thumbnail = $(`<img class ='thumbnail' src=${thumbnail} data-article=${i}> <br>`)

      $('.thumbnail-feed').append($thumbnail);
    }


    $(".thumbnail").mouseover(function () {
        $(".front-page-feed").empty();
        var id = $(this).attr("data-article");
        console.log(id)
        
        articleHolder.forEach(function(article){
            // console.log(article.id)


            
            if(id == article.id){

              
                var editedBlurb = article.blurb[0].innerText.split('[')[0];

                console.log(editedBlurb);
                var $editedBlurb = $('<div class="edited-blurb">' + editedBlurb + "</div>")
                $(".front-page-feed").append(article.title, article.date, article.subtitle, $editedBlurb, article.arturl);

            }
        })
    })


}







///                 SEARCH QUERY                   ///
var search

var countryAcr = 'https://restcountries.eu/rest/v2/name/{' + 'UK' + '}';
var countryRef = ""
    $.ajax({
        url: queryURL,
        method: "GET",
        error: function () {
            console.log("error");
        },
        success: function (data) {
            countryRef = data[0].alpha2Code;
        }
    });

var url = 'https://newsapi.org/v2/everything?' +
    'q=' + search + '&' +
    'from=2019-01-10&' +
    'sortBy=popularity&' +
    'apiKey=abf7b2766a1549eca7580d1b261d5838';

//pseuocode: on click of submit button, user input = search, and call processData. 

// search = $("#search-input").val();
// console.log(search);








  // on click of submit button, user input = search, and call processData.


  ///                 RIP OUT SOURCES FOR FILTERING ALGORITHM                   ///










///              FILTERING ALGORITHM                   ///

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

function keyWord(){
    var querySites = [];
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

///                 RIP OUT SOURCES FOR FILTERING ALGORITHM                   ///
