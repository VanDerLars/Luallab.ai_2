<script lang="ts">
	export const prerender = false;
	// export const csr = false;

	import type { person, location, action } from '../structures';
	import type { PageData } from './$types';

	import spinner from '$lib/spinner.gif';

	export let data: PageData;
	const locations: location[] = data.locations;
	const actions: action[] = data.actions;

	const personProfessions: string[] = data.personProfessions;
	const lengths: string[] = data.lengths;
	const protagonists: string[] = data.protagonists;

	let answer = '';

	let sel_length = lengths[0];
	let sel_protagonist = protagonists[0];
	let sel_hero: string = '';
	let sel_action: string = actions[0].name;
	let sel_location: string = locations[0].name;

	let person_name: string = '';
	let sel_personProfession: string = '';

	let persons: person[] = [];
	// let sel_length = '';
	const addPerson = () => {
		persons = [...persons, { name: person_name, profession: sel_personProfession, isGood: true }];
		person_name = '';
		sel_personProfession = '';
	};

	let gpt_load: string = 'noch keine Story erhalten';
	let gpt_story: string = '';
	let new_stories: string[] = [];
	let gpt_answered: boolean = false;
	let showSpinner: boolean = false;

	function getRandomInt(max: number) {
		return Math.floor(Math.random() * max);
	}

	// create the story
	async function handleSubmit() {
		let sel_person = '';
		for (var pers of persons) {
			sel_person = sel_person + pers.name + ' ' + pers.profession + ', ';
		}
		const story = `Schreibe eine ${sel_length} Gute-Nacht-Geschichte für ${sel_protagonist}. Folgende Handlung: ${sel_hero} ${sel_action} ${sel_location}. Figuren in der Geschichte: ${sel_person}. Beschreibe ganz genau, was ${sel_hero} in deiner Geschichte macht. Nutze eine leicht zu verstehende Sprache. Ende damit kurz, dass schon das nächste Abenteuer auf ${sel_hero} wartet.`;

		getGPT3Response(story).then(function (result) {
			console.log(result);
			gpt_story = result!.replaceAll('\n', '<br>');
			showSpinner = false;
		});
	}
	// add next story
	async function next_story() {
		// get random location
		let new_location: location = locations[getRandomInt(locations.length - 1)];
		let new_action: action = actions[getRandomInt(actions.length - 1)];

		let new_persons: string = '';
		const newPersonCount: number = getRandomInt(3);
		for (let i = 1; i <= newPersonCount; i++) {
			let new_person: person = persons[getRandomInt(persons.length - 1)];
			new_persons = new_persons + new_person.name + ' ' + new_person.profession + ', ';
		}
		const new_story = `Schreibe eine weitere ${sel_length} Gute-Nacht-Geschichte für ${sel_protagonist}. Folgende Handlung: ${sel_hero} ${new_action} ${new_location}. In der Geschichte sollen folgende Personen vorkommen: ${new_persons}. Beschreibe ganz genau, was ${sel_hero} in deiner Geschichte macht. Nutze eine leicht zu verstehende Sprache. Ende damit kurz, dass schon das nächste Abenteuer auf ${sel_hero} wartet.`;

		getGPT3Response(new_story).then(function (result) {
			console.log(result);
			new_stories = [...new_stories, result!.replaceAll('\n', '<br>')];
			showSpinner = false;
		});
	}
	//

	async function getGPT3Response(prompt: string) {
		gpt_load = 'Geschichte wird generiert...';
		showSpinner = true;

		return "sdsdsd"
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<!-- // Schreibe eine Gute-Nacht-Geschichte für [Protgonist]. 
        Folgende Handlung: {Name_Protagonist} {action} {location}. 
        Figuren in der Geschichte: [{Figur der Profession}...] -->

	<p>
		<span>schreibe eine</span>
		<select id="length" bind:value={sel_length} on:change={() => (answer = '')}>
			{#each lengths as length}
				<option value={length}>
					{length}
				</option>
			{/each}
		</select>
		<span>Gute-Nacht-Geschichte für</span>
		<select id="protagonist" bind:value={sel_protagonist} on:change={() => (answer = '')}>
			{#each protagonists as protagonist}
				<option value={protagonist}>
					{protagonist}
				</option>
			{/each}
		</select>
	</p>
	<h2>Folgende Handlung:</h2>
	<input bind:value={sel_hero} placeholder="Name der Heldin / des Helden" />

	<select id="action" bind:value={sel_action} on:change={() => (answer = '')}>
		{#each actions as action}
			<option value={action.name}>
				{action.name}
			</option>
		{/each}
	</select>
	<select id="location" bind:value={sel_location} on:change={() => (answer = '')}>
		{#each locations as location}
			<option value={location.name}>
				{location.name}
			</option>
		{/each}
	</select>

	<h2>Figuren der Geschichte:</h2>
	<div>
		<span>Person hinzufügen:</span>
		<input bind:value={person_name} placeholder="Name der Person" />
		<select id="location" bind:value={sel_personProfession} on:change={() => (answer = '')}>
			{#each personProfessions as personProfession}
				<option value={personProfession}>
					{personProfession}
				</option>
			{/each}
		</select>
		<button on:click={addPerson} type="button"> Hinzufügen </button>
	</div>

	<div>
		<ul>
			{#each persons as person, index}
				<li>{person.name} {person.profession}</li>
			{/each}
		</ul>
	</div>

	<button type="submit"> Geschichte erstellen </button>
</form>

<h3>Geschichten über {sel_hero}</h3>
<p>{@html gpt_story}</p>
{#if gpt_story.length > 10}
	<hr />
{/if}

{#if gpt_answered}
	<h2>Weitere Episoden</h2>
	{#each new_stories as ns}
		{@html ns}
		<hr />
	{/each}
	<button on:click={next_story}
		>Eine weitere Geschichte {#if sel_hero.length > 1}von{/if}
		{sel_hero} erzeugen</button
	>
{/if}
<p>
	{gpt_load}
	{#if showSpinner}<img src={spinner} alt="story is beeing generated" />{/if}
</p>
