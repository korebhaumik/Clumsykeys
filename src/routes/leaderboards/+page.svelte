<script lang="ts">
	import { fade } from 'svelte/transition';
	import { footerEl } from '$lib/components/fun.store';
	import LeaderboardTable from '$lib/components/Table.Leaderboards.svelte';
	import { onMount } from 'svelte';
	import cn from '$lib/utils';
	import toast, { Toaster } from 'svelte-french-toast';
	import PhoneSVG from '$lib/assets/PhoneSVG.svelte';
	import KeyboardSvg from '$lib/assets/KeyboardSVG.svelte';
	export let data;
	const { supabase, session } = data;

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

	let arr: Leaderboard[] = [];

	function formatDate() {
		arr = arr.map((row) => {
			const date = new Date(row.upserted_at);
			const formattedDate = date.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			});
			row.upserted_at = formattedDate;
			return row;
		});

		// const options = { year: 'numeric', month: 'short', day: 'numeric' };
	}
	async function fetchLeaderboards(tableName: Table) {
		const { data, error } = await supabase.from(tableName).select('*').limit(50);
		if (error) {
			console.error(error);
			return;
		}
		// console.log(data.sort((a, b) => a.wpm - b.wpm));
		arr = data.sort((a, b) => b.wpm - a.wpm);
	}
	const handleToast = () => {
		toast.error('Support for mobile leaderboards\n will be added soon : )', {
			style:
				'font-size: 14px; color: black; background-color: #DADADA; border: 2px solid rgba(169, 84, 6, 1); border-radius: 10px',
			iconTheme: {
				primary: 'rgba(169, 84, 6, 1)',
				secondary: 'white'
			}
		});
	};

	onMount(async () => {
		$footerEl.style.position = 'absolute';
		await fetchLeaderboards('leaderboards');
		formatDate();
	});

	type Table = 'leaderboards' | 'leaderboards_15' | 'leaderboards_60';
	let tableName: Table = 'leaderboards';
</script>

<Toaster />
<div class={`mt-5 px-5 sm:px-0 text-dark-forest-highlighted`} in:fade={{ duration: 100, delay: 400 }}>
	<div class="flex justify-between items-center">
		<div>
			<h1 class="hidden sm:text-base sm:inline-block md:text-lg">All Time English Leaderboards</h1>
			<h1 class="text-base md:text-lg sm:hidden">Leaderboards</h1>
			<h2 class="text-dark-forest-unhighlighted">Auto-updates every 5 mins</h2>
		</div>
		<div class="text-sm flex flex-col items-end">
			<div>
				<button class="bg-dark-forest-accent-main text-black px-2 py-1 rounded">
					<KeyboardSvg />
				</button>

				<button on:click={handleToast} class="bg-dark-forest-fade px-2 py-1 rounded"
					><PhoneSVG /></button
				>
				<!-- <button class="bg-dark-forest-accent-main text-black px-2 py-1 rounded">keyboard</button> -->
				<!-- <button on:click={handleToast} class="bg-dark-forest-fade hidden sm:inline px-2 py-1 rounded">mobile</button> -->
			</div>
			<div class="mt-2">
				<button
					on:click={async () => {
						arr = [];
						tableName = 'leaderboards_15';
						await fetchLeaderboards('leaderboards_15');
						formatDate();
					}}
					class={cn('bg-dark-forest-fade px-2 py-1 rounded', {
						'bg-dark-forest-accent-main transition text-black': tableName === 'leaderboards_15'
					})}>15s</button
				>
				<button
					on:click={async () => {
						arr = [];
						tableName = 'leaderboards';
						await fetchLeaderboards('leaderboards');
						formatDate();
					}}
					class={cn('bg-dark-forest-fade px-2 py-1 rounded', {
						'bg-dark-forest-accent-main transition text-black': tableName === 'leaderboards'
					})}>30s</button
				>
				<button
					on:click={async () => {
						arr = [];
						tableName = 'leaderboards_60';
						await fetchLeaderboards('leaderboards_60');
						formatDate();
					}}
					class={cn('bg-dark-forest-fade px-2 py-1 rounded hidden sm:inline-block', {
						'bg-dark-forest-accent-main transition text-black': tableName === 'leaderboards_60'
					})}>60s</button
				>
			</div>
		</div>
	</div>
	<LeaderboardTable {arr} {session} />
</div>
