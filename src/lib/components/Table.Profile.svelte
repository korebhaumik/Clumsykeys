<script lang="ts">
	import SparklesSvg from '$lib/assets/SparklesSVG.svelte';
	import cn from '$lib/utils';
	import { onMount } from 'svelte';
	type RecentTest = {
		wpm: number;
		raw: number;
		acc: number;
		std: number;
		chars: [number, number, number];
		mode: string;
		lang: string;
		date: Date;
	};
	export let recentTests: RecentTest[];
	const arr = [
		{
			wpm: 100,
			raw: 103,
			acc: 98,
			std: 3.46,
			chars: '200/3/0',
			mode: 'time 30s',
			language: 'english 1k',
			date: '17:56, 19 Jul'
		},
		{
			wpm: 97,
			raw: 100,
			acc: 96,
			std: 10.56,
			chars: '100/2/5',
			mode: 'time 15s',
			language: 'english',
			date: '05:31, 12 Jun'
		},
		{
			wpm: 85,
			raw: 90,
			acc: 92,
			std: 8.75,
			chars: '90/2/5',
			mode: 'time 30s',
			language: 'english',
			date: '08:45, 15 Jun'
		},
		{
			wpm: 80,
			raw: 90,
			acc: 95,
			std: 9.5,
			chars: '90/2/5',
			mode: 'time 30s',
			language: 'english 5k',
			date: '09:15, 22 Jun'
		}
	];
	// const arr:any = []
	function formatDate(dateISO: Date) {
		// const date = new Date('2023-08-23T07:45:22.337677+00:00');
		const date = new Date(dateISO);
		const time = date.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: 'numeric',
			hour12: false
		});
		const dateStr = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
		return `${time}, ${dateStr}`; // Output: "17:45, Aug 23"
	}
	onMount(() => {
		
	});
</script>

<div
	class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-8 gap-1 mt-3 text-dark-forest-unhighlighted"
>
	<span class="pl-7">wpm</span>
	<span class="hidden col-span-1 sm:inline-block">wpm (raw)</span>
	<span>accuracy</span>
	<span class="hidden col-span-1 md:inline-block">wpm std</span>
	<span class="hidden col-span-1 lg:inline-block">chars</span>
	<span class="hidden col-span-1 md:inline-block">mode</span>
	<span class="hidden col-span-1 md:inline-block">language</span>
	<span>date</span>
</div>

<div class="mt-2">
	{#each recentTests as tuple, index}
		<row
			class={cn(
				'relative grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-8 gap-1 py-2 text-dark-forest-highlighted rounded-lg',
				{
					'bg-dark-forest-fade/80': index % 2 !== 0
				}
			)}
		>
			{#if tuple.wpm > 99}
				<span class="absolute left-0 underline top-2 text-dark-forest-accent-main"
					><SparklesSvg /></span
				>
			{/if}
			<span class="pl-7">{tuple.wpm}</span>
			<span class="hidden col-span-1 sm:inline-block">{tuple.raw}</span>
			<span>{tuple.acc}%</span>
			<span class="hidden col-span-1 md:inline-block">{tuple.std}</span>
			<span class="hidden col-span-1 lg:inline-block"
				>{`${tuple.chars[0]}/${tuple.chars[1]}/${tuple.chars[2]}`}</span
			>
			<span class="hidden col-span-1 md:inline-block">{tuple.mode}</span>
			<span class="hidden col-span-1 md:inline-block">{tuple.lang}</span>
			<span>{formatDate(tuple.date)}</span>
		</row>
	{/each}
</div>
<!-- <div class="mt-2">
	{#each arr as tuple, index}
		<row
			class={cn('relative grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-8 gap-1 py-2 text-dark-forest-highlighted rounded-lg', {
				'bg-dark-forest-fade/80': index % 2 !== 0
			})}
		>
			{#if tuple.wpm > 99}
				<span class="absolute left-0 underline top-2 text-dark-forest-accent-main"
					><SparklesSvg /></span
				>
			{/if}
			<span class="pl-7">{tuple.wpm}</span>
			<span class="hidden col-span-1 sm:inline-block">{tuple.raw}</span>
			<span>{tuple.acc}%</span>
			<span class="hidden col-span-1 md:inline-block">{tuple.std}</span>
			<span class="hidden col-span-1 lg:inline-block">{tuple.chars}</span>
			<span class="hidden col-span-1 md:inline-block">{tuple.mode}</span>
			<span class="hidden col-span-1 md:inline-block">{tuple.language}</span>
			<span>{tuple.date}</span>
		</row>
	{/each}
</div> -->

{#if recentTests.length === 0}
	<row class="grid grid-cols-8 gap-1 mt-2 text-dark-forest-highlighted">
		<span class="pl-7">--</span>
		<span>--</span>
		<span>--</span>
		<span>--</span>
		<span class="col-span-1">--/--/--</span>
		<span>--</span>
		<span>--</span>
		<span>--</span>
	</row>
{/if}
