import * as d3 from 'd3';
import { json } from 'd3-fetch'

// Ménages privés selon le type de ménage, données cumulées 2018-2020
import menages from '../data/Menages-prives-types-2018–2020.csv'

// Les ménages 
menages.forEach(type => { //on cherche d'abord à créer un tableau objet "type" dans lequel on va ajouter tous les noms de pays
    (Object.keys(type)).forEach(key => {
        if (typeof type[key] == 'string') { //ici on veut tout les éléments du csv qui est une chaine de caractères (les chiffres) sauf la colonne country (donc les noms des pays)
            type[key] = strToInt(type[key])
        }
    })
    // console.log(pays['2017']); //pour vérifier: ca affiche toutes les populations de 2017
})