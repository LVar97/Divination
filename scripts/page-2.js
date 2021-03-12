
function getTemplate(template, el) {
	const cardElement = document
		.querySelector(template)
		.content
		.querySelector(el)
		.cloneNode(true);
	return cardElement;
	
}

class Testbtn{
	constructor(text, template, el, page,reload , animation){
		this._text = text;
		this._temlate = template;
		this._el = el;
		this.page = page;
		this.reload = reload;
		this.animation = animation;
	}
	
	// _getTemplate(template, el) {
	// 	const cardElement = document
	// 		.querySelector(template)
	// 		.content
	// 		.querySelector(el)
	// 		.cloneNode(true);
	// 	return cardElement;
		
	// }
	generateCard() {
		console.log(this.animation)
		this._element = getTemplate(this._temlate, this._el);
		if (this.page === 3) {
			
			this._element.setAttribute("onclick", testRedirect())
			
		}
		
		this._setEventListeners();
		this._element.value = this._text;

		return this._element;
	}

	_getOptionsTemplate(i){
		const option = document.querySelector('.option-template').content.querySelector('.option').cloneNode(true);
		option.text = i;
		this._element.querySelector('.opros__input').append(option);
	}

	_setEventListeners() {
		if (this._element.classList.contains('opros__btn')){
			
			this._element.addEventListener('click', () => {
				console.log(this.page)
				if (this.page === 1){
					const day = handleInputChange(form.querySelector('#day'));
					const month = handleInputChange(form.querySelector('#month'));
					const year = handleInputChange(form.querySelector('#year'));

					Age = getAge(day,month-1,year);
					const inputArr = Array.from(form.querySelectorAll('.opros__input'));
					const a = [];

					inputArr.forEach( (el) => {
						a.push(checkInputValidity(el));
	
					})
					
					if (!a.some((el) => el === false)) {
						this._handleButtonClick();
					}
				

				} else {

					this._handleButtonClick();
				}
				
			})

		} else if (this._element.classList.contains('cards-input')){
			this._element.querySelector('.opros__input_placeholder').text= this._text

			if (this._text === "День"){
				this._element.querySelector('.opros__input').id = "day";
				for(let i = 1 ;i < 32 ; i++ ){
					let a = ""
					if(i < 10){
					 	a ="0"+i
						 this._getOptionsTemplate(a);
					}else{
					this._getOptionsTemplate(i);}
				}
					
			}else if (this._text === "Месяц"){
				this._element.querySelector('.opros__input').id = "month";
				for(let i = 1 ;i < 13 ; i++ ){
					let a = ""
					if(i < 10){
					 	a ="0"+i
						 this._getOptionsTemplate(a);
					}else{

					this._getOptionsTemplate(i);}
				}
					
			}else if (this._text === "Год"){
				this._element.querySelector('.opros__input').id = "year";
				
				for(let i = 2021 ;i > 1900 ; i-- ){
					this._getOptionsTemplate(i);
				}
				
			}
			// if (this.page === 3 ){
			// 	animationSound();
			// }
			
			this._handleInputText(this._element);
			


		}
	}
	
	_handleInputText(el) {
		
		const oprosInput = el.querySelector('.opros__input');

		oprosInput.addEventListener('change', function () {
			hideInputError(oprosInput);
			checkInputValidity(oprosInput);

		});

	}

	_handleButtonClick() {
		
		form.innerHTML= "";
		for( let i = 0; i < list.length; i++){
			if (Age !== '' && this.page === 2) {

				if ( 18 <= Age && Age <= 35){

					for( let j = 0; j < list.length; j++){

						if (list[j].id === 1){
							render(list[j]);
							// document.querySelector('.card__subtitle').classList.add('card__subtitle_message');
							// console.log(document.querySelector('.card__subtitle'))
						}
					}
					Age = '';
				}
				else if(36 <= Age && Age <= 45){

					for( let j = 0; j < list.length; j++){
						if (list[j].id === 2){
							render(list[j]);
						}
					}
					Age = '';
				
				}else if( Age >= 46){

					for( let j = 0; j < list.length; j++){
						if (list[j].id === 3){
							render(list[j]);
						}
					}
					Age = '';
				}
			}else if (this.page !== 2){
				
				if ( list[i].page === this.page + 1 || this.page === 3) {
					
					if(this.reload == true) {

						animation(this.animation.template, this.animation.el, this.animation.disable, this.animation.delay);
						setTimeout(() => render(list[i]), this.animation.delay);
						
					}else {
						render(list[i])
					}
				
				}

			}
			
		}
	} 
}
function testRedirect(){
	setTimeout(()=>{return window.location.href = 'page-3.html'}, 10200)
}

function handleInputChange(el) {
	return el.value
}

function getAge(day,month,year) {
	var today = new Date();
	var birthDate = new Date(year,month,day);
	var age = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();

	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	console.log(age);
	return age;
}

const checkInputValidity = (el) => {
	
  if (!el.validity.valid) {
		showInputError(el);
		return false
  } else {
		hideInputError(el);
		return true
	}	
};

const showInputError = (el) => {
	el.classList.add('opros__input_error');
}

const hideInputError = (el) => {
	el.classList.remove('opros__input_error');
};

function animation(template,el,disable,delay){
	const screenLoading = getTemplate(template,el);

	document.body.prepend(screenLoading);
	setTimeout(() => document.querySelector(el).classList.add(disable), delay);

}


function animationSound(){
	const screenSound = document
	.querySelector('.sound-template')
	.content
	.querySelector('.animation-sound')
	.cloneNode(true);
	console.log(screenSound)
	document.body.append(screenSound);
	setTimeout(() => document.querySelectorAll('.animation-sound').classList.add('animation-sound_disable'), 3000);
	//setTimeout(() => document.querySelector('.animation-sound').classList.add('animation-sound_disable'), 3000);

}

const inputElement = document.querySelector('.opros__input');
const result = [];
const form = document.querySelector('.opros'); //formElement
const btnTemlate = '.card-template';
const inputTemplate = '.card-template-input';
const btnTest = '.opros__btn';
const inputField = '.cards-input';
const pageHeader = document.querySelector('.card__subtitle');
const testQuestion = document.querySelector('.opros__title');
const pageFooter = document.querySelector('.opros__commits');
let Age = '';

const list =[
	{
		page: 0 ,
		header: "Мы расскажем Вам не только подробности вашей смерти, но также поможем Вам избежать этой ужасной даты и продлить вашу жизнь на многие годы.",
		question: "Когда Вы чувствуете себя наиболее комфортно?",
		buttons:[
		{class: "button", text: "Утро" },
		{class: "button",text:"День" },
		{class: "button",text:"Вечер" },
		{class: "button",text:"Ночь" }],
		inputs: [],
		footer: "Вопрос 2-5",
		reload: false
	},
	{
		page: 1,
		header: "Уже совсем скоро Вы узнаете много интересного о своем будущем!",
		question: "Укажите свою дату рождения:",
		buttons: [
		{class: "button", text: "Далее" }],
		inputs: [
		{class: "input",text:"Год" }, 
		{class: "input",text:"Месяц" }, 
		{class: "input",text:"День" }
		],
		footer: "Вопрос 3-5",
		reload: true,
		animation: {
			template: '.loading-template',
			el: '.animation-loading',
			disable: 'animation-loading_disable',
			delay: 2000
		}
	},
	{
		page: 2,
		header: "Смерть родного человека – одно из тяжелейших испытаний в жизни каждого из нас!",
		question: "Снятся ли Вам умершие люди?",
		buttons: [
		{class: "button", text: "Да"},
		{class: "button", text: "Нет"},
		{class: "button", text: "Иногда"}],
		inputs: [],
		footer: "Вопрос 4-5",
		reload: false
	},
	{
		page: 3 ,
		id:1,
		header: "По вам скучает очень близкий человек, которого больше нет в мире живых.",
		question: "Запись, которую Вы услышите, может шокировать людей с неокрепшей психикой. Вы готовы узнать, что ждет именно Вас?",
		buttons:[
		{class: "button", text: "Да" },
		{class: "button",text:"Затрудняюсь ответить" }],
		inputs: [],
		footer: "Вопрос 5-5",
		reload: true,
		animation: {
			template: '.sound-template',
			el: '.animation-sound',
			disable: 'animation-sound_disable',
			delay: 5000
		}
	},
	{
		page: 3,
		id:2,
		header: "По вам скучает очень близкий человек, которого больше нет в мире живых. Возможно это дедушка или бабушка.",
		question: "Запись, которую Вы услышите, может шокировать людей с неокрепшей психикой. Вы готовы узнать, что ждет именно Вас?",
		buttons:[
		{class: "button", text: "Да" },
		{class: "button",text:"Затрудняюсь ответить" }],
		inputs: [],
		footer: "Вопрос 5-5",
		reload: true,
		animation: {
			template: '.sound-template',
			el: '.animation-sound',
			disable: 'animation-sound_disable',
			delay: 5000
		}
	},
	{
		page: 3,
		id:3,
		header: "По вам скучает очень близкий человек, которого больше нет в мире живых. Возможно это кто-то из Ваших родителей.",
		question: "Запись, которую Вы услышите, может шокировать людей с неокрепшей психикой. Вы готовы узнать, что ждет именно Вас?",
		buttons:[
		{class: "button", text: "Да" },
		{class: "button",text:"Затрудняюсь ответить" }],
		inputs: [],
		footer: "Вопрос 5-5",
		reload: true,
		animation: {
			template: '.sound-template',
			el: '.animation-sound',
			disable: 'animation-sound_disable',
			delay: 5000
		}
	},

]


	


function render(page){
	
	pageHeader.textContent = page.header;
	testQuestion.textContent = page.question;
	pageFooter.textContent = page.footer;

	page.inputs.forEach((input)=>{
		const i = new Testbtn(input.text, inputTemplate, inputField, page.page, page.reload, page.animation);
		const cardElement = i.generateCard();

		form.prepend(cardElement);
	})

	page.buttons.forEach((button) => {
		const b = new Testbtn(button.text, btnTemlate, btnTest, page.page ,page.reload, page.animation);
		const cardElement = b.generateCard();
		form.append(cardElement);
		
	})
	
}

for( let i = 0; i < list.length; i++){
	if ( list[i].page === 0){
		render(list[i])
	}
}




