import * as d3 from 'd3';

//importation des données
import fichier from '../data/dataset-lacs-modifie.csv'


// Aménagement des différents dataset

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


let colors = [

    '#e63e9b', '#ec967c', '#7a3495' , '#75ca12', '#68daef', '#fb2935', '#9d6515', '#58c76f', '#bcc3fa', '#e1e13d', '#25f39a', '#ba4cd8', '#188174', '#0e12c7', '#d7bcf0'
]




// Définition de la scale
let ordScale = d3.scaleOrdinal()
    .domain(datasetsuperficie)
    .range(colors);

// Utilisation de la fonction pie qui va atransformer nos données en angle
let pie = d3.pie().value(function (d) {
    return d.superficie;
    
});


//Création d'un arc reçevant les données adaptés pour le pie
let arc = g.selectAll("arc")
    .data(pie(datasetsuperficie))
    .enter();

// Step 6
let path = d3.arc()
    .outerRadius(radius) //rayon externe
    .innerRadius(170); //rayon interne

arc.append("path")
    .attr("d", path) // ça va suivre le path, rappel cela se fait avec l'attribut d
    .attr("fill", function (d,i) { return ordScale(datasetsuperficie[i].lac); });

// Step 7
let label = d3.arc()
    .outerRadius(radius) //rayon externe 
    .innerRadius(0); //rayon interne à zéro pour pie chart, si valeur >0 = donut

arc.append("text")
    .attr("transform", function (d) {
        return "translate(" + label.centroid(d) +")";
    })
    .text(function (d,i) { return datasetsuperficie[i].lac; })
    .style("font-family", "arial")
    .style("font-size", 15)