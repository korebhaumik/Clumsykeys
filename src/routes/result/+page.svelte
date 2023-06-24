<script lang="ts">
	import { resetTest, setGameState } from '$lib/components/store';
	import { fade } from 'svelte/transition';
	import ResetSvg from '$lib/assets/ResetSVG.svelte';
	import { theme, timeDataArr, game } from '$lib/components/store';
	import { onMount } from 'svelte';
	let resetButton: HTMLAnchorElement;
	const textVar = {
		unhighlighted: 'text-dark-forest-unhighlighted',
		highlighted: 'text-dark-forest-highlighted',
		['accent-main']: 'text-dark-forest-accent-main',
		['accent-error'] : 'text-dark-forest-accent-error'
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
</script>

{#if $game === 'finished'}
	<p class="text-dark-forest-accent-main text-2xl my-16" in:fade={{}}>
		wpm: {wpm}
		<br />
		raw: {wpm + Math.floor(Math.random() * 10)}
	</p>

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
{:else}
	<p class={`my-16 text-3xl ${textVar['accent-error']}`}>Protected Route</p>
{/if}
