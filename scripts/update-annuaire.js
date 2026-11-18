const fs = require('fs');

const html = fs.readFileSync('nouveau 14.html', 'utf8');

const marker =
  '<script id="__NEXT_DATA__" type="application/json">';

const start = html.indexOf(marker);

if (start === -1) {
  throw new Error('__NEXT_DATA__ introuvable');
}

const jsonStart = start + marker.length;
const end = html.indexOf('</script>', jsonStart);

const jsonText = html.substring(jsonStart, end);

const data = JSON.parse(jsonText);

const item = data.props.pageProps.item;

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

fs.writeFileSync(
  'data/annuaire-acteurs.json',
  JSON.stringify([acteur], null, 2),
  'utf8'
);

console.log('✅ Annuaire généré');
