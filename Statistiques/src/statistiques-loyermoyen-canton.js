import * as d3 from 'd3';


// Population par canton en 2020
import data from '../data/dataset-loyer-moyen-par-canton.csv'
import carte from './data/CarteCH.svg'


// Create a path object to manipulate geo data
const path = d3.geoPath();

const tableau = data.map((d, i) => {
    const values = {
        "Canton": d.Canton,
        "Loyer_Moyen": d.Loyer_moyen,
    }
    return values
})
console.log(tableau)

// Marges et canevas
let margin = { top: 90, right: 190, bottom: 60, left: 190 };
let width = 1200 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

d3.select("body")
    .append("div")
    .attr('id', 'graph-loyer-moyen')

let svg = d3.select("#graph-loyer-moyen").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class", "Blues");


//On fait un append du groupe qui contriendra les paths de nos cantons
const cant = svg.append("g")












    .attr('id', 'map')
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    //la légende
    .append("g")
    .attr('id', 'legend')
    .attr("transform", "translate(1000, 50)")
    .enter()










// // Construction de la légande
// legend.selectAll()
//     .data(d3.range(colors.length))
//     .enter().append('svg:rect')
//         .attr('height', legendCellSize + 'px')
//         .attr('width', legendCellSize + 'px')
//         .attr('x', 5)
//         .attr('y', d => d * legendCellSize)
//         .style("fill", d => colors[d]);