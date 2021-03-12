const btnAnimation = document.querySelectorAll('.opros__btn_animation');
const pageContent = document.querySelector('.content');
const pageIFooter = document.querySelector('.footer');

btnAnimation.forEach((el) => {
	el.addEventListener('click', () => {
		pageContent.classList.add('content_opened');
		pageIFooter.classList.add('footer_opened');
		window.scrollBy ({top: 800, behavior: 'smooth'})
		
	})
})
