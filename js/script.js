/* eslint-disable prefer-arrow-callback */
const modalBtn = $('.present__btn');
const modalOrder = $('.modal-order');

modalBtn.click(function() {
  modalOrder.show(500);
});

const modalOrderInput = $('.modal-order__input');
const modalOrderTitle = $('.modal-order__title');

modalOrderInput.focus(function() {
  modalOrderTitle
    .text(`Введите ${$(this).attr('placeholder').toLowerCase()}`);
});

modalOrderInput.blur(function() {
  modalOrderTitle.text('Заполните форму');
});

$('.modal-order__form').submit(function(event) {
  event.preventDefault();
  $.ajax({
    url: 'https://jsonplaceholder.typicode.com/todos',
    type: 'POST',
    data: $(this).serialize(),
    success: function(data) {
      modalOrderTitle.text(data.id);
      $('.modal-order__form').slideUp(300);
    },
    error() {
      modalOrderTitle.text('Что-то пошло не так');
    },
  });
});

// Домашнее задание:

const modalClose = $('.modal-order__close');

modalOrder.on('click', function(e) {
  const target = e.target;
  if ($(target).closest(modalClose).length ||
    !$(target).closest('.modal-order__wrapper').length) {
    $(this).hide(500);
  } else {
    return;
  }
});

const headerNav = $('.navigation');
const navClose = $('.navigation__close');

$('.header__burger').on('click', function() {
  headerNav.animate({
    left: 0,
  }, 500, function() {
    navClose.animate({
      opacity: 1,
    }, 300, 'swing', function() {
      $('body').on('click', function(e) {
        const target = e.target;
        if (!$(target).closest('.navigation').length ||
          $(target).closest(navClose).length) {
          headerNav.animate({
            left: -400,
          }, 500);

          navClose.animate({
            opacity: 0,
          }, 300);
        } else {
          return;
        }
        $('body').off('click');
      });
    });
  });
});

