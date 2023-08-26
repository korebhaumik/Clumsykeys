<script lang="ts">
	import DollarSvg from '$lib/assets/DollarSVG.svelte';
	import { footerEl } from '$lib/components/fun.store';
	import cn from '$lib/utils';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let innerHeight: number;
	onMount(async () => {
		$footerEl.style.position = 'absolute';
	});

	$: {
		if (innerHeight) {
			innerHeight > 700
				? ($footerEl.style.position = 'absolute')
				: ($footerEl.style.position = 'relative');
		}
	}
</script>

<svelte:window bind:innerHeight />
<div
	class={cn(' w-full max-w-6xl flex justify-between font-medium mt-10', {
		'mt-10 mb-20': innerHeight < 700,
		'absolute top-[43%] left-1/2 -translate-x-1/2 -translate-y-1/2': innerHeight > 700
	})}
	in:fade={{ delay: 400, duration: 150 }}
>
	<section class="w-[30rem] relative text-dark-forest-highlighted">
		<h1 class="text-4xl">Your <span class="underline underline-offset-0 decoration-dark-forest-accent-main">feedback</span> is highly valuable to us.</h1>
		<p class="text-white text-opacity-50 text-base mt-3">
			We strive to provide you with the best typing experience and the best platform to improve your
			skills.
		</p>
		<p class="text-white text-opacity-50 text-base mt-3">
			Feel free to post any queries you may have.
		</p>
		<div
			class="w-full absolute bottom-0 px-[25px] py-5 bg-neutral-900 rounded-lg border border-white border-opacity-10 flex-col justify-start items-start gap-2.5 inline-flex"
		>
			<div class="text-white text-base font-medium leading-tight">Help us grow !!</div>
			<div class=" text-white text-opacity-50 text-sm font-medium leading-tight">
				We appreciate your contributions! Your efforts play a significant role in our progress and
				growth.
			</div>
			<button class="px-4 py-2 text-black bg-dark-forest-accent-main rounded inline-flex gap-2">
				<DollarSvg />
				<!-- <div class="w-[18px] h-[18px] relative" /> -->
				<div class="text-zinc-950 text-sm font-bold leading-tight">Contribute</div>
			</button>
		</div>
	</section>

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
