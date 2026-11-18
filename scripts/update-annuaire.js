const fs = require('fs');

// Lecture du fichier HTML téléchargé depuis Intramuros
const html = fs.readFileSync('nouveau 14.html', 'utf8');

// Extraction du bloc __NEXT_DATA__
const marker = '<script id="__NEXT_DATA__" type="application/json">';

const start = html.indexOf(marker);

if (start === -1) {
    throw new Error('__NEXT_DATA__ introuvable');
}

const jsonStart = start + marker.length;

const end = html.indexOf('</script>', jsonStart);

const jsonText = html.substring(jsonStart, end);

// Conversion JSON
const data = JSON.parse(jsonText);

// Récupération de l'acteur
const item = data.props.pageProps.item;

// Mapping Intramuros -> Annuaire
const acteur = {
    id: item.id,
    nom: item.name,
    categorie: item.category_name,
    description: item.description,
    telephone: item.number,
    email: item.email,
    site: item.website,
    adresse: item.address_label,
    logo: item.logo,
    cover: item.cover,
    facebook: item.facebook,
    instagram: item.instagram,
    url: item.shared_url
};

console.log(acteur);

// Génération du JSON
fs.writeFileSync(
    'data/annuaire-acteurs.json',
    JSON.stringify([acteur], null, 2),
    'utf8'
);

console.log('✅ annuaire-acteurs.json généré');
