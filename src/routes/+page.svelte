<script lang="ts">
	// import Game from '$lib/components/Game.svelte';
	import Game from '$lib/components/Game.svelte';
	import TestConfigBar from '$lib/components/TestConfigBar.svelte';
	import { page } from '$app/stores';
	import { theme } from '$lib/components/fun.store';

	import {
		game,
		count,
		WordCount,
		wordIndex,
		TimerCount,
		timeDataArr,
		isTimer,
		charCount,
		incorrectCharCount
	} from '$lib/components/game.store';

	const textVar = {
		unhighlighted: 'text-dark-forest-unhighlighted',
		highlighted: 'text-dark-forest-highlighted',
		['accent-main']: 'text-dark-forest-accent-main'
	};
	let k = 'opacity-100';
	let opac = 'opacity-0';
	let gameOpac = 'opacity-100';
	let speed: number | undefined = 0;
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
			gameOpac = 'opacity-100';
		}
		if ($game === 'playing') {
			k = 'opacity-0';
			opac = 'opacity-100';
		}
		if ($game != 'playing') {
			k = 'opacity-100';
			opac = 'opacity-0';
		}
		if ($game === 'finished') {
			gameOpac = 'opacity-0';
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
	
	$: {
		if ($timeDataArr.length > 1) speed = $timeDataArr.at(-2)?.wpm;
		remaining = $TimerCount;
		remaining -= $count;
		// console.log($isTimer);
	}
	$: accuracy =
		$charCount === 0 ? 100 : Math.floor((($charCount - $incorrectCharCount) * 100) / $charCount);
</script>

<!-- <h1>Hello World</h1> -->
{#if $page.url.pathname == '/'}
	<section
		class={`absolute -translate-y-1/2 big:max-w-6xl right-5 left-5 sm:right-10 sm:left-10 big:mx-auto top-[calc(50%-3%)] ${gameOpac} transition`}
	>
		<!-- Test Details Configuration Bar -->
		<div class={`${k} transition`}>
			<TestConfigBar />
		</div>

		<!-- Move this to the game section -->
		<div class={`absolute ${opac} text-xl ${textVar['accent-main']} mb-96 transition`}>
			{#if $isTimer}
				<span>{remaining} s</span>
			{:else}
				<span>{$wordIndex + 1}/{$WordCount}</span>
			{/if}
			<span class="mx-5">|</span>
			<span class="w-10">{speed} wpm</span>
			<span class="mx-5">|</span>
			<span class="w-10">{accuracy}%</span>
		</div>

		<!-- Game -->
		<div class="my-10">
			<Game />
		</div>
	</section>
{/if}
