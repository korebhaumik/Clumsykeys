<script lang="ts">
	import Game from '$lib/components/Game.svelte';
	import TestConfigBar from '$lib/components/TestConfigBar.svelte';
	import {
		theme,
		game,
		count,
		WordCount,
		wordIndex,
		TimerCount,
		timeDataArr,
		isTimer
	} from '$lib/components/store';

	const textVar = {
		unhighlighted: 'text-cardboard-unhighlighted',
		highlighted: 'text-cardboard-highlighted',
		['accent-main']: 'text-cardboard-accent-main'
	};
	let k = 'opacity-100';
	let opac = 'opacity-0';
	$: {
		if ($theme === 'dark-forest') {
			textVar.highlighted = 'text-dark-forest-highlighted';
			textVar.unhighlighted = 'text-dark-forest-unhighlighted';
			textVar['accent-main'] = 'text-dark-forest-accent-main';
		}
		if ($theme === 'cardboard') {
			textVar.highlighted = 'text-cardboard-highlighted';
			textVar.unhighlighted = 'text-cardboard-unhighlighted ';
			textVar['accent-main'] = 'text-cardboard-accent-main';
		}
		if ($game === 'waiting') {
			k = 'opacity-100';
		}
		if ($game === 'playing') {
			k = 'opacity-0';
			opac = 'opacity-100';
		}
		if ($game != 'playing') {
			k = 'opacity-100';
			opac = 'opacity-0';
		}
	}
	let remaining = -1;
	$: {
		if ($game === 'waiting') {
			speed = 0;
			k = 'opacity-100';
		}
		if ($game === 'playing') {
			k = 'opacity-0';
			opac = 'opacity-100';
		}
		if ($game != 'playing') {
			k = 'opacity-100';
			opac = 'opacity-0';
		}
	}
	let speed: number | undefined = 0;
	$: {
		if ($timeDataArr.length > 1) speed = $timeDataArr.at(-2)?.wpm;
		remaining = $TimerCount;
		remaining -= $count;
		console.log($isTimer);
	}
</script>

<!-- <h1>Hello World</h1> -->
{#if $game != 'finished'}
	<section
		class="absolute -translate-y-1/2 big:max-w-6xl right-5 left-5 sm:right-10 sm:left-10 big:mx-auto top-[calc(50%-3%)]"
	>
		<!-- Test Details Configuration Bar -->
		<div class={`${k}`}>
			<TestConfigBar />
		</div>

		<!-- Move this to the game section -->
		<div class={`absolute ${opac} text-xl ${textVar['accent-main']} transition`}>
			{#if $isTimer}
				<span>{remaining} s</span>
			{:else}
				<span>{$wordIndex + 1}/{$WordCount}</span>
			{/if}
			<span class="mx-5">|</span>
			<span>{speed} wpm</span>
			<span class="mx-5">|</span>
			<span>100%</span>
		</div>

		<!-- Game -->
		<div class="my-10">
			<Game />
		</div>

	</section>
{/if}

