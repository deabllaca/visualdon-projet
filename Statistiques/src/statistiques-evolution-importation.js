import * as d3 from 'd3';
import { event as d3event } from 'd3-selection'
import data from '../data/dataset-importation-modifie.csv'


export default function importation() {


    // Marges et canevas
    let margin = { top: 90, right: 190, bottom: 60, left: 190 };

    let width = 1200 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // d3.select("body")
    //     .append("div")
    //     .attr('id', 'graph-importation')

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
        .exponent(0.4)


    const svg = d3.select(".graph-bateau").append("svg")
        .attr("id", "svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("fill", "#69b3a2")
        .style("stroke", "#fff")



    const deps = svg.append("g");

    //Label



    //tooltip

    // create a tooltip
    let tooltip = d3.select(".graph-bateau")
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


                    update => update

                        .attr("d", path)
                        .attr("class", "pays")
                        .attr("fill", function (d) {
                            const country = tab.find((country) => {
                                return country.pays == d.properties.name
                            })
                            if (country) {
                                return colorScale(country.nombre)
                            }
                        })

                        .style("opacity", .8)
                        .on("mouseover", mouseOver)
                        .on("mousemove", mousemove)
                        .on("mouseleave", mouseLeave)




                )







            //create the functions

            function mousemove(event, d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);

                //Any time the mouse moves, the tooltip should be at the same position
                tooltip
                    .style("left", event.x + 80 + "px")
                    .style("top", event.y + "px")


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







    const tab = data.map((d, i) => {

        const values = {
            "pays": d.pays,
            "nombre": d[2020],
            "annee": 2020

        }
        return values
    })

    displaygraph(tab)


    //animation

    let boutons = d3.select(".graph-bateau")
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
    let annee;

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

        annee = i

        const tableau = data.map((d, i) => {

            const values = {
                "pays": d.pays,
                "nombre": d[annee],
                "annee": annee

            }
            return values
        })

        // deps.selectAll("*").remove();
        displaygraph(tableau);
    }




    // Mettre en pause
    function stop() {
        clearInterval(nIntervId);
        nIntervId = null;
    }

    // Event listener
    document.getElementById("play").addEventListener("click", animate);
    document.getElementById("stop").addEventListener("click", stop);


}