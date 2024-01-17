/** @format */

'use strict';

const nav = document.querySelector('.nav');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// ************************ Modal window ************************//

const openModal = function (e) {
	e.preventDefault();
	modal.classList.remove('hidden');
	overlay.classList.remove('hidden');
};

const closeModal = function () {
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
	if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
		closeModal();
	}
});

// Implementing smooth scrolling

btnScrollTo.addEventListener('click', function (e) {
	// This is used to get the location of section 1
	const s1coords = section1.getBoundingClientRect();

	// Scrolling
	// window.scrollTo(s1coords.left + window.scrollX, s1coords.top + window.scrollY);

	// For smooth Scrolling

	// Old way
	// window.scrollTo({
	// 	left: s1coords.left + window.scrollX,
	// 	top: s1coords.top + window.scrollY,
	// 	behavior: 'smooth',
	// });

	// New way
	section1.scrollIntoView({
		behavior: 'smooth',
	});
});

//////////////////////////////////////////////////
// Page navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
// 	el.addEventListener('click', function (e) {
// 		e.preventDefault();
// 		const id = this.getAttribute('href');
// 		document.querySelector(id).scrollIntoView({
// 			behavior: 'smooth',
// 		});
// 	});
// });

// ************************ Event Delegation ************************//
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
	e.preventDefault();

	// Matching strategy
	if (e.target.classList.contains('nav__link')) {
		const id = e.target.getAttribute('href');
		document.querySelector(id).scrollIntoView({
			behavior: 'smooth',
		});
	}
});

// ************************ Creating a Tabbed component ************************ //

tabsContainer.addEventListener('click', function (e) {
	const clicked = e.target.closest('.operations__tab');

	// guard clause
	// returns early when there is no click (Or in this case the parent element is clicked and not the buttons so it returns null, !null is true which makes the if statement correct and returns)
	if (!clicked) return;

	// Active tab
	tabs.forEach(t => t.classList.remove('operations__tab--active'));
	tabsContent.forEach(c => c.classList.remove('operations__content--active'));

	// Activate content area
	clicked.classList.add('operations__tab--active');
	document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

// *************** Menu fade animation ***************//
const handleHover = function (e) {
	if (e.target.classList.contains('nav__link')) {
		const link = e.target;
		const siblings = link.closest('.nav').querySelectorAll('.nav__link');
		const logo = link.closest('.nav').querySelector('img');

		siblings.forEach(el => {
			if (el !== link) {
				el.style.opacity = this;
			}
			logo.style.opacity = this;
		});
	}
};

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// *************** Sticky Navigation ***************//
const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
// 	if (window.scrollY > initialCoords.top) {
// 		nav.classList.add('sticky');
// 	} else {
// 		nav.classList.remove('sticky');
// 	}
// });

// const obsCallback = function (entries, observer) {
// 	entries.forEach(entry => console.log(entry));
// };

// const obsOptions = {
// 	// Null to check the intersection between section1 and the hole interface or window
// 	root: null,

// 	// Percentage of intesection at which the observer callback will be called
// 	threshold: [0, 0.2],

// 	// In this case when the section1 intersect the viewport at 10% the callBack function will get called
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);

// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
	const [entry] = entries;
	console.log(entry);
	if (!entry.isIntersecting) {
		nav.classList.add('sticky');
	} else {
		nav.classList.remove('sticky');
	}
};
const headerObserver = new IntersectionObserver(stickyNav, {
	root: null,
	threshold: 0,

	// A box of 90px that will be applied before the threshhold is applied. It is a visual margin
	// 90 is the height of the navbar
	rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
// ************************ Selecting elements ************************//

// const header = document.querySelector('.header');

// ************************ Create Elements ************************//

// Creating an element displaying a ssmall cookie message at the bottom of the page
const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML = 'We use cookies for improved functionality and analytics. <button class ="btn btn--close-cookie">Got it!</button>';

// header.prepend(message);
header.append(message);
// Cloning the element the true is to clone its child as well
// header.append(message.cloneNode(true));

// The message is put before or after the header
// header.before(message);
// header.after(message);

// ************************ Delete elements ************************//

// When the button is clicked remove the cookie message
document.querySelector('.btn--close-cookie').addEventListener('click', function () {
	message.remove();
});

// ************************ Styles ************************//
message.style.backgroundColor = '#37383d';
message.style.width = '104.1%';

// We can get the style from styles set in the javascript file and not CSS
// To get the style from CSS we use the getComputedStyle function as shown below
// console.log(message.style.color);
// console.log(message.style.backgroundColor);
// console.log(getComputedStyle(message).color);

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 20 + 'px';

// The root where the CSS variables are is equivilant to the document element in javascript

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// ************************ Attributes ************************//

// const logo = document.querySelector('.nav__logo');

//  (logo.alt);
// console.log(logo.className);

// logo.alt = 'Beautiful minimalist logo';

// ************************ Non-standard ************************//
// console.log(logo.designer);
// console.log(logo.getAttribute('designer'));
//logo.setAttribute('company', 'bankist');

// To get the absolute src use logo.src for the relative src use getAttribute Same goes for href attributes
// console.log(logo.src);
// logo.getAttribute('src');

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// ************************ Data attributes ************************//
// console.log(logo.dataset.versionNumber);

// Use dataset to store values in html by writing attribute starting with data

// ************************ Classes ************************//

// logo.classList.add();
// logo.classList.remove();
// logo.classList.toggle();
// logo.classList.contains();

// Don't use

// It overrides all classes and can't use more than one class
// logo.className = 'jonas'

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
// 	this.style.backgroundColor = randomColor();

// 	// Stop propagtion
// 	// e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
// 	this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
// 	this.style.backgroundColor = randomColor();
// });

// const h1 = document.querySelector('h1');

// // console.log(h1.querySelectorAll('.highlight'));
// // console.log(h1.childNodes); // All children even comments
// // console.log(h1.children); //Direcct children
// // h1.firstElementChild.style.color = 'white';
// // h1.lastElementChild.style.color = 'orangered';

// // Going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// // Closest receive a query string and finds the closest parent element that matches the string
// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// // Since the element itself is an h1 it will return itself
// console.log(h1.closest('h1'));

// // Going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// // For nodes
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);
// // To find all siblings the trick is moving to the parent element and then get all its children
// console.log(h1.parentElement.children);
// // An HTMLCollection is not an array but it is iterable

// [...h1.parentElement.children].forEach(function (el) {
// 	if (el !== h1) {
// 		el.style.transform = 'scale(0.5)';
// 	}
// });
