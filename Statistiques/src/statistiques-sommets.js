import * as d3 from 'd3';

//importation des données
import fichier from '../data/dataset-sommets-modifie.csv'

const tableau = fichier.map((d, i) => {
    const values = {
        "sommet": d.sommet,
        "altitude": d.altitude
    }
    return values
})

// console.log(tableau);


//Définition des marges
let margin = { top: 90, right: 40, bottom: 60, left: 70 };
let width = 1200 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

d3.select("body")
    .append("div")
    .attr('id', 'graph2')

let svg = d3.select("#graph2")

    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")



//Définition des échelles 
let x = d3.scaleBand() //comme ScaleLinear mais pour avoir le nom sous les bandes   
    .domain(tableau.map(d => d.sommet))
    .range([0, width]); //Pour avoir les différents traits

let y = d3.scaleLinear()
    .domain([4000, 5000])
    .range([height, 0]);



// //création des axes
// svg.append("g") //Pour créer les axes il faut appeler les échelles correspondantes
//     .attr("transform", "translate(0," + height + ")") //Sinon l'axe est en haut...
//     .call(d3.axisBottom(x))

svg.append("g")
    .call(d3.axisLeft(y))
    .style("font-size", "16px");



// définition des fonctions
function onMouseOverCircle() {
    d3.select(this).attr('class', 'groupe')
    d3.select(this)
        .transition()
        .duration(500)
        .attr('r', '80')
        .style("fill", `lightgreen`)
}

function onMouseOutCircle() {

    d3.select(this).attr('class', 'groupe')
    d3.select(this)
        .transition()
        .duration(3000)
        .attr('r', '18')
        .style("fill", `palevioletred`)

}

function onMouseOverText() {

    d3.select(this).attr('class', 'groupe')
    d3.select(this)
        .transition()
        .duration(500)
        .style("opacity", 100)
}

function onMouseOutText() {

    d3.select(this).attr('class', 'groupe')
    d3.select(this)
        .transition()
        .duration(2000)
        .style("opacity", 0)

}

// function onMouseOver() {

//     d3.select(this).attr('class', 'cercles')
//     d3.select(this)
//         //cercle
//         .transition()
//         .duration(500)
//         .attr('r', '55')
//         .style("fill", `lightgreen`)
//     d3.select(this).attr('class', 'text')
//     d3.select(this)
//         //text
//         .style("opacity", 100)

// }
// function onMouseOut() {

//     d3.select(this).attr('class', 'cercles')
//     d3.select(this)
//         //cercle
//         .transition()
//         .duration(500)
//         .attr('r', '30')
//         .style("fill", `palevioletred`)
//         //text
//         d3.select(this).attr('class', 'text')
//         d3.select(this)
//         .style("opacity", 0)
// }









// Circles
svg.selectAll("circles")
    .data(tableau)
    .enter()
    .append('g')
    .attr('class', 'groupe')
    .append("circle")
    .attr('class', 'cercles')

    .attr("cx", (d, i) => x(d.sommet) + 56)
    .attr("cy", d => y(d.altitude))
    .attr("r", "25")
    .style("fill", `palevioletred`)
    .on('mouseover', onMouseOverCircle)
    .on('mouseout', onMouseOutCircle)


svg.selectAll('.groupe')

    .append('text')
    .text((d, i) => d.sommet)
    .attr('class', 'text')
    .attr('x', (d, i) => x(d.sommet) + 5)
    .attr("y", d => y(d.altitude))
    .style("font-size", "19")
    .style("fill", `white`)
    .style("opacity", 0)
    .on('mouseover', onMouseOverText)
    .on('mouseout', onMouseOutText)




//Label
svg.append("text")
    .text("Les plus hauts sommets en suisses")
    .attr("x", 300)
    .attr("y", 0)
    .style("font-size", "30")
    .style("text-decoration", "bold")
    .style("fill", `black`)
    .style("font-family", `Montserrat`)

svg.append("text")
    .text("Passez la souris sur les cercles pour les découvrir")
    .attr("x", 320)
    .attr("y", 60)
    .style("font-size", "20")
    .style("text-decoration", "bold")
    .style("fill", `palevioletred`)
    .style("font-family", `Montserrat`)

    svg.append('text')
    .text("mètres")
    .attr('text-anchor', 'end')
    .attr("transform", "rotate(-90)")
    .attr("x", 50)
    .attr("y", 27)
    .style("font-size", "30")
    .style("text-decoration", "bold")
    .style("fill", `black`)
    .style("font-family", `Montserrat`)



    // svg.selectAll("cercles")
    // .data(tableau)
    // .enter()
    // .append('text')
    // .attr('class','text')
    // .text((d, i) => d.sommet)
    // .attr('x', (d, i) => x(d.sommet) + 30)
    // .attr("y", 180)
    // .style("font-size", "15")



