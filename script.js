/** @format */

'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
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

// ************************ Selecting elements ************************//

const header = document.querySelector('.header');

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
