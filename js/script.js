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
        pokemon.push([obj.num, obj.img, obj.name, parseFloat(pes)]);
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
        municipis.push([ parseInt(obj.grup_ajuntament.codi_postal), obj.municipi_escut, obj.municipi_nom, parseInt(obj.nombre_habitants) ]);
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
        pelicules.push([obj.year, obj.url, obj.title, obj.rating  ]);
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
        meteorites.push([parseInt(obj.id), "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmeteorites.tripod.com%2Fgallery%2FANTIMET.GIF&f=1&nofb=1&ipt=5838914745c6c21beae7da4f90096be538bbe773b2072a47c6c078fbb466bf7b&ipo=images", obj.name, parseInt(obj.mass)]);
    });
    // console.table(dades);
});

/* Part 1 */

// Ordena asc o desc
function orderList(ordre) {
    let arr = arraySelect();

    if (ordre === 'ASC') {
        arr = arr.sort((a,b) => {
            if (a[2] - b[2]) return -1;
            if (a[2] > b[2]) return 1;
            return 0;
        });
    } else {
        arr = arr.reverse((a,b) => {
            if (b[2] < a[2]) return -1;
            if (b[2] > a[2]) return 1;
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
        suma+=parseInt(el[3]);
    });
    mitja = suma / array.length;
    p.innerHTML = mitja.toFixed(2) + " " + unitat();
    div.appendChild(p);
    // alert(`Mitja: ${mitja.toFixed(2) + unitat()}`);
}

// imprime la taula
function printList(array) {
    let taula = "<table>";
    taula+=tableHeader();
    array.forEach((obj) => {
        taula+="<tr>";
        taula+=`<td>${obj[0]}</td>`;
        taula+=`<td><img src="${obj[1]}"/></td>`;
        taula+=`<td>${obj[2]}</td>`;
        taula+=`<td>${obj[3]} ${unitat()}</td>`;
        taula+="</tr>";
    });
    taula+="</table>";
    document.getElementById("resultat").innerHTML = taula;

    if (document.getElementById('data').value == 'pokemon') {
        botonGraf();
        return;
    } else {
        document.getElementById('chart').innerHTML = '';
    }
}

function printNewList(array) {
    let taula = "<table>";
    taula+=tableHeader();
    array.forEach((obj, index) => {
        taula+="<tr>";
        taula+=`<td>${obj[0]}</td>`;
        taula+=`<td><img src="${obj[1]}"/></td>`;
        taula+=`<td>${obj[2]}</td>`;
        taula+=`<td>${obj[3]} ${unitat()}</td>`;
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
        resultat = arr.filter(obj => obj[2].toLowerCase() == inputSearch.value.toLowerCase() || obj[2].toLowerCase().includes(inputSearch.value.toLowerCase()));
        printNewList(resultat);
    });
});

// Retorna el header de la taula de cada array
function tableHeader() {
    let header = "";
    let data = document.getElementById('data').value;
    switch(data) {
        case "pokemon":
            header = `<th id=0 onclick='orderBy(0)'>#</th><th id=1>Imatge</th><th id=2 onclick='orderBy(2)'>Nom</th><th id=3 onclick='orderBy(3)'>Pes</th>`;
            break;
            case "municipis":
                header = "<th id=0 onclick='orderBy(0)'>Codi postal</th><th id=1>Escut</th><th id=2 onclick='orderBy(2)'>Nom</th><th id=3 onclick='orderBy(3)'>Població</th>";
                break;
                case "pelicules": 
                header = "<th id=0 onclick='orderBy(0)'>Any</th><th id=1>Poster</th><th id=2 onclick='orderBy(2)'>Titol</th><th id=3 onclick='orderBy(3)'>Ranting</th>";
                break;
                case "meteorites":
            header = "<th id=0 onclick='orderBy(0)'>id</th><th id=1>Imatge</th><th id=2 onclick='orderBy(2)'>Nom</th><th id=3 onclick='orderBy(3)'>Massa</th>";
            break;
    }
    return header;
}

let ord = 'asc';

// ordena por columnes
function orderBy(index) {
    let data = document.getElementById('data').value;
    let arr = arraySelect(data);

    if (ord == 'asc') {
        arr = arr.sort((a, b) => {
            if (b[index] < a[index]) return -1;
            if (b[index] > a[index]) return 1;
            return 0;
        });
    } else {
        arr = arr.sort((a, b) => {
            if (a[index] < b[index]) return -1;
            if (a[index] > b[index]) return 1;
            return 0;
        });
    }
    ord = ord == 'asc' ? 'desc' : 'asc'; 
    printNewList(arr);
}