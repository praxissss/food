/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc(){
    const  result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if(localStorage.getItem('sex')){
        sex = localStorage.getItem('sex');
    }else{
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if(localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio');
    }else{
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }


    caclTotal();

    localSettings('#gender div', 'calculating__choose-item_active');
    localSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    getStaticInfo('#gender div', 'calculating__choose-item_active');
    getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');
    getDynamicInfo('#weight');
    getDynamicInfo('#height');
    getDynamicInfo('#age');


    function caclTotal(){
        if(!sex || !height || !weight || !age || !ratio){
            result.textContent = "____";
            return;
        }

        if(sex == 'female'){
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }else{
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    function getStaticInfo(selector, activeClass){
        const elem = document.querySelectorAll(selector);

        elem.forEach(item =>{
            item.addEventListener('click', (event)=>{
                if(event.target.getAttribute('data-ratio')){
                    ratio = +event.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +event.target.getAttribute('data-ratio'));
                }else{
                    sex = event.target.getAttribute('id');
                    localStorage.setItem('sex', event.target.getAttribute('id'));
                }
    
                elem.forEach(item =>{
                    item.classList.remove(activeClass);
                });                    
                event.target.classList.add(activeClass);
                caclTotal();
            });
        });
    }

    function getDynamicInfo(selector){
        const input = document.querySelector(selector);

        input.addEventListener('input', ()=>{

            if(input.value.match(/\D/g)){
                input.style.border = '1px solid red';
            }else{
                input.style.border = '';
            }

            switch(input.getAttribute('id')){
                case  'height':
                    height = +input.value;
                    break;
                case  'weight':
                    weight = +input.value;
                    break;
                case  'age':
                    age = +input.value;
                    break;
            }
            caclTotal();
        });
    }

    function localSettings(selector, activeClass){
        const elem = document.querySelectorAll(selector);

        elem.forEach(item =>{
            item.classList.remove(activeClass);
            if(item.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                item.classList.add(activeClass);
            }
            if(item.getAttribute('id') === localStorage.getItem('sex')){
                item.classList.add(activeClass);
            }
        }); 
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards(){
    class MenuCard{
        constructor(img, altimg, title, descr, price, parentSelector, ...classes){
            this.cardImg = img;
            this.cardAltImg = altimg;
            this.cardName = title;
            this.cardText = descr;
            this.cardPrice = price;
            this.parentSelector = document.querySelector(parentSelector);
            this.classes = classes;
            this.currencyTransfer = 27;
            this.changeToUAH();
        }

        changeToUAH(){
            this.cardPrice =this.cardPrice * this.currencyTransfer;
        }

        render(){
            const elem = document.createElement('div');
            if(this.classes.length === 0) {
                this.classes[0] = 'menu__item';
            }
            this.classes.forEach(className => elem.classList.add(className));
            elem.innerHTML = `
                <img src="${this.cardImg}" alt="${this.cardAltImg}">
                <h3 class="menu__item-subtitle">${this.cardName}</h3>
                <div class="menu__item-descr">${this.cardText}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.cardPrice}</span> грн/день</div>
                </div>
            `;
            this.parentSelector.append(elem);
            }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
    .then(data =>{
        data.forEach(({img, altimg, title, descr, price}) =>{
            new MenuCard(img, altimg, title, descr, price, '.menu__field > .container').render();
        });
    });
    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data, '.menu__field > .container'));

    // function createCard(data, parent){
    //     data.forEach(({img, altimg, title, descr, price}) =>{
    //         const elem = document.createElement('div');
    //         elem.classList.add('menu__item');

    //         elem.innerHTML = `
    //             <img src="${img}" alt="${altimg}">
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;
    //         document.querySelector(parent).append(elem);
    //     });
    // } 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // const fitnes = new MenuCard(
    //     "img/tabs/vegy.jpg", 
    //     'vegy', 
    //     'Меню "Фитнес"', 
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: ',
    //     9, 
    //     '.menu__field > .container'
    //     );
    // fitnes.render();

    // const premium = new MenuCard(
    //     'img/tabs/elite.jpg', 
    //     'elite', 
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и',
    //     14, 
    //     '.menu__field > .container',
    //     'menu__item'
    //     );
    // premium.render();

    // const simple = new MenuCard(
    //     'img/tabs/post.jpg', 
    //     'post', 
    //     'Меню "Постное"', 
    //     'Меню “Постное” - это тщательный подбор ингредиентов: .', 
    //     21, 
    //     '.menu__field > .container',
    //     'menu__item'
    //     );
    // simple.render();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector ,modalTimeout){
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Success',
        failure: 'Error'
    };

    forms.forEach(item =>{
        bindPostData(item);
    });

    function bindPostData(form){
        form.addEventListener('submit', (event) =>{
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            // const objectJson = {};
            // formData.forEach((value, key) =>{
            //     objectJson[key] = value;
            // });
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // fetch('server.php', {
            //     method: "POST", 
            //     headers: {
            //         'Content-type': 'application/json'
            //     },
            //     body: JSON.stringify(objectJson)
            // })
            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
            // .then(data => data.text())
            .then(data =>{
                console.log(data);
                showThanks(message.success);
            }).catch(()=>{
                showThanks(message.failure);
            }).finally(()=>{
                statusMessage.remove();
                event.target.reset();
            });

            // const json = JSON.stringify(objectJson);
            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');
            // request.setRequestHeader('Content-type', 'application/json');
            // request.send(json);
            // request.addEventListener('load', () =>{
            //     if(request.status === 200){
            //         showThanks(message.success);
            //         event.target.reset();
            //         statusMessage.remove();
            //     }else{
            //         showThanks(message.failure);
            //         statusMessage.remove();
            //     }
            // });
        });
    }

    function showThanks(message){  
        const prevModal = document.querySelector('.modal__dialog');
        prevModal.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimeout);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class = "modal__content">
                <div class = "modal__close" data-close>&times;</div>
                <div class = "modal__title">${message}</div>
            </div>
        `;
        document.querySelector(".modal").append(thanksModal);
        
        setTimeout(() =>{
            thanksModal.remove();
            prevModal.classList.add('show');
            prevModal.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 3000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimer){
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.classList.add("show");
    modalWindow.classList.remove("hide");
    document.body.style.overflow = "hidden";

    if(modalTimer){
        clearInterval(modalTimer);
    }
}

function closeModal(modalSelector){
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.classList.add("hide");
    modalWindow.classList.remove("show");
    document.body.style.overflow = "";
}

function modal(trigger, modalSelector, modalTimer){
    const modalBtn = document.querySelectorAll(trigger);
    const modalWindow = document.querySelector(modalSelector);
    
    modalBtn.forEach(item =>{
        item.addEventListener("click", () => openModal(modalSelector, modalTimer));
    });

    modalWindow.addEventListener("click", (event) =>{
        if(event.target === modalWindow || event.target.getAttribute('data-close') == ''){
            closeModal(modalSelector);
        }
    });

    document.addEventListener("keydown", (event) =>{
            if(event.code === "Escape" && modalWindow.classList.contains("show")){
                closeModal(modalSelector);
            }
    }); 

    window.addEventListener("scroll", showModalByScroll);

    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1){
            openModal(modalSelector, modalTimer);
            window.removeEventListener("scroll", showModalByScroll);
        }
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCountre, wrapper, innerPart}){
    const slides = document.querySelectorAll(slide);
    const slider = document.querySelector(container);
    const sliderBtnPrev = document.querySelector(prevArrow);
    const sliderBtnNext = document.querySelector(nextArrow);
    const currentSlide = document.getElementById(currentCountre);
    const totalAmountOfSlides = document.getElementById(totalCounter);
    const slidesWrapper = document.querySelector(wrapper);
    const slideField = document.querySelector(innerPart);
    const width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1;
    let offset = 0;
    const rotation = setInterval(nextSlide, 7000);

    if(slides.length < 10){
        totalAmountOfSlides.textContent = '0' + slides.length;
        currentSlide.textContent =`0${slideIndex}`;
    }else{
        totalAmountOfSlides.textContent = slides.length;
        currentSlide.textContent =slideIndex;
    }

    slideField.style.width = 100 * slides.length + '%';
    slideField.style.display = 'flex';
    slideField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';


    slides.forEach(slide =>{
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    const dots =[];

    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for(let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if(i==0){
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    sliderBtnNext.addEventListener('click', ()=>{
        nextSlide();
        clearInterval(rotation);
    });

    sliderBtnPrev.addEventListener('click', ()=>{
        clearInterval(rotation);
        if(offset == 0){  
            offset = correctWidth(width) * (slides.length -1);
        }else{
            offset -= correctWidth(width);
        }

        slideField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == 1){
            slideIndex = slides.length;
        }else{
            slideIndex--;
        }
        
        correctZero();
        activeDot();
    });

    function nextSlide(){
        if(offset == correctWidth(width) * (slides.length -1)){
            offset = 0;  
        }else{
            offset += correctWidth(width);
        }

        slideField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == slides.length){
            slideIndex = 1;
        }else{
            slideIndex++;
        }
        
        correctZero();
        activeDot();
    }

    function activeDot(){
        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex -1].style.opacity = 1;
    }

    function correctZero(){
        if(slides.length < 10){
            currentSlide.textContent = `0${slideIndex}`;
        }else{
            currentSlide.textContent= slideIndex;
        }
    }

    function correctWidth(width){
        return +width.replace(/\D/g, '');
    }

    dots.forEach(item =>{
        item.addEventListener('click', (e)=>{
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = correctWidth(width) * (slideTo  -1);
            slideField.style.transform = `translateX(-${offset}px)`;
            correctZero();
            activeDot();
            clearInterval(rotation);

        });
    });

    // let slideIndex = 0;
    // (slides.length < 10) ?
    // totalAmountOfSlides.textContent = '0' + slides.length
    // : totalAmountOfSlides.textContent = slides.length;

    // slides.forEach((item, index)=>{
    //     item.classList.add(index);
    //     item.classList.add('hide');
    // });

    // slides[0].classList.add('show');
    // slides[0].classList.remove('hide');
    // sliderBtnPrev.addEventListener('click', ()=>{
    //     if(slideIndex == 0){
    //         changeSlide(slideIndex = 3);
    //     }else{
    //         changeSlide(--slideIndex);
    //     }
    // });

    // sliderBtnNext.addEventListener('click', ()=>{
    //     if((slideIndex + 1) >= slides.length){
    //         changeSlide(slideIndex = 0);
    //     }else{
    //         changeSlide(++slideIndex);
    //     }
    // });

    // function changeSlide(index){
    //     ((index + 1) < 10) ?
    //     currentSlide.textContent = `0${index + 1}`
    //     : currentSlide.textContent = index + 1;
    //     slides.forEach(item=>{
    //         item.classList.add('hide');
    //         item.classList.remove('show');
    //         if(item.classList.contains(index)){
    //             item.classList.add('show');
    //             item.classList.remove('hide');
    //         }
    //     });
    // }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass){
    const tabs = document.querySelectorAll(tabsSelector);
    const tabsContent = document.querySelectorAll(tabsContentSelector);
    const tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent(){
        tabsContent.forEach(item =>{
            item.classList.add("hide");
            item.classList.remove("show");
        });
        tabs.forEach(item =>{
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0){
        tabsContent[i].classList.add("show");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (event) =>{
        const target = event.target;

        if(target && target.classList.contains(tabsSelector.slice(1))){
            tabs.forEach((item, index) =>{
                if(target == item){
                    hideTabContent();
                    showTabContent(index);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadLine){ 

    function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date());
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        const min = Math.floor((t / 1000 / 60) % 60);
        const sec = Math.floor((t / 1000) % 60);

        return{
            "total" : t,
            "days": days,
            "hours": hours,
            "minutes": min,
            "sec": sec
        };
    }

    function getZero(num){
        if(num >= 0 && num < 10){
            return `0${num}`;
        }else{
            return num;
        }
    }

    function setClock(selector, endtime){
        const timer = document.querySelector(selector);
        const days = timer.querySelector("#days");
        const hours = timer.querySelector("#hours");
        const minutes = timer.querySelector("#minutes");
        const sec = timer.querySelector("#seconds");
        const timeInterval = setInterval(updClock, 1000);

        updClock();

        function updClock(){
            const t = getTimeRemaining(endtime);  

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            sec.innerHTML = getZero(t.sec);

            if(t.total <= 0){
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadLine);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) =>{
    const res = await fetch(url, {
        method: "POST", 
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await res.json();
};

const getResource = async (url) =>{
    const res = await fetch(url);

    if(!res.ok){
        throw new Error(`Error${url}, status: ${res.status}`);
    }

    return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");











document.addEventListener("DOMContentLoaded", () =>{
    const modalTimeout = setTimeout(() =>{
        (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal', modalTimeout);
    }, 50000);

    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])('form', modalTimeout);
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])("[data-modal]", '.modal', modalTimeout);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-prev',
        prevArrow: '.offer__slider-next',
        totalCounter: 'total',
        currentCountre: 'current',
        wrapper: '.offer__slider-wrapper',
        innerPart: '.offer__slider-inner'
    });
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', "2022-05-11");
});   
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map