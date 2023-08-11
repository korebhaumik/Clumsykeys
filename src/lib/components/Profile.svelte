<script lang="ts">
	import UserFilledSvg from '$lib/assets/UserFilledSVG.svelte';
	import { contentHeight, footerEl } from '$lib/components/store';
	import { onMount } from 'svelte';
	let offsetHeight = 0;
	let innerHeight = 0;

	const handleDynamicFooter = () => {
		!($contentHeight > innerHeight - 60 - 200)
			? ($footerEl.style.position = 'absolute')
			: ($footerEl.style.position = 'relative');
	};

	onMount(() => {
		contentHeight.set(offsetHeight);
		handleDynamicFooter();
		window.addEventListener('resize', handleDynamicFooter, true);
		() => window.removeEventListener('resize', handleDynamicFooter, true);
	});
</script>

<svelte:window bind:innerHeight />
<main class="mt-12 mb-20 text-dark-forest-highlighted" bind:offsetHeight>
	<section class="relative flex px-5 py-5 rounded-lg bg-dark-forest-fade/80">
		<aside>
			<div class="flex items-center">
				<UserFilledSvg />
				<div class="flex flex-col ml-3">
					<p class="text-lg">korebhaumik</p>
					<span class="text-xs text-dark-forest-unhighlighted">joined 31 Oct, 2023</span>
				</div>
			</div>
			<div class="mt-3 text-sm">
				<h1>All Time English Leaderboards</h1>
				<div class="flex flex-wrap w-[22rem] mt-2 justify-between">
					<span
						class="px-3 py-1 font-bold rounded-lg bg-dark-forest-accent-main/90 text-dark-forest-fade"
						>11th : 15 sec
					</span>
					<span
						class="px-3 py-1 font-bold rounded-lg bg-dark-forest-accent-main/90 text-dark-forest-fade"
						>7th : 30 sec
					</span>
					<span
						class="px-3 py-1 font-bold rounded-lg bg-dark-forest-accent-main/90 text-dark-forest-fade"
						>3rd : 60 sec
					</span>
				</div>
			</div>
		</aside>
		<hr class="w-1 h-32 mx-10 border-none rounded-full bg-dark-forest-unhighlighted" />
		<aside class="flex flex-wrap text-dark-forest-accent-main">
			<div class="flex flex-col">
				<span class="text-dark-forest-unhighlighted">tests started</span>
				<span class="text-2xl">248623</span>
			</div>
			<div class="flex flex-col ml-16">
				<span class="text-dark-forest-unhighlighted">average wpm</span>
				<span class="text-2xl">103</span>
			</div>
			<div class="flex flex-col ml-16">
				<span class="text-dark-forest-unhighlighted">time typing</span>
				<span class="text-2xl">24:86:17</span>
			</div>
			<div class="flex flex-col ml-16">
				<span class="text-dark-forest-unhighlighted">average accuracy</span>
				<span class="text-2xl">97%</span>
			</div>
			<div class="flex flex-col">
				<span class="text-dark-forest-unhighlighted">tests completed</span>
				<span class="text-2xl">2486</span>
			</div>
			<div class="flex flex-col ml-9">
				<span class="text-dark-forest-unhighlighted">average raw (wpm)</span>
				<span class="text-2xl">103</span>
			</div>
			<div class="flex flex-col ml-5">
				<span class="text-dark-forest-unhighlighted">average std</span>
				<span class="text-2xl">10.87</span>
			</div>
		</aside>
	</section>
	<h1 class="mt-5">Personal Best</h1>
	<section class="flex mt-5 text-dark-forest-highlighted">
		<aside
			class="relative flex px-5 py-5 w-[30rem] justify-between rounded-lg bg-dark-forest-fade/80"
		>
			<div class="flex flex-col">
				<span class="text-sm text-dark-forest-unhighlighted">15 seconds</span>
				<span class="text-2xl my-0.5">100 wpm</span>
				<span class="text-base text-dark-forest-accent-error">99 %</span>
			</div>
			<div class="flex flex-col">
				<span class="text-sm text-dark-forest-unhighlighted">30 seconds</span>
				<span class="text-2xl my-0.5">100 wpm</span>
				<span class="text-base text-dark-forest-accent-error">99 %</span>
			</div>
			<div class="flex flex-col">
				<span class="text-sm text-dark-forest-unhighlighted">60 seconds</span>
				<span class="text-2xl my-0.5">100 wpm</span>
				<span class="text-base text-dark-forest-accent-error">99 %</span>
			</div>
		</aside>
		<aside
			class=" ml-10 relative flex px-5 py-5 w-[30rem] justify-between rounded-lg bg-dark-forest-fade/80"
		>
			<div class="flex flex-col">
				<span class="text-sm text-dark-forest-unhighlighted">25 words</span>
				<span class="text-2xl my-0.5">100 wpm</span>
				<span class="text-base text-dark-forest-accent-error">99 %</span>
			</div>
			<div class="flex flex-col">
				<span class="text-sm text-dark-forest-unhighlighted">50 words</span>
				<span class="text-2xl my-0.5">100 wpm</span>
				<span class="text-base text-dark-forest-accent-error">99 %</span>
			</div>
			<div class="flex flex-col">
				<span class="text-sm text-dark-forest-unhighlighted">100 words</span>
				<span class="text-2xl my-0.5">100 wpm</span>
				<span class="text-base text-dark-forest-accent-error">99 %</span>
			</div>
		</aside>
	</section>
	<h1 class="mt-5">Recent Tests</h1>
	<p class="mt-3 text-dark-forest-unhighlighted">This feature is in development</p>
</main>
