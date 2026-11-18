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

    console.log(
        'Status:',
        response.status
    );

    console.log(
        'Content-Type:',
        response.headers.get('content-type')
    );

    const text =
        await response.text();

    console.log(
        text.substring(0, 1000)
    );

}

main();
