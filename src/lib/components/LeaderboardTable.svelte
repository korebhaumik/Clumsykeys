<script lang="ts">
	import { onMount } from 'svelte';
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

	let heat: HTMLElement;
	let h: number;
	$: console.log(h);
	let innerWidth = 0;
	let innerHeight = 0;

	// $: condition = innerWidth*1.33 <= innerHeight

	$: {
		if (heat) {
            Math.floor((innerHeight - 350) / 40) * 40 + 'px'
			// heat.style.height = innerHeight - 350 + 'px';
			heat.style.height = Math.floor((innerHeight - 350) / 40) * 40 + 'px';
		}
	}
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div class="grid grid-cols-9 gap-1 mt-5 text-dark-forest-unhighlighted">
	<span class="pl-2">#</span>
	<span class="col-span-3">name</span>
	<span>{innerHeight}</span>
	<span>raw</span>
	<span>acc</span>
	<span>std</span>
	<span>date</span>
</div>

<section bind:this={heat} class={`mt-3 overflow-scroll scroll-smooth`}>
	{#each arr as ele, index}
		<row
			bind:offsetHeight={h}
			class={`grid grid-cols-9 text gap-1 py-2 rounded-lg ${
				index % 2 !== 0 ? 'bg-dark-forest-fade' : ''
			}`}
		>
			<span class="pl-2">{index + 1}.</span>
			<span class="col-span-3">{ele.name}</span>
			<span>{ele.wpm}</span>
			<span>{ele.raw}</span>
			<span>{ele.acc}%</span>
			<span>{ele.std}</span>
			<span>{ele.date}</span>
		</row>
	{/each}
</section>

<!-- <table class="table-fixed columns-4">
    <thead>
      <tr>
        <th class="">Song</th>
        <th>Artist</th>
        <th>Year</th>
        <th>Song</th>
        <th>Artist</th>
        <th>Year</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>The Sliding Mr. Bones</td>
        <td>Malcolm Lockyer</td>
        <td>1961</td>
      </tr>
      <tr>
        <td>Witchy Woman</td>
        <td>The Eagles</td>
        <td>1972</td>
      </tr>
      <tr>
        <td>Shining Star</td>
        <td>Earth, Wind, and Fire</td>
        <td>1975</td>
      </tr>
      <tr>
        <td>Shining Star</td>
        <td>Earth, Wind, and Fire</td>
        <td>1975</td>
      </tr>
      <tr>
        <td>Shining Star</td>
        <td>Earth, Wind, and Fire</td>
        <td>1975</td>
      </tr>
      <tr>
        <td>Shining Star</td>
        <td>Earth, Wind, and Fire</td>
        <td>1975</td>
      </tr>
    </tbody>
  </table> -->
