const body = document.body;
const burgerBtn = document.querySelector('.burger-btn');
const mobileMenu = document.querySelector('.header__mobile-menu');
const navigation = document.querySelector('.navigation');

console.log('hi')

burgerBtn.addEventListener('click', () => {
   mobileMenu.classList.toggle('open');
   burgerBtn.classList.toggle('burger-btn_rotaded');
   body.classList.toggle('scroll-hidden');
});

mobileMenu.addEventListener('click', (event) => {
   if (event.target === mobileMenu) {
      hideMenu();
   }
})

navigation.addEventListener('click', () => {
   if (mobileMenu.classList.contains('open')) {
      hideMenu();
   }
})

function hideMenu() {
   mobileMenu.classList.remove('open');
   burgerBtn.classList.remove('burger-btn_rotaded');
   body.classList.remove('scroll-hidden');
}