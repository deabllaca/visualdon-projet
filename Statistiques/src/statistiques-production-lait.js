import * as d3 from 'd3';


// Population par canton en 2020
import data from '../data/dataset-production-lait.csv'


export default function lait() {

    const tableau = data.map((d, i) => {
        const values = {
            "annee": d.annee,
            "tonnes": d.tonnes,
        }
        return values
    })


    // Marges et canevas
    let margin = { top: 90, right: 190, bottom: 60, left: 190 };
    let width = 1200 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // d3.select("body")
    //     .append("div")
    //     .attr('id', 'graph-lait')

    let svg = d3.select(".graph-vache")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


    // Définition des échelles 
    let x = d3.scaleBand() //echelle//Pour avoir le nom en dessous de la band (colonne) pour les données ordinales   
        .domain(tableau.map(d => d.annee))
        .range([0, width]); //Pour avoir les différents traits

    let y = d3.scaleLinear() //echelle
        .domain([0, 5000]) //Pour avoir les différents traits
        .range([height, 0]); //Inverser l'ordre pour les données quantitatives //range doit être contenu dans le canva


    //Création des axes    
    svg.append("g") //Pour créer les axes il faut appeler les échelles correspondantes
        .attr("class", "axisY")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .style("font-size", "16px");


    svg.append("g") //Pour créer les axes il faut appeler les échelles correspondantes
        .attr("class", "axisX")
        .attr("transform", "translate(0," + height + ")") //Sinon l'axe est en haut...
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(10)" + "rotate(45)") //Pour décaler les textes un peu plus bas et les mettre en biais
        .style("font-size", "12px")
        .style("text-anchor", "start");


    //Création du graphique
    svg.selectAll("bars")
        .data(tableau)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr('x', (d, i) => x(d.annee) + 15)
        .attr('y', d => y(d.tonnes))

        .attr("height", d => y(0) - y(d.tonnes))
        .attr("fill", `orange`)
        .attr("width", x.bandwidth() / 5)



    //Labels du graphique
    svg.append('text')
        .text("années")
        .attr('text-anchor', 'end')
        .attr("x", width + 85)
        .attr("y", height - 4)
        .style("font-size", "20")
        .style("text-decoration", "bold")
        .style("fill", `#black`)
        .style("font-family", `Montserrat`)

    //
    svg.append('text')
        .text("tonnes")
        .attr('text-anchor', 'end')
        // .attr("transform", "rotate(-90)")
        .attr("x", 30)
        .attr("y", -15)
        .style("font-size", "20")
        .style("text-decoration", "bold")
        .style("fill", `black`)
        .style("font-family", `Montserrat`)

    //
    svg.append("text")
        .text("Evolution production du lait par année")
        .transition()
        .ease(d3.easeLinear)
        .duration(500)
        .attr("x", 180)
        .attr("y", 0)
        .style("font-size", "30")
        .style("text-decoration", "bold")
        .style("fill", `black`)
        .style("font-family", `Montserrat`)

}