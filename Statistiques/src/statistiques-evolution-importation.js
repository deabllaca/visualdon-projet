import * as d3 from 'd3';
import { event as d3event } from 'd3-selection'
import data from '../data/dataset-importation-modifie.csv'


const tableau = data.map((d, i) => {

    const annee = '2020'
    const values = {
        "pays": d.pays,
        "nombre": d[`${annee}`],
        "annee": annee

    }
    return values
})

const tableau2 = tableau




// Marges et canevas
let margin = { top: 90, right: 190, bottom: 60, left: 190 };

let width = 1200 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

d3.select("body")
    .append("div")
    .attr('id', 'graph-importation')

//map

//Pour dire que l'on veut une carte
const path = d3.geoPath();

//Pour définir le centre de la carte
const projection = d3.geoNaturalEarth1() // droite ou arquée...
    .center([0, 20])
    .scale(width / 1.8 / Math.PI) //Pour définir la couverture
    .translate([width / 2, height / 2]);

path.projection(projection); //associer le path à la projection

//Pour définir la couleur

let colorScale = d3.scaleSequentialPow(d3.interpolateMagma)

    .domain([200000, 0])
    .exponent(0.5)


const svg = d3.select("#graph-importation").append("svg")
    .attr("id", "svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("fill", "#69b3a2")
    .style("stroke", "#fff")



const deps = svg.append("g");

//Label



//tooltip

// create a tooltip
let tooltip = d3.select("#graph-importation")
    .append("div")
    .attr("class", "tooltip")
    .style("visibility", "hidden")



function displaygraph(tab) {

    //entering the data
    d3.json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson').then(function (geojson) {

        deps.selectAll("path")
            .data(geojson.features)
            .join(enter => enter.append('path')

                .attr("d", path)
                .attr("class", "pays")
                .attr("fill", function (d) {
                    const country = tab.find((country) => {
                        // console.log(country.pays);
                        return country.pays == d.properties.name
                    })
                    if (country) {
                        return colorScale(country.nombre)
                    }
                })

                .style("opacity", .8)
                .on("mouseover", mouseOver)
                .on("mousemove", mousemove)
                .on("mouseleave", mouseLeave),

                update => update.transition(d3.transition()

                    .duration(500)

                    // .attr("fill", function (d) {
                    //     const hello = tab.find((hello) => {
                    //         console.log(hello.pays);
                    //         return hello.pays == d.properties.name
                    //     })
                    //     if (hello) {
                    //         return colorScale(hello.nombre)
                    //     }
                    // })

                    ,
                    exit => exit.remove())








            )
        //create the functions
        function mouseOver() {
            d3.selectAll('.pays')
                .transition()
                .duration(200)
                .style("opacity", .4)
            d3.select(this)
                .transition()
                .duration(200)
                .style("opacity", 4)
                .style("stroke", "#fff")

            tooltip.style("visibility", "visible")
            tooltip.transition().duration(200)

        }

        function mouseLeave() {
            d3.selectAll('.pays')
                .transition()
                .duration(200)
                .style("opacity", .8)
            d3.select(this)
                .transition()
                .duration(200)
                .style("stroke", "#fff")

            tooltip.style("visibility", "hidden")
            tooltip.transition().duration(200).style("opacity", 0)
        }


        function mousemove(event, d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);

            //Any time the mouse moves, the tooltip should be at the same position
            tooltip
                .style("left", event.x + "px")
                .style("top", event.y + 2400 + "px")

            const nombre = tab.find(element =>
                element.pays === d.properties.name)
            console.log(nombre)

            if (nombre) {
                tooltip
                    .html(`${d.properties.name} : ${nombre.nombre}  `)
            } else {
                tooltip
                    .html(`${d.properties.name} : pas de données  `)
            }


        }
    })
}




svg.append("text")
    .text("Les importations")
    .attr("x", 800)
    .attr("y", 200)
    .style("font-size", "45")
    .style("text-decoration", "bold")
    .style("fill", `black`)
    .style("font-family", `Montserrat`)

svg.append("text")
    .text("en Suisse")
    .attr("x", 800)
    .attr("y", 250)
    .style("font-size", "45")
    .style("text-decoration", "bold")
    .style("fill", `black`)
    .style("font-family", `Montserrat`)

svg.append("text")
    .text("2020")
    .attr("x", 1020)
    .attr("y", 250)
    .attr('class', 'paragraphe')
    .style("font-size", "45")
    .style("text-decoration", "bold")
    .style("fill", `orange`)
    .style("font-family", `Montserrat`)
    .style("font-weighty", "bold")









displaygraph(tableau)


//animation

let boutons = d3.select("#graph-importation")
    .append("g")
    .attr("class", "boutons")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

boutons
    .append("button")
    .attr("id", "play")
    .text("play")

boutons
    .append("button")
    .attr("id", "stop")
    .text("stop")

// Variable où on stocke l'id de notre intervalle
let nIntervId;

function animate() {
    // regarder si l'intervalle a été déjà démarré
    if (!nIntervId) {
        nIntervId = setInterval(play, 1000);
    }
}

let i = 1990;
function play() {
    // Recommencer si à la fin du tableau
    if (i == 2020) {
        i = 1990;
    } else {
        i++;
    }

    // Mise à jour graphique
    d3.select('.paragraphe')
        .text(`${[i]}`)

    tableau2.forEach(element => {
        element.annee = i
    });

    displaygraph(tableau2);
}




// Mettre en pause
function stop() {
    clearInterval(nIntervId);
    nIntervId = null;
}

// // Fonction de mise à jour du graphique
// function updateChart(tab) {
//     displaygraph(tab)
//     update => update.transition(d3.transition()
//         .duration(500),
//         displaygraph(tab),
//         exit => exit.remove())
// }

// Event listener
document.getElementById("play").addEventListener("click", animate);
document.getElementById("stop").addEventListener("click", stop);


