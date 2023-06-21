<script lang="ts">
	import img from '$lib/assets/404_monkey.webp';
	import { fade } from 'svelte/transition';
	import { browser } from '$app/environment';
	import { theme } from '$lib/components/store';
	import { goto } from '$app/navigation';
	let k = '';
	// $: {
	// 	if ($theme === 'cardboard') {
	// 		k = 'bg-cardboard-primary';
	// 		if (browser) document.body.style.backgroundColor = '#EDEBE3';
	// 	}

	// 	if ($theme === 'dark-forest') {
	// 		k = 'bg-dark-forest-primary';
	// 		if (browser) document.body.style.backgroundColor = 'black';
	// 	}
	// 	console.log(k);
	// }

</script>

<div class="flex" in:fade={{ duration: 100 }}>
	<img src={img} alt="monkey-sad" class="h-72" />
	<!-- {#if img} -->
		<section>
			<p class="font-bold">404</p>
			<h1 class="mt-2 text-2xl text-cardboard-accent-error">Page not found</h1>
			<p class="mt-2 text-cardboard-500">Sorry, we couldn't find the page you were looking for.</p>
			<div class="flex">
				<button
					on:click={() => goto('/')}
					class="block px-4 py-3 mt-2 font-medium text-sm rounded w-fit text-cardboard-100 bg-cardboard-900"
					>Go back home</button
				>
				<a
					href="/"
					class="block ml-2 px-4 py-3 mt-2 font-medium text-sm rounded w-fit border border-cardboard-900 text-cardboard-900"
					>Contact support</a
				>
			</div>
		</section>
	<!-- {/if} -->
</div>

<style>
	section {
		position: absolute;
		top: 47%;
		left: 43%;
		/* transform: translate(65%, -50%); */
		transform: translate(-50%, -50%);
		/* transform: translate(-50%, -50%); */
	}
	img {
		position: absolute;
		top: 47%;
		left: 12%;
		transform: translate(-50%, -50%);
		/* transform: translate(-50%, -50%); */
	}
</style>
