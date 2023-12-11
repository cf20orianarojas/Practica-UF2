			
// POKEMONS

let dades;
let pokemon = [];
let municipi = [];
let movie = [];
let earthMeteorites = [];

// POKEMONS
fetch("js/data/pokemon.json")
.then((response) => response.json())
.then((data) => {
	dades = data.pokemon;
	//console.log(dades[0].name);		
	for(let i = 0; i < dades.length; i++) {
		pokemon.push(dades[i].name);
	}
});

// MUNICIPIS
fetch("js/data/municipis.json")
.then((response) => response.json())
.then((data) => {
	dades = data.elements;			
	// console.log(dades)
	for (let i = 0; i < dades.length; i++) {
	 	municipi.push(dades[i].municipi_nom);
	}
});

// MOVIES
fetch("js/data/movies.json")
.then((response) => response.json())
.then((data) => {
	dades = data.movies;			
	// console.log(dades)
	for (let i = 0; i < dades.length; i++) {
	 	movie.push(dades[i].title);
	}
});

// METEORITS
fetch("js/data/earthMeteorites.json")
.then((response) => response.json())
.then((data) => {
	dades = data;		
	// console.log(dades)
	for (let i = 0; i < dades.length; i++) {
	 	earthMeteorites.push(dades[i].name);
	}
});


// function taulaDades() {
	arrDades = {
		name: pokemon,
		nom: municipi,
	}
	// for(let i = 0; i < arrDades.length; i++) {
		console.table(arrDades);
	// }
// }