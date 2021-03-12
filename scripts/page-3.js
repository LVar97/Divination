const resultBtn = document.querySelector('.result__button');
const fetchText = document.querySelector('#fetch');
let arr = [];  
let arr1 = [];

resultBtn.addEventListener('click', () => {

	test().then((text) => {
		console.log(text)
		arr = text;
		console.log('имя:', arr.name)

		for (let key in arr) {
			console.log( key + ': ' + arr[key] );
			arr1 = `${key + ': ' + arr[key]}`;
			fetchText.append(key + ': ' + arr[key] + '; ');
		}
	});
	
	

});

async function test() {
  const response = await fetch('https://swapi.dev/api/people/1/');
  const text = await response.json();
  return text;
}

