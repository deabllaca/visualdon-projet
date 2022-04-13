import * as d3 from 'd3';

import transport from '../data/dataset-transport1.csv'

const tableau = transport.map((d, i) => {
    const values = {
        "annee": d.annee,
        "temps": d.temps
    }
    return values
})

console.log(tableau);




let margin = { top: 90, right: 20, bottom: 60, left: 150 };
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
    .call(d3.axisLeft(y));

svg.append("g") //Pour créer les axes il faut appeler les échelles correspondantes
    .attr("transform", "translate(0," + height + ")") //Sinon l'axe est en haut...
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-2,10)") //Pour décaler les textes un peu plus bas



svg.selectAll("bars")
    .data(tableau)
    .enter()
    .append("rect")
    .attr('x', (d, i) => x(d.annee) + 80)
    .attr('y', d => y(d.temps) - 0.5)
    .attr("height", d => y(0) - y(d.temps))
    .attr("fill", `#${Math.floor(Math.random() * 16777215).toString(16)}`)
    .attr("width", x.bandwidth() / 5)

    svg.append('text')
    .text("années")
    .attr('text-anchor', 'end')
    .attr("x", width + 15)
    .attr("y", height)
    .style("font-size", "35")
    .style("text-decoration", "bold")
    .style("fill", `#${Math.floor(Math.random() * 16777215).toString(16)}`)

    
    svg.append('text')
    .text("temps")
    .attr('text-anchor', 'middle')
    .attr("x", 12)
    .attr("y", -30)
    .style("font-size", "35")
    .style("text-decoration", "bold")
    .style("fill", `#${Math.floor(Math.random() * 16777215).toString(16)}`)
