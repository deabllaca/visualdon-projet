import * as d3 from 'd3';
import { json } from 'd3-fetch'


// Population par canton en 2020
import population from '../data/population-par-canton-2020.csv'


// console.log("Test");

let listeCantons = []

population.forEach(row => {
    let cantonsData = {};
    cantonsData[row['Cantons']] = row['Population_1er_janvier']
    // row['Cantons', 'Population_1er_janvier', 'Naissances', 'Deces', 'Accroissement_naturel', 'Migrations_internationales', 'Migrations_intercantonales', 'Population_31_decembre', 'Variation']
    listeCantons.push(cantonsData)
});
// console.log(listeCantons);

let margin = { top: 20, right: 20, bottom: 30, left: 50 },
    width = 650 - margin.left - margin.right,
    height = 2000 - margin.top - margin.bottom;

 d3.select("body")
    .append("div")
    .attr('id', 'graph4')

let svg = d3.select("#graph4")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

// Map and projection
let path = d3.geoPath();
let projection = d3.geoMercator()
    .scale(70)
    .center([0, 20])
    .translate([width / 2, height / 2]);

// // Data and color scale
// let data = new Map();
// let colorScale = d3.scaleThreshold()
//     .domain([50, 60, 70, 80, 90, 100])
//     .range(d3.schemeGreens[7]);

// d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function (d) {
//     // Draw the map
//     svg.append("g")
//         .selectAll("path")
//         .data(d.features)
//         .join("path")
//         // draw each country
//         .attr("d", d3.geoPath()
//             .projection(projection)
//         )
//         // set id
//         .attr("id", function (d) { return d.properties.name; })
//         .attr("fill", function (d) {
//             let number = 0;
//             listCountries.forEach(country => {
//                 if (typeof country[this.id] != "undefined") {
//                     console.log(country[this.id]);
//                     number = country[this.id]
//                 }
//             })
//             console.log(number);
//             return colorScale(number);
//         })
// })










// //Les cantons 
// population.forEach(canton => { //on cherche d'abord à créer un tableau objet "canton" dans lequel on va ajouter tous les noms des cantons
//     (Object.keys(canton)).forEach(key => {
//         if (typeof canton[key] == 'string') { //ici on veut tout les éléments du csv qui est une chaine de caractères 
//             canton[key] = strToInt(canton[key])
//         }
//     })
//     console.log(canton['Vaud']); //pour vérifier
// })

// d3.csv('/Users/deabllaca/Documents/HEIG/IM/S4/VisualDon/visualdon-projet/Statistiques/data/population-par-canton-2020.csv')
// 		   .then( function(data) {
// 		   // Dessiner ici!
//            console.log(data);
// 			  })
// 		   .catch(function(error){
// 		   // Gérer l'erreur ici!
// 			})

// // Tableau des cantons et de leurs données
// cantons.forEach(element => {
    
// }); 


// // Population de 2021
// population.forEach(cantons => { //on cherche d'abord à créer un tableau objet "pays" dans lequel on va ajouter tous les noms de pays
//     (Object.keys(cantons)).forEach(key => {
//         if (typeof cantons[key] == 'string') { //ici on veut tout les éléments du csv qui est une chaine de caractères (les chiffres) sauf la colonne country (donc les noms des pays)
//             cantons[key] = strToInt(cantons[key])
//         }
//     })
//     // console.log(pays['2017']); //pour vérifier: ca affiche toutes les populations de 2017
// })



// d3.csv('../data/population-par-canton-2020.csv')
//     .then(function (data) {
//         const cantons = data.map((d, i) => {
//             return d.canton;
//         });
//         console.log(cantons);
//     })
//     .catch(function (error) {
//         console.log(error);
//     })

