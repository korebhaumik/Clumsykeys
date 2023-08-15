<script lang="ts">
	const arr = [
		{
			name: 'Bhaumik Kore',
			wpm: 100.23,
			raw: 101.57,
			acc: 99,
			std: 2.37,
			date: '15 Jul, 23'
		},
		{
			name: 'korebhaumik',
			wpm: 100.23,
			raw: 101.57,
			acc: 99,
			std: 2.37,
			date: '15 Jul, 23'
		},
		{
			name: 'patawar',
			wpm: 100.23,
			raw: 101.57,
			acc: 99,
			std: 2.37,
			date: '15 Jul, 23'
		},
		{
			name: 'mehdi',
			wpm: 100.23,
			raw: 101.57,
			acc: 99,
			std: 2.37,
			date: '15 Jul, 23'
		},
		{
			name: 'korebhaumik',
			wpm: 100.23,
			raw: 101.57,
			acc: 99,
			std: 2.37,
			date: '15 Jul, 23'
		},
		{
			name: 'korebhaumik',
			wpm: 100.23,
			raw: 101.57,
			acc: 99,
			std: 2.37,
			date: '15 Jul, 23'
		},
		{
			name: 'korebhaumik',
			wpm: 100.23,
			raw: 101.57,
			acc: 99,
			std: 2.378767,
			date: '15 Jul, 23'
		},
		{
			name: 'korebhaumik',
			wpm: 100.23,
			raw: 101.57,
			acc: 99,
			std: 2.378767,
			date: '15 Jul, 23'
		},
		{
			name: 'korebhaumik',
			wpm: 100.23,
			raw: 101.57,
			acc: 99,
			std: 2.378767,
			date: '15 Jul, 23'
		},
		{
			name: 'korebhaumik',
			wpm: 100.23,
			raw: 101.57,
			acc: 99,
			std: 2.378767,
			date: '15 Jul, 23'
		},
		{
			name: 'korebhaumik',
			wpm: 100.23,
			raw: 101.57,
			acc: 99,
			std: 2.378767,
			date: '15 Jul, 23'
		}
	];

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

<div class="grid grid-cols-5 gap-1 mt-5 sm:grid-cols-6 md:grid-cols-9 text-dark-forest-unhighlighted">
	<span class="pl-2">#</span>
	<span class="col-span-2  sm:col-span-3">name</span>
	<span>wpm</span>
	<span class="hidden md:inline-block">raw</span>
	<span class="hidden md:inline-block">acc</span>
	<span class="hidden md:inline-block">std</span>
	<span>date</span>
</div>

<section bind:this={tableContainer} class={`mt-3 overflow-scroll scroll-smooth`}>
	{#each arr as ele, index}
		<row
			bind:offsetHeight={h}
			class={`grid grid-cols-5 sm:grid-cols-6 md:grid-cols-9 text gap-1 py-2 rounded-lg ${
				index % 2 !== 0 ? 'bg-dark-forest-fade' : ''
			}`}
		>
			<span class="pl-2">{index + 1}.</span>
			<span class="col-span-2 sm:col-span-3">{ele.name}</span>
			<span>{ele.wpm}</span>
			<span class="hidden md:inline-block">{ele.raw}</span>
			<span class="hidden md:inline-block">{ele.acc}%</span>
			<span class="hidden md:inline-block">{ele.std}</span>
			<span>{ele.date}</span>
		</row>
	{/each}
</section>
