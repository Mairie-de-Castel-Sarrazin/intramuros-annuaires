const fs = require('fs');

async function main() {

    const actorsFile = JSON.parse(
        fs.readFileSync(
            'data/acteurs-economiques.json',
            'utf8'
        )
    );

    const actorId =
        actorsFile.actors[0];

    console.log(
        `Téléchargement acteur ${actorId}`
    );

    const response = await fetch(
    `https://www.intramuros.org/_next/data/app-RC006-433-g6a0b-261106_195914949932/fiche/acteur/${actorId}.json`
    );
    const text = await response.text();
    console.log(text.substring(0,1000));
    return;
}
);

    console.log(
    'Status:',
    response.status
);

console.log(
    'Content-Type:',
    response.headers.get('content-type')
);

    const html =
        await response.text();

    fs.writeFileSync(
    'debug.html',
    html,
    'utf8'
);

console.log(
    html.substring(0, 1000)
);

    const marker =
        '<script id="__NEXT_DATA__" type="application/json">';

    const start =
        html.indexOf(marker);

    if (start === -1) {
        throw new Error(
            '__NEXT_DATA__ introuvable'
        );
    }

    const jsonStart =
        start + marker.length;

    const end =
        html.indexOf(
            '</script>',
            jsonStart
        );

    const jsonText =
        html.substring(
            jsonStart,
            end
        );

    const data =
        JSON.parse(jsonText);

    const item =
        data.props.pageProps.item;

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
        JSON.stringify(
            [acteur],
            null,
            2
        ),
        'utf8'
    );

    console.log(
        '✅ Annuaire généré'
    );
}

main();
