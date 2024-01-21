let dades = [];
let pokemon = [];
let municipis = [];
let pelicules = [];
let meteorites = [];

// Array per a el gràfic Chart
let arrayLabels = [];
let arrayDadesGraf = [];
let backgroundColor = [];
let borderColor = [];
let tmp = [];

/* Part 0 */

// POKEMONS
fetch("js/data/pokemon.json")
.then((response) => response.json())
.then((data) => {
    let noms = data.pokemon;
    noms.forEach((obj) => {
        // el peso sera float para hacer la media luego
        let pes = obj.weight.substring(0, obj.weight.length-3);
        dades.push([obj.name]);
        pokemon.push({ id: obj.num, rsc: obj.img, nom: obj.name, num: parseFloat(pes)});
        // obté tots els tipus
        tmp.push(obj.type);
    });
});


// MUNICIPIS
fetch("js/data/municipis.json")
.then((response) => response.json())
.then((data) => {
    let municipi = data.elements;
    municipi.forEach((obj, index) => {
        dades[index] = {
            ...dades[index],
            Municipis: obj.municipi_nom
        }
        municipis.push({ id: parseInt(obj.grup_ajuntament.codi_postal), rsc : obj.municipi_escut, nom: obj.municipi_nom, num: parseInt(obj.nombre_habitants) });
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
        pelicules.push({ id: obj.year, rsc: obj.url, nom: obj.title, num: obj.rating  });
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
        let year = obj.year.slice(0, 10); 
        meteorites.push({ id: parseInt(obj.id), rsc: year , nom: obj.name, num: parseInt(obj.mass)});
    });
    // console.table(dades);
});

/* Part 1 */

// Ordena asc o desc
function orderList(ordre) {
    let arr = arraySelect();

    if (ordre === 'ASC') {
        arr = arr.sort((a,b) => {
            if (a.nom - b.nom) return -1;
            if (a.nom > b.nom) return 1;
            return 0;
        });
    } else {
        arr = arr.reverse((a,b) => {
            if (b.nom < a.nom) return -1;
            if (b.nom > a.nom) return 1;
            return 0;
        });
    }
    printNewList(arr);
    //return ordenat;
}

function calcMitjana() {
    let mitja = 0, suma = 0;
    let div = document.getElementById('btn-func');
    let p = document.createElement('p');
    let array = arraySelect();
    array.forEach((el) => {
        // suma el pes total de tots els pokemons
        suma+=parseInt(el.num);
    });
    mitja = suma / array.length;
    p.innerHTML = mitja.toFixed(2) + " " + unitat();
    div.appendChild(p);
    // alert(`Mitja: ${mitja.toFixed(2) + unitat()}`);
}

// imprime la taula
function printList(array) {
    let data = document.getElementById('data').value;
    let taula = "<table>";
    taula+=tableHeader();
    array.forEach((obj) => {
        taula+="<tr>";
        taula+=`<td>${obj.id}</td>`;
        taula+=data != 'meteorites' ? `<td><img src="${obj.rsc}"/></td>` : `<td>${obj.rsc}</td>`;
        taula+=`<td>${obj.nom}</td>`;
        taula+=`<td>${obj.num} ${unitat()}</td>`;
        taula+="</tr>";
    });
    taula+="</table>";
    document.getElementById("resultat").innerHTML = taula;

    if (data == 'pokemon') {
        botonGraf();
        return;
    } else {
        document.getElementById('chart').innerHTML = '';
    }
}

function printNewList(array) {
    let data = document.getElementById('data').value;
    let taula = "<table>";
    taula+=tableHeader();
    array.forEach((obj, index) => {
        taula+="<tr>";
        taula+=`<td>${obj.id}</td>`;
        taula+=data != 'meteorites' ? `<td><img src="${obj.rsc}"/></td>` : `<td>${obj.rsc}</td>`;;
        taula+=`<td>${obj.nom}</td>`;
        taula+=`<td>${obj.num} ${unitat()}</td>`;
        taula+="</tr>";
    });
    taula+="</table>";
    document.getElementById("resultat").innerHTML = taula;
}

/* Part 2 */

function pokeChart() {
    const data = {
        labels: tiposLabels(tmp),
        datasets: [{
            label: 'Total',
            data: comptaElements(tmp),
            backgroundColor: backgroundColor,
            borderColor: borderColor,
        }]
    };
    randomColor();

    const config = {
        type: 'polarArea',
        data: data
    };
    
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
        );
    }
    
    function tiposLabels(arr) {
        let temp = arr.flat();
        temp.forEach((obj) => {
        if (!arrayLabels.includes(obj)) {
            arrayLabels.push(obj);
        }
    });
    // arrayLabels.push(...new Set(arr.flat())); ---> Set solo obtiene valores únicos
    return arrayLabels;
}

function comptaElements(arr) {
    let n = arr.flat();
    let quantitat = [];
    n.forEach((el) => {
        if(quantitat[el]) quantitat[el]++;
        else quantitat[el] = 1;
    });
    return Object.values(quantitat);
}

function randomColor() {
    let color = '';
    arrayLabels.forEach((obj, i) => {
        color = `rgba(${Math.floor(Math.random() * (255 - 0)) + 0}, ${Math.floor(Math.random() * (255 - 0)) + 0}, ${Math.floor(Math.random() * (255 - 0)) + 0})`;
        borderColor.push(color);
        background = `${borderColor[i].substring(0, color.length - 1)}, 0.2)`;
        backgroundColor.push(background);
    });
}

function botonGraf() {
    if (document.getElementById('data').value == 'pokemon') {
        let btn = `<button class="Chart" onclick="pokeChart()">Gràfic</button>`
        document.getElementById('chart').innerHTML = btn;
    } 
}

function arraySelect() {
    let arg = document.getElementById('data').value;
    let arr = [];
    switch(arg) {
        case "pokemon":
            arr = pokemon;
            break;
        case "municipis":
            arr = municipis;
            break;
            case "pelicules": 
            arr = pelicules;
            break;
        case "meteorites":
            arr = meteorites;
            break;
    }
    return arr;
}

function unitat() {
    let unitat = "";
    let data = document.getElementById('data').value;
    switch(data) {
        case "pokemon":
            unitat = "kg";
            break;
        case "municipis":
            unitat = "hab";
            break;
            case "meteorites":
                unitat = "kg";
            break;
    }
    return unitat;
}

/* Pas 3 */

// Cerca el objecte (per el num o per el nom) i mostra el index de la posició
document.addEventListener('DOMContentLoaded', function() {
    let resultat = [];   
    let arr = arraySelect();
    let inputSearch = document.getElementById('txtSearch');
    
    inputSearch.addEventListener('input', (e) => {
        arr = arraySelect();
        resultat = arr.filter(obj => obj.nom.toLowerCase() == inputSearch.value.toLowerCase() || obj.nom.toLowerCase().includes(inputSearch.value.toLowerCase()));
        printNewList(resultat);
    });
});

// Retorna el header de la taula de cada array
function tableHeader() {
    let header = "";
    let data = document.getElementById('data').value;
    switch(data) {
        case "pokemon":
            header = `<th id=0 onclick='orderBy("id")'>#</th><th id=1>Imatge</th><th id=2 onclick='orderBy("nom")'>Nom</th><th id=3 onclick='orderBy("num")'>Pes</th>`;
            break;
            case "municipis":
                header = `<th id=0 onclick='orderBy("id")'>Codi postal</th><th id=1>Escut</th><th id=2 onclick='orderBy("nom")'>Nom</th><th id=3 onclick='orderBy("num")'>Població</th>`;
                break;
                case "pelicules": 
                header = `<th id=0 onclick='orderBy("id")'>Any</th><th id=1>Poster</th><th id=2 onclick='orderBy("nom")'>Titol</th><th id=3 onclick='orderBy("num")'>Ranting</th>`;
                break;
                case "meteorites":
            header = `<th id=0 onclick='orderBy("id")'>id</th><th id=1>Year</th><th id=2 onclick='orderBy("nom")'>Nom</th><th id=3 onclick='orderBy("num")'>Massa</th>`;
            break;
    }
    return header;
}

let ord = 'asc';

// ordena por columnes
function orderBy(prop) {
    let data = document.getElementById('data').value;
    let arr = arraySelect(data);

    if (ord == 'asc') {
        arr = arr.sort((a, b) => {
            if (b[prop] < a[prop]) return -1;
            if (b[prop] > a[prop]) return 1;
            return 0;
        });
    } else {
        arr = arr.sort((a, b) => {
            if (a[prop] < b[prop]) return -1;
            if (a[prop] > b[prop]) return 1;
            return 0;
        });
    }
    ord = ord == 'asc' ? 'desc' : 'asc'; 
    printNewList(arr);
}