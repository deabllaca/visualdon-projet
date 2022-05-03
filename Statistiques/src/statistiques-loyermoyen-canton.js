import * as d3 from 'd3';



// Population par canton en 2020
import data from '../data/dataset-loyer-moyen-par-canton.csv'
import carte from '../data/map.json'

// Marges et canevas
let margin = { top: 90, right: 190, bottom: 60, left: 190 };

let width = 1200 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

d3.select("body")
    .append("div")
    .attr('id', 'graph-loyer-moyen')



//map

//Pour dire que l'on veut une carte
const path = d3.geoPath();

//Pour définir le centre de la carte
const projection = d3.geoConicConformal()
  .center([2.454071, 46.279229])
  .scale(1000) //Pour définir la couverture
  .translate([width / 2, height / 2]);

  path.projection(projection); //associer le path à la projection

const svg = d3.select("#graph-loyer-moyen").append("svg")
  .attr("id", "svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .attr("class", "Blues");


const deps = svg.append("g");

d3.json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson').then(function(geojson) {

//dessiner le path avec les features des données
    deps.selectAll("path")
      .data(geojson.features)
      .enter()
      .append("path")
      .attr("d", path);
  });




// // Create a path object to manipulate geo data
// // const path = d3.geoPath();

// const tableau = data.map((d, i) => {
//     const values = {
//         "Canton": d.Canton,
//         "Loyer_Moyen": d.Loyer_moyen,
//     }
//     return values
// })
// console.log(tableau)



// //On fait un append du groupe qui contriendra les paths de nos cantons







    




//     .attr('id', 'map')
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

//     //la légende
//     .append("g")
//     .attr('id', 'legend')
//     .attr("transform", "translate(1000, 50)")
//     .enter()










// // Construction de la légande
// legend.selectAll()
//     .data(d3.range(colors.length))
//     .enter().append('svg:rect')
//         .attr('height', legendCellSize + 'px')
//         .attr('width', legendCellSize + 'px')
//         .attr('x', 5)
//         .attr('y', d => d * legendCellSize)
//         .style("fill", d => colors[d]);