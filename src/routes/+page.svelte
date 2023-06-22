<script lang="ts">
	import ResetSvg from '$lib/assets/ResetSVG.svelte';
	import Game from '$lib/components/Game.svelte';
	import TestConfigBar from '$lib/components/TestConfigBar.svelte';
	import {
		theme,
		game,
		count,
		WordCount,
		wordIndex,
		TimerCount,
		resetTest,
		timeDataArr
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
		speed = $timeDataArr.at(-1)?.wpm;
		remaining = $TimerCount;
		remaining -= $count;
	}
</script>

<!-- <h1>Hello World</h1> -->

<section
	class="absolute -translate-y-1/2 big:max-w-6xl right-5 left-5 sm:right-10 sm:left-10 big:mx-auto top-[calc(50%-3%)]"
>
	<div class={`${k} transition`}>
		<TestConfigBar />
	</div>

	<div class={`absolute ${opac} text-xl ${textVar['accent-main']} transition`}>
		<span>{remaining} s</span>
		<span class="mx-5">|</span>
		<span>{speed}</span>
		<span class="mx-5">|</span>
		<span>100%</span>
	</div>

	<!-- Game -->
	<div class="my-10">
		<Game />
	</div>
	<!-- <p
		class={`h-32 mt-5 overflow-hidden text-xl font-base leading-relaxed space text-cardboard-500 game ${textVar.unhighlighted}`}
	>
		I’ve written a few thousand words on why traditional “semantic class names” are the reason CSS
		is hard to maintain, but the truth is you’re never going to believe me until you actually try
		it. If you can suppress the urge to retch long enough to give it a chance, I really think you’ll
		wonder how you ever worked with CSS any other way.
	</p> -->

	<!-- ResetSVG -->
</section>

<style lang="postcss">
	/* .space {
			word-spacing: 0.5rem;
		} */
</style>
