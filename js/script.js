let dades = [];
let pokemon = [];

/* Part 0 */

// POKEMONS
fetch("js/data/pokemon.json")
.then((response) => response.json())
.then((data) => {
	let noms = data.pokemon;
	noms.forEach((obj) => {
		dades.push({ Pokemon: obj.name});
		pokemon.push({ num: obj.num, imatge: obj.img, nom: obj.name, pes: obj.weight });
		printList(pokemon);
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
	let ordenat = [];
	if (ordre === 'ASC') {
		ordenat = pokemon.sort((a,b) => {
			if (a.nom - b.nom) return -1;
			if (a.nom > b.nom) return 1;
			return 0;
		});
	} else {
		ordenat = pokemon.reverse((a,b) => {
			if (b.nom < a.nom) return -1; 
			if (b.nom > a.nom) return 1;
			return 0; 
		});
	}
	printList(ordenat);
	return ordenat;
}

// Cerca el objecte (per el num o per el nom) i mostra el index de la posició
function searchList() {	
	let posicio = prompt("Que cerques?");
	let index = -1;
	pokemon.forEach(obj => {
		if (obj.num == posicio || obj.nom == posicio) {
			index = pokemon.indexOf(obj);
		}
	});
	console.log(index);
}
	
function calcMitjana() {

}

// imprime la taula
function printList(array) {
	let taula = "<table>";
	taula+="<th>#</th><th>Imatge</th><th>Nom</th><th>Pes</th>"
	array.forEach((obj) => {
		taula+="<tr>";
			taula+=`<td>${obj.num}</td>`;
			taula+=`<td><img src="${obj.imatge}"/></td>`; 
			taula+=`<td>${obj.nom}</td>`;
			taula+=`<td>${obj.pes}</td>`;
		taula+="</tr>";
	});
	taula+="</table>";
	document.getElementById("resultat").innerHTML = taula;
}