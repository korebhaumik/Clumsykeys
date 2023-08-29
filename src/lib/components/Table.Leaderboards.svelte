<script lang="ts">
	import type { Session } from '@supabase/supabase-js';
	import cn from '$lib/utils';

	// const arr = [
	// 	{
	// 		name: 'Bhaumik Kore',
	// 		wpm: 100.23,
	// 		raw: 101.57,
	// 		acc: 99,
	// 		std: 2.37,
	// 		date: '15 Jul, 23'
	// 	},
	// 	{
	// 		name: 'korebhaumik',
	// 		wpm: 100.23,
	// 		raw: 101.57,
	// 		acc: 99,
	// 		std: 2.37,
	// 		date: '15 Jul, 23'
	// 	},
	// 	{
	// 		name: 'patawar',
	// 		wpm: 100.23,
	// 		raw: 101.57,
	// 		acc: 99,
	// 		std: 2.37,
	// 		date: '15 Jul, 23'
	// 	},
	// 	{
	// 		name: 'mehdi',
	// 		wpm: 100.23,
	// 		raw: 101.57,
	// 		acc: 99,
	// 		std: 2.37,
	// 		date: '15 Jul, 23'
	// 	},
	// 	{
	// 		name: 'korebhaumik',
	// 		wpm: 100.23,
	// 		raw: 101.57,
	// 		acc: 99,
	// 		std: 2.37,
	// 		date: '15 Jul, 23'
	// 	},
	// 	{
	// 		name: 'korebhaumik',
	// 		wpm: 100.23,
	// 		raw: 101.57,
	// 		acc: 99,
	// 		std: 2.37,
	// 		date: '15 Jul, 23'
	// 	},
	// 	{
	// 		name: 'korebhaumik',
	// 		wpm: 100.23,
	// 		raw: 101.57,
	// 		acc: 99,
	// 		std: 2.378767,
	// 		date: '15 Jul, 23'
	// 	},
	// 	{
	// 		name: 'korebhaumik',
	// 		wpm: 100.23,
	// 		raw: 101.57,
	// 		acc: 99,
	// 		std: 2.378767,
	// 		date: '15 Jul, 23'
	// 	},
	// 	{
	// 		name: 'korebhaumik',
	// 		wpm: 100.23,
	// 		raw: 101.57,
	// 		acc: 99,
	// 		std: 2.378767,
	// 		date: '15 Jul, 23'
	// 	},
	// 	{
	// 		name: 'korebhaumik',
	// 		wpm: 100.23,
	// 		raw: 101.57,
	// 		acc: 99,
	// 		std: 2.378767,
	// 		date: '15 Jul, 23'
	// 	},
	// 	{
	// 		name: 'korebhaumik',
	// 		wpm: 100.23,
	// 		raw: 101.57,
	// 		acc: 99,
	// 		std: 2.378767,
	// 		date: '15 Jul, 23'
	// 	}
	// ];
	export let session: Session | null;
	type Leaderboard = {
		acc: number;
		upserted_at: string;
		email: string;
		id: string;
		raw: number;
		std: number;
		username: string;
		wpm: number;
	};
	export let arr: Leaderboard[] = [];
	let tableContainer: HTMLElement;
	let h: number;
	let innerWidth = 0;
	let innerHeight = 0;

	$: {
		if (tableContainer) {
			tableContainer.style.height = Math.floor((innerHeight - 350) / 40) * 40 + 'px';
		}
	}
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div
	class="grid grid-cols-4 gap-1 mt-5 sm:grid-cols-6 md:grid-cols-9 text-dark-forest-unhighlighted"
>
	<span class="pl-2">#</span>
	<span class="col-span-2 sm:col-span-3">name</span>
	<span class="ml-10 sm:ml-0">wpm</span>
	<span class="hidden md:inline-block">raw</span>
	<span class="hidden md:inline-block">acc</span>
	<span class="hidden md:inline-block">std</span>
	<span class="hidden md:inline-block">date</span>
</div>

<section bind:this={tableContainer} class={`mt-3 overflow-scroll scroll-smooth`}>
	{#each arr as ele, index}
		<row
			bind:offsetHeight={h}
			class={cn(`grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 text gap-1 py-2 rounded-lg`, {
				'bg-dark-forest-fade': index % 2 !== 0,
				'outline -outline-offset-2 outline-dark-forest-caret/60': session && session.user.email === ele.email,
				// 'outline -outline-offset-2 outline-dark-forest-accent-main/60': session && session.user.email === ele.email,
			})}
		>
			<span class="pl-2">{index + 1}.</span>
			<span class="col-span-2 sm:col-span-3">{ele.username}</span>
			<span class="ml-10 sm:ml-0">{ele.wpm}</span>
			<span class="hidden md:inline-block">{ele.raw}</span>
			<span class="hidden md:inline-block">{ele.acc}%</span>
			<span class="hidden md:inline-block">{ele.std}</span>
			<span class="hidden md:inline-block">{ele.upserted_at}</span>
		</row>
	{/each}
	{#if arr.length === 0}
		<row
			bind:offsetHeight={h}
			class={`grid grid-cols-5 sm:grid-cols-6 md:grid-cols-9 text gap-1 py-2 rounded-lg ${
				4 % 2 !== 0 ? 'bg-dark-forest-fade' : ''
			}`}
		>
			<span class="text-dark-forest-unhighlighted">loading...</span>
		</row>
	{/if}
</section>

<!-- class={`grid grid-cols-5 sm:grid-cols-6 md:grid-cols-9 text gap-1 py-2 rounded-lg ${
	index % 2 !== 0 ? 'bg-dark-forest-fade' : ''
}`} -->
