<script lang="ts">
	import DollarSvg from '$lib/assets/DollarSVG.svelte';
	import { footerEl } from '$lib/components/fun.store';
	import cn from '$lib/utils';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let innerHeight: number;
	let innerWidth: number;
	onMount(async () => {
		$footerEl.style.position = 'absolute';
	});

	$: {
		if (innerHeight) {
			innerHeight > 700 && innerWidth > 1000
				? ($footerEl.style.position = 'absolute')
				: ($footerEl.style.position = 'relative');
		}
	}
</script>

<svelte:window bind:innerHeight bind:innerWidth />
<div in:fade={{ delay: 400, duration: 150 }}>
	<section class="w-[29rem] text-dark-forest-unhighlighted">
		<div>
			<h1>Topic</h1>
			<input
				type="text"
				placeholder="Select a topic"
				class="w-full px-4 py-3 mt-1 text-sm border outline-none text-dark-forest-highlighted rounded bg-inherit border-dark-forest-unhighlighted"
			/>
		</div>
		<div class="mt-5">
			<h1>Name</h1>
			<input
				type="text"
				placeholder="johndoe"
				class="w-full px-4 py-3 mt-1 text-sm border outline-none text-dark-forest-highlighted rounded bg-inherit border-dark-forest-unhighlighted"
			/>
		</div>
		<div class="mt-5">
			<h1>Email</h1>
			<input
				type="email"
				placeholder="name@provider.com"
				class="w-full px-4 py-3 mt-1 text-sm border outline-none text-dark-forest-highlighted rounded bg-inherit border-dark-forest-unhighlighted"
			/>
		</div>
		<div class="mt-5">
			<h1>Message</h1>
			<textarea
				placeholder="Type your message..."
				class="w-full max-h-16 min-h-[4rem] px-4 py-3 mt-1 text-sm border outline-none text-dark-forest-highlighted rounded bg-inherit border-dark-forest-unhighlighted"
			/>
		</div>
		<button
			class={`w-full py-3 mt-3 font-bold text-sm rounded bg-dark-forest-highlighted text-black `}
			>Submit message</button
		>
	</section>
</div>

<!-- class={cn(' px-5 big:px-0 w-full max-w-6xl flex flex-wrap justify-between  font-medium mt-10', {
    'mt-10 mb-20': innerHeight < 700 || innerWidth < 1000,
    'absolute top-[43%] left-1/2 -translate-x-1/2 -translate-y-1/2': innerHeight > 700 && innerWidth > 1000,
})} -->
