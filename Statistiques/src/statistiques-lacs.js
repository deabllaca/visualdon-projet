import * as d3 from 'd3';

//importation des données
import fichier from '../data/dataset-lacs-modifie.csv'


// Aménagement des différents dataset

const datasetsuperficie = fichier.map((d, i) => {
    const values = {
        "lac": d.lac,
        "variable2": d.superficie_km2
    }
    return values
})

const datasetaltitude = fichier.map((d, i) => {
    const values = {
        "lac": d.lac,
        "variable2": d.altitude_m
    }
    return values
})

const datasetcontenu = fichier.map((d, i) => {
    const values = {
        "lac": d.lac,
        "variable2": d.contenu_m3
    }
    return values
})

const datasetprofondeur = fichier.map((d, i) => {
    const values = {
        "lac": d.lac,
        "variable2": d.profondeur_m
    }
    return values
})





//Définition des marges
let margin = { top: 90, right: 40, bottom: 60, left: 70 };
let width = 1200 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;


let div = d3.select("body")
    .append("div")
    .attr('id', 'graph3')


let svg = d3.select("#graph3")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .sort(null)


let radius = 275;


let g = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2  + ")");


let colors = [

    '#e63e9b', '#ec967c', '#7a3495', '#75ca12', '#68daef', '#fb2935', '#9d6515', '#58c76f', '#bcc3fa', '#e1e13d', '#25f39a', '#ba4cd8', '#188174', '#0e12c7', '#d7bcf0'
]


// div.append("text")
//     .text("Quelques faits sur les lacs")
//     .attr("x", 300)
//     .attr("y", 0)
//     .style("font-size", "30")
//     .style("text-decoration", "bold")
//     .style("fill", `black`)
//     .style("font-family", `Montserrat`)

function update(dataset, nom, unité) {

    // Définition de la scale
    let ordScale = d3.scaleOrdinal()
        .domain(dataset)
        .range(colors);

    // Utilisation de la fonction pie qui va atransformer nos données en angle
    let pie = d3.pie()
        .padAngle(.015) //Pour définir l'angle entre les tranches
        .value(function (d) {  //Pour définir la valeur des tranche
            return d.variable2;
        });


    //Création d'un arc reçevant les données adaptés pour le pie
    let arc = g.selectAll("arc")
        .data(pie(dataset))
        .enter();


    function tweenPie(b) {
        b.innerRadius = 0;
        var i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
        return function (t) { return path(i(t)); };
    }

    // Step 6
    let path = d3.arc()
        .outerRadius(radius) //rayon externe
        .innerRadius(180) //rayon interne
        .cornerRadius(7)

    arc.append("path") //après que les données soient entrées...
        .attr("fill", function (d, i) { return ordScale(dataset[i].lac); })
        // .attr("d", path) // ça va suivre le path, rappel cela se fait avec l'attribut d^
        .transition()
        .duration(1500)
        .attrTween('d', tweenPie)

    // Step 7
    let label = d3.arc()
        .outerRadius(radius) //rayon externe 
        .innerRadius(200) //rayon interne à zéro pour pie chart, si valeur >0 = donut


    arc.append("text")
        .attr("transform", function (d) {
            return "translate(" + label.centroid(d) + ")";
        })
        .text(function (d, i) { return dataset[i].variable2; })
        .attr('text-anchor', 'middle')
        .style("font-family", "Montserrat")
        .style("font-size", 10)
        .style("opacity", 0)
        .transition()
        .duration(12000)
        .style("opacity", 100)
        .style("font-weighty", "bold")

    arc.append("text")
        .text(nom + " des lacs")
        .attr('text-anchor', 'middle')
        .style("font-family", "Montserrat")
        .style("font-size", 35)

    arc.append("text")
        .text(unité)
        .attr('text-anchor', 'middle')
        .style("font-family", "Montserrat")
        .style("font-size", 27)
        .attr("transform", "translate(0,60)")

    let legend = svg.selectAll(".legend")
        .data(pie(dataset)) //les données du pie entre dans le groupe qui s'appelle legend
        .enter().append("g")
        .attr("transform", function (d, i) {
            return "translate(" + (width - 150) + "," + (i * 33 + 20) + ")"; // place each legend on the right and bump each one down 15 pixels
        })
        .attr("class", "legend");


    legend.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", function (d, i) {
            return ordScale(dataset[i].lac);
        });

    legend.append("text")
        .transition()
        .duration(1500)
        .text(function (d, i) {
            return dataset[i].lac;
        })
        .style("font-size", 20)
        .style("font-family", "Montserrat")
        .attr("y", 10)
        .attr("x", 20)
    
}



//affichage de base

let nom = "Superficie"
let unité ="[km2]"
update(datasetsuperficie, nom, unité)



//Boutons

let boutons = d3.select("#graph3")
    .append("g")
    .attr("class", "boutons")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

boutons
    .append("button")
    .attr("class", "superficie")
    .text("superficie")

boutons
    .append("button")
    .attr("class", "altitude")
    .text("altitude")

boutons
    .append("button")
    .attr("class", "contenu")
    .text("contenu")

boutons
    .append("button")
    .attr("class", "profondeur")
    .text("profondeur")


d3.select('.altitude').on('click', () => {
    g.selectAll("*").remove();
    let nom = "Altitude"
    let unité ="[m]"
    update(datasetaltitude, nom, unité)
})

d3.select('.superficie').on('click', () => {
    g.selectAll("*").remove();;
    let nom = "Superficie"
    let unité ="[km2]"
    update(datasetsuperficie, nom, unité)
})

d3.select('.contenu').on('click', () => {
    g.selectAll("*").remove();
    let nom = "Contenu"
    let unité ="[m3]"
    update(datasetcontenu, nom, unité)

})

d3.select('.profondeur').on('click', () => {
    g.selectAll("*").remove(); 
    let nom = "Profondeur"
    let unité ="[m]" 
    update(datasetprofondeur, nom, unité)
})



































