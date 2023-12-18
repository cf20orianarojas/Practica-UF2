/* Part 0 */
let dades = [];
let pokemon = [];


// POKEMONS
fetch("js/data/pokemon.json")
.then((response) => response.json())
.then((data) => {
	let noms = data.pokemon;
	noms.forEach((obj) => {
		dades.push({ Pokemon: obj.name});
		pokemon.push(obj);
		printList();
	});	 
});

// MUNICIPIS
fetch("js/data/municipis.json")
.then((response) => response.json())
.then((data) => {
	let municipis = data.elements;
	municipis.forEach((obj, index) => {
		dades[index] = {
			...dades[index],
			Municipis: obj.municipi_nom
		}
	});	
});

// MOVIES
fetch("js/data/movies.json")
.then((response) => response.json())
.then((data) => {
	let titles = data.movies;
	titles.forEach((obj, index) => {
		dades[index] = {
			...dades[index],
			Pelicules: obj.title
		}
	});
});

// METEORITS
fetch("js/data/earthMeteorites.json")
.then((response) => response.json())
.then((data) => {
	let meteorits = data;		
	meteorits.forEach((obj, index) => {
		dades[index] = {
			...dades[index],
			earthMeteorite: obj.name
		}
	});
	// console.table(dades);
});

/* Part 1 */

// Ordena asc o desc
function orderList(ordre) {
	let ordenat = ordre == 'ASC' ? pokemon.sort() : pokemon.reverse() ;
	console.log(ordenat);
	// return ordenat;
}

// function searchList() {
	
	// }
	
	// function calcMitjana() {}
	
	function printList() {
		let taula = "<table>";
		for(let i = 0; i < pokemon.length; i++) {
			taula+="<tr>";
			taula+=`<td>${pokemon[i].num}</td>`;
			taula+=`<td><img src="${pokemon[i].img}"/></td>`;
			taula+=`<td>${pokemon[i].name}</td>`;
			taula+=`<td>${pokemon[i].weight}</td>`;
			taula+="</tr>";
		}
	taula+="</table>";
	document.getElementById("resultat").innerHTML = taula;
}