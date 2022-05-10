// import "./statistiques-menages.js"
// import "./statistiques-loyermoyen-canton.js"
// import "./statistiques-transport.js"
// import "./statistiques-sommets.js"
// import "./statistiques-population.js"
// import "./statistiques-lacs.js"
// import "./statistiques-evolution-importation.js"
// import "./statistiques-evolution-logement.js"
// import "./statistiques-forets.js"
// import "./statistiques-evolutions-votations.js"
// import "./statistiques-production-lait.js"


import * as d3 from 'd3';
// import { json } from 'd3-fetch' // Pour dire qu'on utilise d3

import transport from "./statistiques-transport.js"
import montagnes from "./statistiques-sommets.js"
import lait from "./statistiques-production-lait.js";
import demographie from './statistiques-population.js';
import lac from './statistiques-lacs.js';
import foret from './statistiques-forets.js';
import vote from './statistiques-evolutions-votations.js';
import loger from './statistiques-evolution-logement.js';
import importation from './statistiques-evolution-importation.js';



//------------------------------------------------- LES BOUTONS cercles ROUGES ----------------------------------------------------------------------------------
document.querySelector('#btn-transport').addEventListener('click', function (event) {
    // console.log("direction transports");
 
    //on modifie la classe "active" sur la section
    document.querySelector('section.active')?.classList.remove('active')
    document.querySelector('section.stats-transport')?.classList.add('active')

    console.log("vkjdfv");
 
    document.querySelector('#graph-transport').replaceChildren();
    transport();

});

document.querySelector('#btn-maison').addEventListener('click', function (event) {

    //on modifie la classe "active" sur la section
    document.querySelector('section.active')?.classList.remove('active')
    document.querySelector('section.stats-maison')?.classList.add('active')

    document.querySelector('.graph-maison').replaceChildren();
    loger();

});

document.querySelector('#btn-lac').addEventListener('click', function (event) {

    //on modifie la classe "active" sur la section
    document.querySelector('section.active')?.classList.remove('active')
    document.querySelector('section.stats-lac')?.classList.add('active')

    document.querySelector('.graph-lac').replaceChildren();
    lac();

});

document.querySelector('#btn-bateau').addEventListener('click', function (event) {

    //on modifie la classe "active" sur la section
    document.querySelector('section.active')?.classList.remove('active')
    document.querySelector('section.stats-bateau')?.classList.add('active')

    document.querySelector('.graph-bateau').replaceChildren();
    importation();

});

// document.querySelector('#btn-ble').addEventListener('click', function (event) {

//     //on modifie la classe "active" sur la section
//     document.querySelector('section.active')?.classList.remove('active')
//     document.querySelector('section.stats-ble')?.classList.add('active')

// });

// document.querySelector('#btn-poisson').addEventListener('click', function (event) {

//     //on modifie la classe "active" sur la section
//     document.querySelector('section.active')?.classList.remove('active')
//     document.querySelector('section.stats-poisson')?.classList.add('active')

// });

document.querySelector('#btn-foret').addEventListener('click', function (event) {

    //on modifie la classe "active" sur la section
    document.querySelector('section.active')?.classList.remove('active')
    document.querySelector('section.stats-foret')?.classList.add('active')

    document.querySelector('.graph-foret').replaceChildren();
    foret();

});

document.querySelector('#btn-vote').addEventListener('click', function (event) {

    //on modifie la classe "active" sur la section
    document.querySelector('section.active')?.classList.remove('active')
    document.querySelector('section.stats-vote')?.classList.add('active')

    document.querySelector('.graph-votation').replaceChildren();
    vote();

});

document.querySelector('#btn-montagne').addEventListener('click', function (event) {

    //on modifie la classe "active" sur la section
    document.querySelector('section.active')?.classList.remove('active')
    document.querySelector('section.stats-montagne')?.classList.add('active')

    document.querySelector('.graph-montagnes').replaceChildren();
    montagnes();

});

// document.querySelector('#btn-soleil').addEventListener('click', function (event) {

//     //on modifie la classe "active" sur la section
//     document.querySelector('section.active')?.classList.remove('active')
//     document.querySelector('section.stats-soleil')?.classList.add('active')

// });

document.querySelector('#btn-vache').addEventListener('click', function (event) {

    //on modifie la classe "active" sur la section
    document.querySelector('section.active')?.classList.remove('active')
    document.querySelector('section.stats-vache')?.classList.add('active')

    document.querySelector('.graph-vache').replaceChildren();
    lait();

});

document.querySelector('#btn-personne').addEventListener('click', function (event) {

    //on modifie la classe "active" sur la section
    document.querySelector('section.active')?.classList.remove('active')
    document.querySelector('section.stats-personne')?.classList.add('active')

    document.querySelector('.graph-personne').replaceChildren();
    demographie();

});

// ------------------------------------------------- LE BOUTON RETOUR -------------------------------------------------------------------------------
// document.querySelector('.btn-retour-ble').addEventListener('click', function (event) {
//     console.log("retour à la page d'acceuil!");

//     //on modifie la classe "active" sur la section
//     document.querySelector('section.active')?.classList.remove('active')
//     document.querySelector('section.home-section')?.classList.add('active')

// });

document.querySelector('.btn-retour-transport').addEventListener('click', function (event) {
    console.log("retour à la page d'acceuil!");

    //on modifie la classe "active" sur la section
    document.querySelector('section.active')?.classList.remove('active')
    document.querySelector('section.home-section')?.classList.add('active')

    document.querySelector('.graph-transport').replaceChildren();
    transport();
});

document.querySelector('.btn-retour-vache').addEventListener('click', function (event) {
    console.log("retour à la page d'acceuil!");

    //on modifie la classe "active" sur la section
    document.querySelector('section.active')?.classList.remove('active')
    document.querySelector('section.home-section')?.classList.add('active')
});

// document.querySelector('.btn-retour-soleil').addEventListener('click', function (event) {
//     console.log("retour à la page d'acceuil!");

//     //on modifie la classe "active" sur la section
//     document.querySelector('section.active')?.classList.remove('active')
//     document.querySelector('section.home-section')?.classList.add('active')
// });

document.querySelector('.btn-retour-montagne').addEventListener('click', function (event) {
    console.log("retour à la page d'acceuil!");

    //on modifie la classe "active" sur la section
    document.querySelector('section.active')?.classList.remove('active')
    document.querySelector('section.home-section')?.classList.add('active')
});

document.querySelector('.btn-retour-vote').addEventListener('click', function (event) {
    console.log("retour à la page d'acceuil!");

    //on modifie la classe "active" sur la section
    document.querySelector('section.active')?.classList.remove('active')
    document.querySelector('section.home-section')?.classList.add('active')


});

document.querySelector('.btn-retour-foret').addEventListener('click', function (event) {
    console.log("retour à la page d'acceuil!");

    //on modifie la classe "active" sur la section
    document.querySelector('section.active')?.classList.remove('active')
    document.querySelector('section.home-section')?.classList.add('active')
});

// document.querySelector('.btn-retour-poisson').addEventListener('click', function (event) {
//     console.log("retour à la page d'acceuil!");

//     //on modifie la classe "active" sur la section
//     document.querySelector('section.active')?.classList.remove('active')
//     document.querySelector('section.home-section')?.classList.add('active')
// });

document.querySelector('.btn-retour-lac').addEventListener('click', function (event) {
    console.log("retour à la page d'acceuil!");

    //on modifie la classe "active" sur la section
    document.querySelector('section.active')?.classList.remove('active')
    document.querySelector('section.home-section')?.classList.add('active')
});

document.querySelector('.btn-retour-maison').addEventListener('click', function (event) {
    console.log("retour à la page d'acceuil!");

    //on modifie la classe "active" sur la section
    document.querySelector('section.active')?.classList.remove('active')
    document.querySelector('section.home-section')?.classList.add('active')
});

document.querySelector('.btn-retour-bateau').addEventListener('click', function (event) {
    console.log("retour à la page d'acceuil!");

    //on modifie la classe "active" sur la section
    document.querySelector('section.active')?.classList.remove('active')
    document.querySelector('section.home-section')?.classList.add('active')
});

document.querySelector('.btn-retour-personne').addEventListener('click', function (event) {
    console.log("retour à la page d'acceuil!");

    //on modifie la classe "active" sur la section
    document.querySelector('section.active')?.classList.remove('active')
    document.querySelector('section.home-section')?.classList.add('active')
});





//animer les boutons pour le fuuuun

function expandCircle() {
    d3.selectAll('.bouge')
        .transition()
        .duration(2000)
        .attr('r', 20)
        .on('end', contractCircle);
}

function contractCircle() {
    d3.selectAll('.bouge')
        .transition()
        .duration(2000)
        .attr('r', 7)
        .on('end', expandCircle);
}


function movenuage() {
    d3.selectAll('.nuage')
        .transition()
        .ease(d3.easeLinear)
        .duration(15000)
        .attr("transform", "translate(1400,0)")
        .on('end', keepmovingnuage);
}

function keepmovingnuage() {
    d3.selectAll('.nuage')
    .transition()
    .ease(d3.easeLinear)
    .duration(15000)
    .attr("transform", "translate(-1400,0)")
    .on('end', movenuage);
}

movenuage()
expandCircle()


