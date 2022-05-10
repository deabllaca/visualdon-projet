import * as d3 from 'd3';

//importation des données
import fichier from '../data/dataset-logements-1990-2020.csv'

export default function loger() {

    //Traitement des données
    const tableau = fichier.map((d, i) => {
        const values = {
            "annee": d.annee,
            "logement": d.logements
        }
        return values
    })





    //Définition des marges
    let margin = { top: 90, right: 40, bottom: 60, left: 70 };
    let width = 1200 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;


    // let div = d3.select("body")
    //     .append("div")
    //     .attr('id', 'graph-logements')


    let svg = d3.select(".graph-maison")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    //tooltip

    // create a tooltip
    let tooltip = d3.select(".graph-maison")
        .append("div")
        .attr("class", "tooltip")
        .style("visibility", "hidden")


    //Définition des échelles
    let x = d3.scaleBand()
        .domain(tableau.map(d => d.annee))
        .range([0, width])

    let y = d3.scaleLinear()
        .domain([3000000, 5000000])
        .range([height, 0]);

    //Création des axes

    svg.append("g") //Pour créer les axes il faut appeler les échelles correspondantes
        .attr("class", "axisX")
        .attr("transform", "translate(0," + height + ")") //Sinon l'axe est en haut...
        .call(d3.axisBottom(x))


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
            .y(function (d) { return y(d.logement) })
            .curve(d3.curveMonotoneX)
        )





    //Les points
    function mouseOver(event, d) {
        d3.select(this)
            .transition()
            .duration(200)
            .attr("r", 17)
            .style("fill", "red")
            .style("stroke", "#fff")

        tooltip.style("visibility", "visible")
            .style("left", event.x + 60 + "px")
            .style("top", event.y  + "px")

        tooltip.html(`${d.logement} logements `)
        tooltip.transition().duration(200)

    }

    function mouseLeave() {
        d3.select(this)
            .transition()
            .duration(200)
            .attr("r", 7)
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
        .attr("cx", (d, i) => x(d.annee) + 40)
        .attr("cy", (d, i) => y(d.logement))
        .attr("r", 7)
        .style("fill", "blue")

        .on("mouseover", mouseOver)
        .on("mouseleave", mouseLeave)


    //labels
    svg.append('text')
        .text("logements")
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
        .text("Evolution du nombre de logements en Suisse")
        .attr("x", 250)
        .attr("y", 0)
        .style("font-size", "30")
        .style("text-decoration", "bold")
        .style("fill", `black`)
        .style("font-family", `Montserrat`)
}