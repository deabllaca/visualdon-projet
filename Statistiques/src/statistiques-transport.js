import * as d3 from 'd3';

import transport from '../data/dataset-transport.csv'
// import { json } from 'd3-fetch' // Pour dire qu'on utilise d3


// d3.json('https://ckan.opendata.swiss/api/3/action/package_show?id=viertausender')
//     .then(function (data) {

//         console.log(data)
//     })
//     .catch(function (error) {
//         // Gérer l'erreur ici!
//     })




const tableau = transport.map((d, i) => {
    const values = {
        "annee": d.annee,
        "temps": d.temps
    }
    return values
})





let margin = { top: 90, right: 190, bottom: 60, left: 190 };
let width = 1200 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


// let width = window.innerWidth - margin.left - margin.right,
// height = window.innerHeight - margin.top - margin.bottom;

let container = d3.select("body")
    .append("div")
    .attr('id', 'graph')


let svg = d3.select("#graph")

    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")





//Définition des échelles 
let x = d3.scaleBand() //echelle//Pour avoir le nom en dessous de la band (colonne) pour les données ordinales   
    .domain(tableau.map(d => d.annee))
    .range([0, width]); //Pour avoir les différents traits




let y = d3.scaleLinear() //echelle
    .domain([0, 100]) //Pour avoir les différents traits
    .range([height, 0]); //Inverser l'ordre pour les données quantitatives //range doit être contenu dans le canva


//Création des axes    
svg.append("g") //Pour créer les axes il faut appeler les échelles correspondantes
    .attr("class", "axisY")
    .call(d3.axisLeft(y))
    .selectAll("text")
    .style("font-size", "15px");


svg.append("g") //Pour créer les axes il faut appeler les échelles correspondantes
    .attr("class", "axisX")
    .attr("transform", "translate(0," + height + ")") //Sinon l'axe est en haut...
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-2,10)") //Pour décaler les textes un peu plus bas
    .style("font-size", "15px");

svg.selectAll("bars")
    .data(tableau)
    .enter()
    .append("rect")
    .attr("class", "rectangle")

    .attr('x', (d, i) => x(d.annee) + 40)
    .attr('y', d => y(d.temps) - 0.5)

    .transition()
    .ease(d3.easeBounceOut)
    .duration(1800)
    .delay((d, i) => i * 70)

    .attr("height", d => y(0) - y(d.temps))
    .attr("fill", `palevioletred`)
    .attr("width", x.bandwidth() / 2)


svg.append('text')
    .text("années")
    .attr('text-anchor', 'end')
    .attr("x", width + 75)
    .attr("y", height - 4)
    .style("font-size", "30")
    .style("text-decoration", "bold")
    .style("fill", `#black`)
    .style("font-family", `Montserrat`)



svg.append('text')
    .text("minutes")
    .attr('text-anchor', 'end')
    .attr("transform", "rotate(-90)")
    .attr("x", 50)
    .attr("y", 25)
    .style("font-size", "30")
    .style("text-decoration", "bold")
    .style("fill", `black`)
    .style("font-family", `Montserrat`)
