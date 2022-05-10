import * as d3 from 'd3';

//importation des données
import fichier from '../data/dataset-forêt-modifie.csv'



export default function foret() {
  //Traitement données

  const tableau = fichier.map((d, i) => {

    let randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`

    const values = {
      "region": d.region,
      "ha": d.ha,
      "pourcent": d.pourcent,
      "x": Math.floor(Math.random() * 1200),
      "y": Math.floor(Math.random() * 1200),
      "color": randomColor
    }
    return values
  })

  console.log(tableau);

  //Définition des marges
  let margin = { top: 90, right: 40, bottom: 60, left: 70 };
  let width = 1200 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;



  // let div = d3.select("body")
  //   .append("div")
  //   .attr('id', 'graph-forets')


  // let svg = d3.select("#graph-transport")

  // .append("svg")
  // .attr("width", width + margin.left + margin.right)
  // .attr("height", height + margin.top + margin.bottom)

  // .append("g")
  // .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  

  let svg = d3.select('.graph-foret')
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

  // let g = svg.append("g")
  //   .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // create a tooltip
  let tooltip = d3.select(".graph-foret")
    .append("div")
    .attr("class", "tooltip")
    .style("visibility", "hidden")

  svg.selectAll("circle")
    .data(tableau)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return d.x })
    .attr("cy", function (d) { return d.y })
    .attr("r", function (d) {
      return (Math.sqrt(d.ha) / Math.PI) / 3
    })
    .attr("fill", function (d) {
      return d.color;
    })
    .on("mouseover", mouseOver)
    .on("mouseleave", mouseLeave)



  svg.selectAll("text")
    .data(tableau)
    .enter()
    .append("text")
    .attr("x", function (d) { return d.x + (Math.sqrt(d.ha) / Math.PI) / 3 })
    .attr("y", function (d) { return d.y + 4 })
    .text(function (d) { return d.region })
    .style("font-family", "arial")
    .style("font-size", "12px")


  svg.append("text")
    .text("Pourcentage des forêts en Suisse par région")
    .attr("x", 300)
    .attr("y", 300)
    .style("font-size", "30")
    .style("text-decoration", "bold")
    .style("fill", `black`)
    .style("font-family", `Montserrat`)

  function mouseOver(event, d) {
    d3.select(this)
      .transition()
      .duration(200)
    tooltip.style("visibility", "visible")
      .style("left", event.x + 70 + "px")
      .style("top", event.y + "px")

    tooltip.html(`${d.pourcent} % `)
    tooltip.transition().duration(200)

  }

  function mouseLeave() {
    d3.select(this)
      .transition()
      .duration(200)
    tooltip.style("visibility", "hidden")
    tooltip.transition().duration(200)
  }




}