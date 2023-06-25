<script lang="ts">
	import { resetTest, setGameState } from '$lib/components/store';
	import { fade } from 'svelte/transition';
	import ResetSvg from '$lib/assets/ResetSVG.svelte';
	import { theme, timeDataArr, game, newTextConfig } from '$lib/components/store';
	import { onMount } from 'svelte';
	import Graph from '$lib/components/Graph.svelte';
	let resetButton: HTMLAnchorElement;
	const textVar = {
		unhighlighted: 'text-dark-forest-unhighlighted',
		highlighted: 'text-dark-forest-highlighted',
		['accent-main']: 'text-dark-forest-accent-main',
		['accent-error']: 'text-dark-forest-accent-error'
	};
	$: {
		if ($theme === 'dark-forest') {
			textVar.unhighlighted = 'text-dark-forest-unhighlighted';
			textVar.highlighted = 'text-dark-forest-highlighted';
			textVar['accent-main'] = 'text-dark-forest-accent-main';
			textVar['accent-error'] = 'text-dark-forest-accent-error';
		}
		if ($theme === 'cardboard') {
			textVar.unhighlighted = 'text-cardboard-unhighlighted';
			textVar.highlighted = 'text-cardboard-highlighted';
			textVar['accent-main'] = 'text-cardboard-accent-main';
			textVar['accent-error'] = 'text-cardboard-accent-error';
		}
	}
	function myfunction(e: any) {
		if (e.key === 'Tab') {
			e.preventDefault();
			console.log('tab');
			resetButton.focus();
			// resetTest();
			// setGameState('waiting');
		}
	}
	onMount(() => {
		document.addEventListener('keydown', myfunction);

		return () => document.removeEventListener('keydown', myfunction);
	});
	$: wpm = $timeDataArr.at(-1)!.wpm;
	const sum = $timeDataArr.reduce((total, ele) => total + ele.raw, 0);
	$: avgRaw = Math.ceil(sum / $timeDataArr.length);
	// $: raw = $timeDataArr.at(-1)!.raw;
</script>

<div class="mt-10 text-dark-forest-unhighlighted justify-between flex w-full">
	<div class="flex flex-col">
		<div class="w-fit">
			<p class="text-2xl">wpm</p>
			<h1 class={`text-5xl mt-1 ${textVar['accent-main']}`}>{wpm}</h1>
		</div>
		<div class="mr-10 mt-2">
			<p class="text-2xl">acc</p>
			<h1 class={`text-5xl mt-1 ${textVar['accent-main']}`}>100%</h1>
		</div>
	</div>
	<div class="w-full">
		<Graph />
	</div>
</div>
<div class="mt-10 text-dark-forest-unhighlighted justify-between flex w-full">
	<div>
		<h1>test type</h1>
		<div class="text-dark-forest-accent-main text-sm">
			<p>time 30</p>
			<p>english 1k</p>
			<p>no punctuations</p>
			<p>no numbers</p>
		</div>
	</div>
	<div>
		<h1>raw</h1>
		<div class="text-dark-forest-accent-main text-sm">
			<p class="text-3xl">{avgRaw}</p>
		</div>
	</div>
	<div>
		<h1>characters</h1>
		<div class="text-dark-forest-accent-main text-sm">
			<p class="text-3xl">200/0/1</p>
		</div>
	</div>
	<div>
		<h1>consistency</h1>
		<div class="text-dark-forest-accent-main text-sm">
			<p class="text-3xl">76%</p>
		</div>
	</div>
	<div>
		<h1>session</h1>
		<div class="text-dark-forest-accent-main text-sm">
			<p class="text-3xl">30 s</p>
		</div>
	</div>
</div>
<!-- {#if $game === 'finished'} -->
<!-- <p class="text-dark-forest-accent-main text-2xl my-16" in:fade={{}}>
		wpm: {wpm}
		<br />
		raw: {raw}
	</p> -->

<!-- svelte-ignore a11y-positive-tabindex -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<a
	class="block mx-auto mt-5 w-fit"
	href="/"
	bind:this={resetButton}
	on:click={() => {
		document.removeEventListener('keydown', myfunction);
		resetTest();
		setGameState('waiting');
	}}
>
	<ResetSvg
		variant={{
			highlighted: `focus:${textVar.highlighted}`,
			unhighlighted: textVar.unhighlighted
		}}
	/>
</a>
<!-- {:else} -->
<!-- <p class={`my-16 text-3xl ${textVar['accent-error']}`}></p> -->
<!-- {/if} -->
