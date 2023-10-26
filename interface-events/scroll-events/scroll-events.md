Ось невелика функція для відображення поточного прокручування:

window.addEventListener('scroll', function() {
  document.getElementById('showScroll').innerHTML = window.pageYOffset + 'px';
});

#### Запобігання прокручування

Ми не можемо запобігти прокручуванню за допомогою event.preventDefault() у прослуховувачі onscroll, оскільки він запускається після прокручування.

Але ми можемо запобігти прокручуванню за допомогою event.preventDefault() для події, яка його викликає, наприклад, події keydown для pageUp та pageDown.

Існує багато способів ініціювати прокручування, тому надійніше використовувати CSS, а саме властивість overflow.

