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
        dades.push({ Pokemon: obj.name});
        pokemon.push({header: "<th>#</th><th>Imatge</th><th>Nom</th><th>Pes</th>", id: obj.num, imatge: obj.img, nom: obj.name, value: pes});
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
        municipis.push({header: "<th>Codi postal</th><th>Escut</th><th>Nom</th><th>Població</th>", id: obj.grup_ajuntament.codi_postal, imatge: obj.municipi_escut, nom: obj.municipi_nom, value: obj.nombre_habitants });
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
        pelicules.push({header: "<th>Any</th><th>Poster</th><th>Titol</th><th>Ranting</th>", id: obj.year, imatge: obj.url, nom: obj.title, value: obj.rating  });
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
        meteorites.push({
            header: "<th>id</th><th>Imatge</th><th>Nom</th><th>Massa</th>",
            id: obj.id,
            imatge: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmeteorites.tripod.com%2Fgallery%2FANTIMET.GIF&f=1&nofb=1&ipt=5838914745c6c21beae7da4f90096be538bbe773b2072a47c6c078fbb466bf7b&ipo=images",
            nom: obj.name,
            value: obj.mass});
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
document.addEventListener('DOMContentLoaded', function() {
    function searchList() {
        let resultat = [];
        // let nom = prompt("Que cerques?").toLowerCase();
        
        let inputSearch = document.getElementById('txtSearch');
            inputSearch.addEventListener('input', (e) => {
            console.log(inputSearch.value)
        });

        // pokemon.forEach(obj => {
        //     if (obj.nom.toLowerCase() == nom || obj.nom.toLowerCase().includes(nom)) {
        //         resultat.push(obj);
        //     }
        // });
        //printList(resultat);
    }
    searchList();
});

function calcMitjana() {
    let mitja = 0, suma = 0;
    let div = document.getElementById('btn-func');
    let p = document.createElement('p');
    let array = arraySelect();
    array.forEach((el) => {
        // suma el pes total de tots els pokemons
        suma+=parseInt(el.value);
    });
    mitja = suma / array.length;
    p.innerHTML = mitja.toFixed(2) + ' kg';
    div.appendChild(p);
    alert(`Mitja: ${mitja.toFixed(2)} kg`);
}

let count = 0;

// imprime la taula
function printList(array) {
    let taula = "<table>";
    taula+=array[0].header;
    array.forEach((obj) => {
        taula+="<tr>";
        taula+=`<td>${obj.id}</td>`;
        taula+=`<td><img src="${obj.imatge}"/></td>`;
        taula+=`<td>${obj.nom}</td>`;
        taula+=`<td>${obj.value} ${unitat()}</td>`;
        taula+="</tr>";
    });
    taula+="</table>";
    document.getElementById("resultat").innerHTML = taula;

    if (document.getElementById('data').value == 'pokemon' && count == 0) {
        botonGraf();
        count++;
    } 
}
count = 0;

/* Part 2 */

function pokeChart() {
    const data = {
        labels: tiposLabels(tmp),
        datasets: [{
            label: 'My First Dataset',
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

function arraySelect() {
    let arr = [];
    let arg = document.getElementById('data').value;
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

function botonGraf() {
    let btn = document.createElement('button');
    btn.className = "Chart";
    btn.textContent = "Gràfic";
    btn.onclick = pokeChart;
    document.getElementById('btn-func').appendChild(btn);
}