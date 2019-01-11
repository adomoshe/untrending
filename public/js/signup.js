'use strict';
$(document).ready(() => {
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
    window.location = 'http://localhost:5000/';
  });

  const registerUser = categories => {
    $.post('/api/categories', {
      categories
    })
      .then(data => {
        console.log('Registered user');
      })
      .catch(err => {
        console.log(err);
      });
  };
});
