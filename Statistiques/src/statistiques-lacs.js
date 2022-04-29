import * as d3 from 'd3';

//importation des données
import fichier from '../data/dataset-lacs-modifie.csv'


//Aménagement des différents dataset

const datasetsuperficie = fichier.map((d, i) => {
    const values = {
        "lac": d.lac,
        "superficie": d.superficie_km2
    }
    return values
})

const datasetaltitude = fichier.map((d, i) => {
    const values = {
        "lac": d.lac,
        "altitude": d.altitude_m
    }
    return values
})

const datasetcontenu = fichier.map((d, i) => {
    const values = {
        "lac": d.lac,
        "altitude": d.contenu_m3
    }
    return values
})

const datasetprofondeur = fichier.map((d, i) => {
    const values = {
        "lac": d.lac,
        "profondeur": d.profondeur_m
    }
    return values
})



// const tabnomslac = fichier.map((d, i) => {
//     return d.lac
// })

// const tabsuperficie = fichier.map((d, i) => {
//     return d.superficie_km2
// })

// const tabaltitude = fichier.map((d, i) => {
//     return d.altitude_m
// })

// const tabcontenu = fichier.map((d, i) => {
//     return d.contenu_m3
// })

// const tabprofondeur = fichier.map((d, i) => {
//     return d.profondeur_m
// })

// const tableau = {
//     'nomslacs': tabnomslac,
//     'superficie': tabsuperficie,
//     'altitude': tabaltitude,
//     'contenu': tabcontenu,
//     'profondeur':tabprofondeur
// }

// const dataset = tableau.map(d => {

//     const values = {
//         "lac": d.nomslacs,
//         "superficie": d.superficie
//     }
//     return values
// });



////////////////////////////////
//Pourquoi ils s'affichent pas//
////////////////////////////////

// svg.append("button")
//     .text("Superficie")

// svg.append("button")
//     .text("Altitude")

// svg.append("button")
//     .text("Contenu")

// svg.append("button")
//     .text("Profondeur")





// // set the dimensions and margins of the graph
// var width = 450
//     height = 450
//     margin = 40

// // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
// var radius = Math.min(width, height) / 2 - margin

// // append the svg object to the div called 'my_dataviz'
// var svg = d3.select("#my_dataviz")
//   .append("svg")
//     .attr("width", width)
//     .attr("height", height)
//   .append("g")
//     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// // create 2 data_set
// var data1 = {a: 9, b: 20, c:30, d:8, e:12}
// var data2 = {a: 6, b: 16, c:20, d:14, e:19, f:12}

// // set the color scale
// var color = d3.scaleOrdinal()
//   .domain(["a", "b", "c", "d", "e", "f"])
//   .range(d3.schemeDark2);

// // A function that create / update the plot for a given variable:
// function update(data) {

//   // Compute the position of each group on the pie:
//   var pie = d3.pie()
//     .value(function(d) {return d.value; })
//     .sort(function(a, b) { console.log(a) ; return d3.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart
//   var data_ready = pie(d3.entries(data)) //data puis enter

//   // map to data
//   var u = svg.selectAll("path")
//     .data(data_ready)

//   // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
//   u
//     .enter()
//     .append('path')
//     .merge(u)
//     .transition()
//     .duration(1000)
//     .attr('d', d3.arc()
//       .innerRadius(0)
//       .outerRadius(radius)
//     )
//     .attr('fill', function(d){ return(color(d.data.key)) })
//     .attr("stroke", "white")
//     .style("stroke-width", "2px")
//     .style("opacity", 1)

//   // remove the group that is not present anymore
//   u
//     .exit()
//     .remove()

// }

// // Initialize the plot with the first dataset
// update(data1)































































































































































































//Définition des marges
let margin = { top: 90, right: 40, bottom: 60, left: 70 };
let width = 1200 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

d3.select("body")
    .append("div")
    .attr('id', 'graph3')

let svg = d3.select("#graph3")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
let radius = 200;


let g = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// // Step 1        
let data = [{ name: "Alex", share: 20.70 },
{ name: "Shelly", share: 30.92 },
{ name: "Clark", share: 15.42 },
{ name: "Matt", share: 13.65 },
{ name: "Jolene", share: 19.31 }];

// Définition de la scale
let ordScale = d3.scaleOrdinal()
    .domain(data)
    .range(['#ffd384', '#94ebcd', '#fbaccc', '#d3e0ea', '#fa7f72']);

//'#fb7f72','#fa9f72', '#fa7f72', '#fa7f92', '#ba7f72', '#ca7f72', '#da7f72', '#fabf72', '#ff7f72', '#fa8f72']);

// Utilisation de la fonction pie qui va adaptés nos données au pie chart
let pie = d3.pie().value(function (d) {
    return d.share;
});





 console.log(pie(data));

//Création d'un arc reçevant les données adaptés pour le pie
let arc = g.selectAll("arc")
    .data(pie(data))
    .enter();

// Step 6
let path = d3.arc()
    .outerRadius(radius) //rayon externe
    .innerRadius(0); //rayon interne

arc.append("path")
    .attr("d", path) // ça va suivre le path
    .attr("fill", function (d) { return ordScale(d.data.name); });

// Step 7
let label = d3.arc()
    .outerRadius(radius) //rayon externe 
    .innerRadius(0); //rayon interne à zéro pour pie chart, si valeur >0 = donut

arc.append("text")
    .attr("transform", function (d) {
        return "translate(" + label.centroid(d) + ")";
    })
    .text(function (d) { return d.data.name; })
    .style("font-family", "arial")
    .style("font-size", 15)