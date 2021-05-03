$(document).ready(function () {
  $('.gallery-work').magnificPopup({
    delegate: 'a.work',
    type: 'image',
    gallery: {
      enabled: true,
    },
  });
});
