<script lang="ts">
	import { resetTest, setGameState } from '$lib/components/store';
	import { fade } from 'svelte/transition';
	import ResetSvg from '$lib/assets/ResetSVG.svelte';
	import { theme, timeDataArr } from '$lib/components/store';
	import { onMount } from 'svelte';
	let resetButton: HTMLAnchorElement;
	const textVar = {
		unhighlighted: 'text-cardboard-unhighlighted',
		highlighted: 'text-cardboard-highlighted',
		['accent-main']: 'text-cardboard-accent-main'
	};
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
		variant={{ highlighted: `focus:${textVar.highlighted}`, unhighlighted: textVar.unhighlighted }}
	/>
</a>
