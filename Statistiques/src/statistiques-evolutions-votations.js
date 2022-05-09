import * as d3 from 'd3';
import { select } from 'd3';

//importation des données
import fichier from '../data/dataset-evolution-votations-modifie.csv'


//Traitement des données
const tableau = fichier.map((d, i) => {
    const values = {
        "annee": d.annee,
        "participation": d.participation
    }
    return values
})

console.log(tableau);





//Définition des marges
let margin = { top: 90, right: 40, bottom: 60, left: 70 };
let width = 1200 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;


let div = d3.select("body")
    .append("div")
    .attr('id', 'graph-votation')


let svg = d3.select("#graph-votation")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

//tooltip

// create a tooltip
let tooltip = d3.select("#graph-votation")
    .append("div")
    .attr("class", "tooltip")
    .style("visibility", "hidden")


//Définition des échelles
let x = d3.scaleBand()
    .domain(tableau.map(d => d.annee))
    .range([0, width])

let y = d3.scaleLinear()
    .domain([30, 100])
    .range([height, 0]);

//Création des axes

svg.append("g") //Pour créer les axes il faut appeler les échelles correspondantes
    .attr("class", "axisX")
    .attr("transform", "translate(0," + height + ") ") //Sinon l'axe est en haut...
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(10)" + "rotate(45)") //Pour décaler les textes un peu plus bas et les mettre en biais
    .style("font-size", "6px")
    .style("text-anchor", "start");


svg.append("g") //Pour créer les axes il faut appeler les échelles correspondantes
    .attr("class", "axisY")
    .call(d3.axisLeft(y))


//Création du path

// Add the line
svg.append("path")
    .datum(tableau)
    .attr("fill", "none")
    .attr("stroke", "palevioletred")
    .attr("stroke-width", 3.5)


    .attr("d", d3.line()
        .x(function (d) { return x(d.annee) + 40 })
        .y(function (d) { return y(d.participation) })
        .curve(d3.curveMonotoneX)
    )







//Les points
function mouseOver(event, d) {
    d3.select(this)
        .transition()
        .duration(200)
        .attr("r", 15)
        .style("fill", "red")
        .style("stroke", "#fff")

    tooltip.style("visibility", "visible")
    .style("left", event.x + "px")
    .style("top", event.y + 5400 + "px")

    tooltip.html(`${d.participation} % en ${d.annee} `)
    tooltip.transition().duration(200)


}

function mouseLeave() {
    d3.select(this)
        .transition()
        .duration(200)
        .attr("r", 3)
        .style("fill", "blue")
        .style("stroke", "#fff")

    tooltip.style("visibility", "hidden")
    tooltip.transition().duration(200)
}

svg.append('g')
        .selectAll("circles")
        .data(tableau)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => x(d.annee) +40 )
        .attr("cy", (d, i) => y(d.participation) )
        .attr("r", 3)
        .style("fill", "blue")

        .on("mouseover", mouseOver)
        .on("mouseleave", mouseLeave)


    //labels
    svg.append('text')
    .text("Pourcentage")
    .attr('text-anchor', 'end')
    .attr("transform", "rotate(-90)")
    .attr("x", 50)
    .attr("y", 25)
    .style("font-size", "30")
    .style("text-decoration", "bold")
    .style("fill", `black`)
    .style("font-family", `Montserrat`)

    svg.append('text')
    .text("années")
    .attr('text-anchor', 'end')
    .attr("x", width + 35)
    .attr("y", height - 4)
    .style("font-size", "30")
    .style("text-decoration", "bold")
    .style("fill", `#black`)
    .style("font-family", `Montserrat`)

    svg.append("text")
    .text("Evolution du pourcentage de vote en Suisse")
    .attr("x", 250)
    .attr("y", 0)
    .style("font-size", "30")
    .style("text-decoration", "bold")
    .style("fill", `black`)
    .style("font-family", `Montserrat`)
