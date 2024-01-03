let dades = [];
let pokemon = [];

// Array per a el gràfic Chart
let arrayLabels = [];
let arrayDadesGraf = [];
let backgroundColor = [];
let borderColor = [];

/* Part 0 */

// POKEMONS
fetch("js/data/pokemon.json")
.then((response) => response.json())
.then((data) => {
	let noms = data.pokemon;
	let tmp = [];
	noms.forEach((obj) => {
		// el peso sera float para hacer la media luego
		let pes = obj.weight.substring(0, obj.weight.length-3);
		dades.push({ Pokemon: obj.name});
		pokemon.push({ num: obj.num, imatge: obj.img, nom: obj.name, pes: pes});
		// obté tots els tipus
		tmp.push(obj.type);
	});
	filtraValors(tmp);
	pokeChart();
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
	// printList(ordenat);
	return ordenat;
}

// Cerca el objecte (per el num o per el nom) i mostra el index de la posició
function searchList() {	
	let posicio = prompt("Que cerques?");
	let index = -1;
	pokemon.forEach(obj => {
		if (obj.num == posicio || obj.nom.toLowerCase() == posicio.toLowerCase()) {
			index = pokemon.indexOf(obj);
		}
	});
	alert(`El element "${posicio}" esta en la posició nº ${index} del array`);
	return index;
}
	
function calcMitjana(valor) {
	let mitja = 0, suma = 0;
	let div = document.getElementById('btn-func');
	let p = document.createElement('p');
	pokemon.forEach((pokemon) => {
		// suma el pes total de tots els pokemons
		suma+=parseInt(pokemon.pes);
	});
	mitja = suma / pokemon.length;
	p.innerHTML = mitja.toFixed(2) + ' kg';
	div.appendChild(p);
	alert(`Mitja: ${mitja.toFixed(2)} kg`);
}

// imprime la taula
// function printList(array) {
// 	let taula = "<table>";
// 	taula+="<th>#</th><th>Imatge</th><th>Nom</th><th>Pes</th>"
// 	array.forEach((obj) => {
// 		taula+="<tr>";
// 			taula+=`<td>${obj.num}</td>`;
// 			taula+=`<td><img src="${obj.imatge}"/></td>`; 
// 			taula+=`<td>${obj.nom}</td>`;
// 			taula+=`<td>${obj.pes} kg</td>`;
// 		taula+="</tr>";
// 	});
// 	taula+="</table>";
// 	document.getElementById("resultat").innerHTML = taula;
// }

/* Part 2 */

function pokeChart() {
	const data = {
		labels: arrayLabels,
		datasets: [{
		  label: 'My First Dataset',
		  data: [11, 16, 7, 3, 14],
		  backgroundColor: [
			'rgb(255, 99, 132)',
			'rgb(75, 192, 192)',
			'rgb(255, 205, 86)',
			'rgb(201, 203, 207)',
			'rgb(54, 162, 235)']
		}]
	};
	
	const config = {
		type: 'polarArea',
		data: data
	};
	
	const myChart = new Chart(
		document.getElementById('myChart'),
		config
	);
}

function filtraValors(arr) {
	let temp = arr.flat();
	temp.forEach((obj) => {
		if (!arrayLabels.includes(obj)) {
			arrayLabels.push(obj);
		}
	}); 
	// arrayLabels.push(...new Set(arr.flat())); ---> Set solo obtiene valores únicos
}