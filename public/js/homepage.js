'use strict';
$(document).ready(() => {
  ///                 NAV BAR                 ///
  $('.unfold-nav').hide();
  $('.categories-list').hide();
  $('#fold-nav-line').on('click', () => {
    $('#fold-nav-line').hide();
    $('.unfold-nav').show();

    $('#unfold-nav-logo').mouseover(() => {
      $('.categories-list').show();
      $('.nav-category').on('click', () => {
        // needs to refilter newsfeed by topic
      });
    });

    $('#x').on('click', () => {
      $('#fold-nav-line').show();
      $('.unfold-nav').hide();
      $('.categories-list').hide();
    });
  });

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
      categoriesCall();
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
  $.get('api/news/trending').then(data => {
    displayArticles(data.response.articles);
  });
};

const categoriesCall = () => {
  $.get(`api/news/categories`).then(data => {
    data.articleArr.forEach(choice => {
      displayArticles(choice);
    });
  });
};

$('#search-btn').on('click', event => {
  event.preventDefault();
  const query = $('#search-input')
    .val()
    .trim()
    .toLowerCase();
  document.getElementById('search-form').reset();
  $.get(`api/news/search/${query}`).then(data => {
    displayArticles(data.response.articles);
  });
});

const articleHolder = [];
const displayArticles = article => {
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
        `<img class='thumbnail' src=${thumbnail} data-article=${
          articleHolder.length
        }> <br>`
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
