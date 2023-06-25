<script lang="ts">
	import img from '$lib/assets/404_monkey.webp';
	import { fade } from 'svelte/transition';
	import { browser } from '$app/environment';
	import { theme } from '$lib/components/store';
	import { goto } from '$app/navigation';

	const textVar = {
		highlighted: 'text-dark-forest-highlighted',
		['accent-main']: 'text-dark-forest-accent-main',
		unhighlighted: 'text-dark-forest-unhighlighted',
		['accent-error']: 'text-dark-forest-accent-error'
	};

	const bgVar = {
		['accent-error']: 'bg-dark-forest-accent-error'
	};

	$: {
		if ($theme === 'cardboard') {
			textVar['accent-error'] = 'text-cardboard-accent-error';
			textVar.highlighted = 'text-cardboard-highlighted';
			textVar.unhighlighted = 'text-cardboard-unhighlighted';
			textVar['accent-main'] = 'text-cardboard-accent-main';
			bgVar['accent-error'] = 'bg-cardboard-accent-error';

			// if (browser) document.body.style.backgroundColor = '#EDEBE3';
		}

		if ($theme === 'dark-forest') {
			textVar['accent-error'] = 'text-dark-forest-accent-error';
			textVar.highlighted = 'text-dark-forest-highlighted';
			textVar.unhighlighted = 'text-dark-forest-unhighlighted';
			textVar['accent-main'] = 'text-dark-forest-accent-main';
			bgVar['accent-error'] = 'bg-dark-forest-accent-error';
			// if (browser) document.body.style.backgroundColor = 'black';
		}
		// console.log(k);
	}
</script>

<div class={`absolute flex  w-full items-center -translate-y-1/2 big:max-w-6xl right-5 left-5 sm:right-10 sm:left-10 big:mx-auto top-[calc(50%-3%)]`} in:fade={{ duration: 100, delay: 400 }}>
	<img src={img} alt="monkey-sad" class="h-72 aspect-[9/10] w-fit block" />
	<!-- {#if img} -->
	<div class="text-dark-forest-highlighted ml-10">
		<p class="font-bold">404</p>
		<h1 class={`${textVar['accent-error']} mt-2 text-2xl`}>Page not found</h1>
		<p class={`mt-2 ${textVar.highlighted}`}>
			Sorry Boss, leaderboards are not available yet.
		</p>
		<div class="flex">
			<a
				href="/"
				class={`block px-4 py-3 mt-2 font-medium text-sm rounded w-fit ${bgVar['accent-error']} ${textVar.highlighted}`}
				>Go back home</a
					
			>
			<a
				href="/"
				class="block ml-2 px-4 py-3 mt-2 font-medium text-sm rounded w-fit border"
				>Contact support</a
			>
		</div>
	</div>
	<!-- {/if} -->
</div>
