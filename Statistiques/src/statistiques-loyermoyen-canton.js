import * as d3 from 'd3';

// Population par canton en 2020
import data from '../data/dataset-loyer-moyen-par-canton.csv'
import carte from '../data/map.json'

// import * as topojson from "topojson-client";

// const topo = await import(`swiss-maps/2021/ch-combined.json`);

// const municipalities = topojson.feature(topo, topo.objects.municipalities);

// console.log(municipalities)

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
const projection = d3.geoMercator()
  .center([2.454071, 46.279229])
  .scale(1000) //Pour définir la couverture
  .translate([width / 2, height / 2]);

  path.projection(projection); //associer le path à la projection

const svg = d3.select("#graph-loyer-moyen").append("svg")
  .attr("id", "svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)

var proj = d3.geoMercator()
  .precision(0.1)
  .center([138, 35])
  //  .parallels([50, 60])
  .rotate([0,0,0])
  .scale(1200)
  .translate([width / 2, height / 2]);

var path;
var paths;

var info = svg.append('text')
  .attr('width',80)
  .attr('height',20)
  .attr('y',10)
  .attr('fill','black');


//   d3.json('swiss-maps.json').then(function(geojson) {
//     //dessiner le path avec les features des données
//         deps.selectAll("path")
//           .data(geojson.features)
//           .enter()
//           .append("path")
//           .attr("d", path);
//       });


// let projection = d3.geoNaturalEarth1()
// .scale(width / 1.8 / Math.PI)
// .translate([width / 2, height / 2])

// let path = d3.geoPath().projection(projection)



// d3.json("swiss-maps.json", function(error, dat) {
//   console.log(dat);
//   var subunits = topojson.feature(dat, dat.objects.prefs_jpn);
//   path = d3.geo.path().projection(proj);
      
//   g = svg.append('g');
//   var cities = g.selectAll(".city")
//     .data(subunits.features)
//     .enter().append("path")
//     .attr("class", function(d) { return "subunit " + d.id; })
//     .attr("d", path);

//     cities.on('click',clicked);

//   });

// function clicked(d) {
//   var x, y, k;

//   if (d && centered !== d) {
//     var centroid = path.centroid(d);
//     x = centroid[0];
//     y = centroid[1];
//     k = 4;
//     centered = d;
//   } else {
//     x = width / 2;
//     y = height / 2;
//     k = 1;
//     centered = null;
//   }

//   g.selectAll("path")
//     .classed("active", centered && function(d) { return d === centered; });

//   g.transition()
//     .duration(750)
//     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
//     .style("stroke-width", (0.5 / k) + "px");
// }









// //Pour dire que l'on veut une carte
// const path = d3.geoPath();

// //Pour définir le centre de la carte
// const projection = d3.geoConicConformal()
//   .center([2.454071, 46.279229])
//   .scale(1000) //Pour définir la couverture
//   .translate([width / 2, height / 2]);

//   path.projection(projection); //associer le path à la projection

// const svg = d3.select("#graph-loyer-moyen").append("svg")
//   .attr("id", "svg")
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
//   .attr("class", "Blues");


// const deps = svg.append("g");

// d3.json('swiss-maps.json').then(function(geojson) {

// //dessiner le path avec les features des données
//     deps.selectAll("path")
//       .data(geojson.features)
//       .enter()
//       .append("path")
//       .attr("d", path);
//   });







d3.json(carte).then(function(geojson) {

    console.log(carte);
























  


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