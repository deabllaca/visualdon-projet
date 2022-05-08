import * as d3 from 'd3';


// Population par canton en 2020
import data from '../data/population-par-canton-2020.csv'

const tableau = data.map((d, i) => {
    const values = {
        "Cantons": d.Cantons,
        "Population_31_decembre": d.Population_31_decembre,
    }
    return values
})



// Marges et canevas
let margin = { top: 90, right: 190, bottom: 60, left: 190 };
let width = 1200 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

d3.select("body")
    .append("div")
    .attr('id', 'graph-population')

let svg = d3.select("#graph-population")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


// Définition des échelles 
let x = d3.scaleBand() //echelle//Pour avoir le nom en dessous de la band (colonne) pour les données ordinales   
    .domain(tableau.map(d => d.Cantons))
    .range([0, width]); //Pour avoir les différents traits

let y = d3.scaleLinear() //echelle
    .domain([0, 1600000]) //Pour avoir les différents traits
    .range([height, 0]); //Inverser l'ordre pour les données quantitatives //range doit être contenu dans le canva


//Création des axes    
svg.append("g") //Pour créer les axes il faut appeler les échelles correspondantes
    .attr("class", "axisY")
    .call(d3.axisLeft(y))
    .selectAll("text")
    .style("font-size", "16px");


svg.append("g") //Pour créer les axes il faut appeler les échelles correspondantes
    .attr("class", "axisX")
    .attr("transform", "translate(0," + height + ")") //Sinon l'axe est en haut...
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(10)" + "rotate(45)") //Pour décaler les textes un peu plus bas et les mettre en biais
    .style("font-size", "12px")
    .style("text-anchor", "start");


//Création du graphique
svg.selectAll("bars")
    .data(tableau)
    .enter()
    .append("rect")
    .attr("class", "rectangle")
    .attr('x', (d, i) => x(d.Cantons) + 10)

    // .attr('y', d => y(d.temps) -0.3)
    .attr("y", d => y(d.Population_31_decembre)) //comme le range est inversé le 0 est maintenant en bas

    .attr("height", d => y(0) - y(d.Population_31_decembre)) 
    // .attr("height", d => y(0) - y(d.temps))

    .attr("fill", `red`)
    .attr("width", x.bandwidth() / 2)


    // .transition()
    // .ease(d3.easeBounceOut)
    // .duration(3600)
    // .attr("y", d => y(0))
    // .attr("height", d => height - y(d.Population_31_decembre))
    // .delay((d,i)=> i*100)


//Labels du graphique
svg.append('text')
    .text("cantons")
    .attr('text-anchor', 'end')
    .attr("x", width + 85)
    .attr("y", height - 4)
    .style("font-size", "20")
    .style("text-decoration", "bold")
    .style("fill", `#black`)
    .style("font-family", `Montserrat`)

//
svg.append('text')
    .text("population")
    .attr('text-anchor', 'end')
    // .attr("transform", "rotate(-90)")
    .attr("x", 30)
    .attr("y", -15)
    .style("font-size", "20")
    .style("text-decoration", "bold")
    .style("fill", `black`)
    .style("font-family", `Montserrat`)

//
    svg.append("text")
    .text("La population par cantons en 2020 👥")
    .transition()
    .ease(d3.easeLinear)
    .duration(500)
    .attr("x", 180)
    .attr("y", 0)
    .style("font-size", "30")
    .style("text-decoration", "bold")
    .style("fill", `black`)
    .style("font-family", `Montserrat`)

//        


    // svg.selectAll("bars")
    // .data(tableau)
    // .enter()
    // .append('text')
    // .text((d, i) => d.Population_31_decembre)
    // .attr('x', (d, i) => x(d.Cantons))
    // .attr("y", y(0))
    // // .attr("transform", "rotate(90)")
    // // .style("text-anchor", "start")
    // // .attr("transform", "translate(10)" + "rotate(45)")
    // .style("font-size", "0")
    // // // .attr("transform", "rotate(30)")
   

    // .transition()
    // .ease(d3.easeQuadIn)
    // .duration(1950)
    // .attr("y", 180)
    // .attr("height", d => height - y(d.Population_31_decembre) )

    // .style("font-size", "10")
    // .style("text-decoration", "bold")
    // .attr("fill", `black`)
    // .style("font-family", `Montserrat`)


    // .attr("transform", "rotate(30)")
    // .classed('rotation', true)
    // .attr('transform', (d,i)=>{
    //     return 'translate( '+x(d.Cantons)+' , '+0+'),'+ 'rotate(45)';})


















// // console.log("Test");

// let listeCantons = []

// population.forEach(row => {
//     let cantonsData = {};
//     cantonsData[row['Cantons']] = row['Population_1er_janvier']
//     // row['Cantons', 'Population_1er_janvier', 'Naissances', 'Deces', 'Accroissement_naturel', 'Migrations_internationales', 'Migrations_intercantonales', 'Population_31_decembre', 'Variation']
//     listeCantons.push(cantonsData)
// });
// // console.log(listeCantons);

// let margin = { top: 20, right: 20, bottom: 30, left: 50 },
//     width = 650 - margin.left - margin.right,
//     height = 2000 - margin.top - margin.bottom;

// //  d3.select("body")
// //     .append("div")
// //     .attr('id', 'graph4')

// let svg = d3.select("#graph4")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom);

// // Map and projection
// let path = d3.geoPath();
// let projection = d3.geoMercator()
//     .scale(70)
//     .center([0, 20])
//     .translate([width / 2, height / 2]);

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

