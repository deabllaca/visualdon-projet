import * as d3 from 'd3';

//importation des données
import fichier from '../data/dataset-forêt-modifie.csv'

//Définition des marges
let margin = { top: 90, right: 40, bottom: 60, left: 70 };
let width = 1200 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;


let div = d3.select("body")
    .append("div")
    .attr('id', 'graph-forets')


let svg = div
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

    let g = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2  + ")");










// Read data
d3.csv(fichier, function(data) {

  // stratify the data: reformatting for d3.js
  var root = d3.stratify()
    .id(function(d) { return d.region; })   // Name of the entity (column name is name in csv)
    .parentId(function(d) { return d.region; })   // Name of the parent (column name is parent in csv)
    (data);
  root.sum(function(d) { return +d.ha })   // Compute the numeric value for each entity

  // Then d3.treemap computes the position of each element of the hierarchy
  // The coordinates are added to the root object above
  d3.treemap()
    .size([width, height])
    .padding(4)
    (root)

console.log(root.leaves())
  // use this information to add rectangles:

  g
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "black")
      .style("fill", "#69b3a2");

  // and to add the text labels
  g
    .selectAll("text")
    .data(root.leaves())
    .enter()
    .append("text")
      .attr("x", function(d){ return d.x0+10})    // +10 to adjust position (more right)
      .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
      .text(function(d){ return d.region})
      .attr("font-size", "15px")
      .attr("fill", "white")
})