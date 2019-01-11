
'use strict';

$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get('/api/user_data').then(data => {
    $('.username').text(data.displayName);
  });
});

var manipulateData;

///                 TOP HEADLINES                    ///
var frontPage;
var articleHolder = [];
var queryURL = 'https://newsapi.org/v2/top-headlines?' +
    'country=us&' +
    'apiKey=abf7b2766a1549eca7580d1b261d5838';

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
        console.log(thumbnail);

        var $thumbnail = $(`<img class ='thumbnail' src=${thumbnail} data-article=${i}> <br>`)

        $(".thumbnail-feed").append($thumbnail)
    }


    $(".thumbnail").mouseover(function () {
        $(".front-page-feed").empty();
        var id = $(this).attr("data-article");
        console.log(id)
        articleHolder.forEach(function(article){
            // console.log(article.id)


            
            if(id == article.id){
                console.log(article)
                $(".front-page-feed").append(article.title, article.date, article.subtitle, article.blurb, article.arturl);
            }
        })
        // $(".front-page-feed").append($title, $subtitle, $date, $blurb);
    })


}

$(document).ready(function() {
    $(".unfold-nav").hide();
})


$(".fold-nav").mouseover(function() {
    // show active categories from user database
   $("#fold-nav-line").hide();
   $(".unfold-nav").show();
    console.log("hovering!");
})















///                 SEARCH QUERY                   ///
var search
var url = 'https://newsapi.org/v2/everything?' +
    'q=' + search + '&' +
    'from=2019-01-10&' +
    'sortBy=popularity&' +
    'apiKey=abf7b2766a1549eca7580d1b261d5838';

//pseuocode: on click of submit button, user input = search, and call processData. 

// search = $("#search-input").val();
// console.log(search);









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

///                 RIP OUT SOURCES FOR FILTERING ALGORITHM                   ///