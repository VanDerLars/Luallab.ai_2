export const prerender = false;
// export const csr = false;

import type { Load } from '@sveltejs/kit';
import type { location, action } from '../structures';

export const locations: location[] = [];
export const actions: action[] = [];
export const lengths: string[] = [
	'sehr kurze',
	'kurze',
	'ausführliche',
	'sehr ausführliche',
];

export const protagonists: string[] = [
	'für ein 3-jähriges Kind',
	'für ein 6-jähriges Kind',
	'für ein 9-jähriges Kind',
	'für ein 12-jähriges Kind'
];
export const personProfessions: string[] = [
	'der unkluge Bauer',
	'der hilfreiche Jäger',
	'der liebe Zauberlehrling',
	'der gefräßige Bär',
	'die witzige Hexe',
	'der schläfrige Baum',
	'der schlaue Geist',
	'die schnelle Wüstenmaus',
	'der einäugige Pirat',
	'das schüchterne Seeungeheuer',
	'die hübsche Meerjungfrau',
	'der mutige Prinz',
	'der alte König',
	'die gütige Königin',
	'der berühmte Astronaut',
	'die berühmte Astronautin'
];

locations.push({ name: 'im Wald' });
locations.push({ name: 'im Wunderland' });
locations.push({ name: 'in den Bergen' });
locations.push({ name: 'im Weltall' });
locations.push({ name: 'in der verwunschenen Burg' });
locations.push({ name: 'im Unterwasser-Reich' });
locations.push({ name: 'im Land der freundlichen Hexe' });
locations.push({ name: 'Im Zauberwald' });
locations.push({ name: 'in der magischen Wüste' });
locations.push({ name: 'in der Drachenhöhle' });
locations.push({ name: 'im Schloss der Königin' });

actions.push({ name: 'erlebt ein Abenteuer' });
actions.push({ name: 'sucht einen Schatz' });
actions.push({ name: 'findet ungewöhnliche Freunde' });
actions.push({ name: 'begibt sich auf eine spannende Reise' });
actions.push({ name: 'reist in die Zukunft' });
actions.push({ name: 'reist in die Vergangen heit' });
actions.push({ name: 'trifft alte Freunde' });
actions.push({ name: 'besiegt ein Ungeheuer' });
actions.push({ name: 'gewinnt eine Wette' });
actions.push({ name: 'verirrt sich' });

// Schreibe eine Gute-Nacht-Geschichte für [Protgonist]. Folgende Handlung: {Name_Protagonist} {action} {location}. Figuren in der Geschichte: [{Figur der Profession}...]
// Schreibe eine lange, ausführliche Gute-Nacht-Geschichte für ein 6-jähriges Kind. Folgende Handlung: Marlene findet ungewöhnliche Freunde in der magischen Wüste. Figuren in der Geschichte: Albert der liebe Zauberlehrling, Piepsli die liebe Wüstenrennmaus, Drogo der böse Pirat.

// EXPORT
export const load: Load = () => {
	return {
		actions: actions,
		locations: locations,
		protagonists: protagonists,
		lengths: lengths,
		personProfessions: personProfessions
	};
};
