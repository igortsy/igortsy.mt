(function(){

	const intro =  document.getElementsByClassName('intro')[0];
	const introHeight = intro.offsetHeight;
	const header = document.getElementsByClassName('header')[0];

	const navToggle = document.getElementsByClassName('nav-toggle')[0];
	const nav = document.querySelector('nav');
	let accordionHeaders = document.querySelectorAll('.accordion__header');

	/*fixed header*/
	checkScroll();
	window.addEventListener('scroll',function(e){
		checkScroll();

	})

	function checkScroll(){
		if(window.pageYOffset >= introHeight){
			header.classList.add('fixed');
		}
		else{
			if(header.classList.contains('fixed')){
				header.classList.remove('fixed');
			}
		}
	}

	/*Smoth scroll*/
	function anim(duration) {
    var temp;
    return function(sel) {
        cancelAnimationFrame(temp);
        var start = performance.now();
        var from = window.pageYOffset || document.documentElement.scrollTop,
        to = document.querySelector(sel).getBoundingClientRect().top;
        requestAnimationFrame(function step(timestamp) {
            var progress = (timestamp - start) / duration;
            1 <= progress && (progress = 1);
            window.scrollTo(0, from + to * progress | 0);
            1 > progress && (temp = requestAnimationFrame(step))
        })
    }
};
	var scrollMenu = anim(600)

	let elems = document.querySelectorAll('[data-scroll]');

	for(let link of elems){

		link.addEventListener('click',function(e){
			const activeEl = document.querySelector('.nav__link.active ');
			if(activeEl)
			activeEl.classList.remove('active');
			this.classList.add('active');
			const selector = this.dataset.scroll;
			scrollMenu(selector)
			if(navToggle.classList.contains('active')){
				nav.style.display = 'none';
				navToggle.classList.remove('active');
			}
			e.preventDefault()

		})
	}
	/*BurgerMenu*/

	navToggle.addEventListener('click',function(e){
		this.classList.toggle('active');

		if(this.classList.contains('active')){
			nav.style.display = 'block';
		}
		else{
			nav.style.display = 'none';
		}
	})

	/*ACCORDION*/
	for(let header of accordionHeaders){
		header.addEventListener('click', function(e){
			let accordionItem = this.closest('.accordion__item');
			if(accordionItem){
				accordionItem.classList.toggle('active');
			}
		})
	}
})();