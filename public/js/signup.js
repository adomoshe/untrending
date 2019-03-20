'use strict';

$(document).ready(() => {
  const registerUser = categories => {
    $.post('/api/categories', {
      categories
    })
      .then(data => {})
      .catch(err => {});
  };

  $('#categories-submit').on('click', event => {
    event.preventDefault();
    const categories = {
      business: $('#business').prop('checked'),
      entertainment: $('#entertainment').prop('checked'),
      health: $('#health').prop('checked'),
      science: $('#science').prop('checked'),
      sports: $('#sports').prop('checked'),
      technology: $('#technology').prop('checked')
    };
    registerUser(categories);
    const path = window.location.href.replace('/signup', '/');
    window.location.replace(path);
  });
});

$(document).ready(() => {
  // $(".full-form").hide();
  $('.welcome').hide();
  $('.whats-your-name').hide();
  $('.categories').hide();
  showHello = setTimeout(nextLine, 1500);
});

let showHello;
let showWelcome;

const nextLine = () => {
  $('.hello').hide();
  $('.welcome').fadeIn();
  showWelcome = setTimeout(nextLineTwo, 1500);
};

const nextLineTwo = () => {
  $('.welcome').hide();
  $('.categories').fadeIn();

  $('#categories-submit').on('click', e => {
    e.preventDefault();
    const categories = {
      business: $('#business').prop('checked'),
      entertainment: $('#entertainment').prop('checked'),
      health: $('#health').prop('checked'),
      science: $('#science').prop('checked'),
      sports: $('#sports').prop('checked'),
      technology: $('#technology').prop('checked')
    };
    registerUser(categories);
    const path = window.location.href.replace('/signup', '/');
    window.location.replace(path);
  });
};
