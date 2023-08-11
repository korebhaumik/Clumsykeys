<script lang="ts">
	import { contentHeight, footerEl, resetTest, setGameState } from '$lib/components/store';
	import ResetSvg from '$lib/assets/ResetSVG.svelte';
	import {
		theme,
		timeDataArr,
		game,
		newTextConfig,
		wordsArr,
		GlobalWordsDataArr,
		incorrectCharCount,
		charCount,
		testStatus
	} from '$lib/components/store';
	import { onMount } from 'svelte';
	import Graph from '$lib/components/Graph.svelte';
	import { goto } from '$app/navigation';
	import ClipboardSvg from '$lib/assets/ClipboardSVG.svelte';
	import FireSvg from '$lib/assets/FireSVG.svelte';

	let resetButton: HTMLAnchorElement;
	const textVar = {
		unhighlighted: 'text-dark-forest-unhighlighted',
		highlighted: 'text-dark-forest-highlighted',
		['accent-main']: 'text-dark-forest-accent-main',
		['accent-error']: 'text-dark-forest-accent-error'
	};
	const bgVar = {
		'accent-error': 'bg-dark-forest-accent-error'
	};
	$: {
		if ($theme === 'dark-forest') {
			textVar.unhighlighted = 'text-dark-forest-unhighlighted';
			textVar.highlighted = 'text-dark-forest-highlighted';
			textVar['accent-main'] = 'text-dark-forest-accent-main';
			textVar['accent-error'] = 'text-dark-forest-accent-error';
		}
		if ($theme === 'cardboard') {
			textVar.unhighlighted = 'text-cardboard-unhighlighted';
			textVar.highlighted = 'text-cardboard-highlighted';
			textVar['accent-main'] = 'text-cardboard-accent-main';
			textVar['accent-error'] = 'text-cardboard-accent-error';
		}
	}
	function myfunction(e: any) {
		if (e.key === 'Tab') {
			e.preventDefault();
			// console.log('tab');
			resetButton.focus();
			// resetTest();
			// setGameState('waiting');
		}
	}
	onMount(() => {
		document.addEventListener('keydown', myfunction);
		setGameState('waiting');

		return () => document.removeEventListener('keydown', myfunction);
	});
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
	timeDataArr.update((arr) => {
		// console.log($newTextConfig.time.value)
		return arr.filter((ele) => {
			// console.log(ele.time)
			if ($newTextConfig.time.isHighlighted) return ele.time <= $newTextConfig.time.value;
			else return true;
		});
	});
	$: wpm = $timeDataArr.at(-1)!.wpm;
	const sum = $timeDataArr.reduce((total, ele) => total + ele.raw, 0);
	$: avgRaw = Math.ceil(sum / $timeDataArr.length);

	$: inputHistory = $GlobalWordsDataArr.map((ele, index) => {
		if (ele < 30)
			return { word: $wordsArr[index], wpm: ele, style: 'text-dark-forest-accent-error' };
		if (ele < 60) return { word: $wordsArr[index], wpm: ele, style: 'text-[#DBA9A1]' };
		if (ele < 90) return { word: $wordsArr[index], wpm: ele, style: 'text-white' };
		if (ele < 120) return { word: $wordsArr[index], wpm: ele, style: 'text-[#CFE4C6]' };
		return { word: $wordsArr[index], wpm: ele, style: 'text-dark-forest-accent-main' };
	});

	let wpmArr = $timeDataArr.map((x) => {
		return x.wpm;
	});

	const mean = wpmArr.reduce((acc, val) => acc + val, 0) / wpmArr.length;
	const variance =
		wpmArr.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (wpmArr.length - 1);
	const standardDeviation = Math.sqrt(variance).toFixed(2);

	// console.log(standardDeviation); // Output: 1.5811388300841898
	// $: raw = $timeDataArr.at(-1)!.raw;
	const accuracy = Math.floor((($charCount - $incorrectCharCount) * 100) / $charCount);
</script>

<svelte:window bind:innerHeight />
{#if $testStatus === 'valid'}
	<div bind:offsetHeight>
		<div class={`mt-10 ${textVar.unhighlighted} justify-between sm:flex w-full`}>
			<div class="flex items-center sm:flex-col sm:items-start">
				<div class="w-fit">
					<p class="text-2xl">wpm</p>
					<h1 class={`text-5xl mt-1 ${textVar['accent-main']}`}>{wpm}</h1>
				</div>
				<div class="ml-10 sm:ml-0 sm:mt-2 mr-10">
					<p class="text-2xl">acc</p>
					<h1 class={`text-5xl mt-1 ${textVar['accent-main']}`}>
						{accuracy}%
					</h1>
				</div>
			</div>
			<div class="w-full mt-10 sm:mt-0">
				<Graph />
			</div>
		</div>
		<div class={`mt-10 justify-between flex flex-wrap w-full ${textVar.unhighlighted}`}>
			<div>
				<h1>test type</h1>
				<div class={`${textVar['accent-main']} mt-2  text-base font-semibold`}>
					{#if $newTextConfig.time.isHighlighted}
						<p>time {$newTextConfig.time.value}</p>
					{:else if $newTextConfig.words.isHighlighted}
						<p>words {$newTextConfig.words.value}</p>
					{:else}
						<p>random quotes</p>
					{/if}
					<p>{$newTextConfig.language.value}</p>
					<p>{$newTextConfig.punctuations ? 'punctuations' : 'no punctuations'}</p>
					<p>{$newTextConfig.numbers ? 'numbers' : 'no numbers'}</p>
				</div>
			</div>
			<div>
				<h1>raw</h1>
				<div class={`${textVar['accent-main']} mt-2  text-sm`}>
					<p class="text-3xl">{avgRaw}</p>
				</div>
			</div>
			<div>
				<h1>characters</h1>
				<div class={`${textVar['accent-main']} mt-2  text-sm`}>
					<!-- <p class="text-3xl">{inputHistory.length * 4}/0/0</p> -->
					<p class="text-3xl">{$charCount}/{$incorrectCharCount}/0</p>
				</div>
			</div>
			<div>
				<h1>wpm standard deviation</h1>
				<div class={`${textVar['accent-main']} mt-2 text-sm`}>
					<p class="text-3xl">{standardDeviation}</p>
				</div>
			</div>
			<div>
				<h1>session</h1>
				<div class={`${textVar['accent-main']} mt-2  text-sm`}>
					<p class="text-3xl">{$timeDataArr.at(-1)?.time} s</p>
				</div>
			</div>
		</div>

		<!-- svelte-ignore a11y-positive-tabindex -->
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<a
			class={`z-50 block mx-auto my-5 w-fit text-dark-forest-unhighlighted outline-none border-none `}
			type="button"
			href="/"
			bind:this={resetButton}
			on:click={async (e) => {
				// console.log('click')
				// testStatus.set('protected');
				e.preventDefault();
				resetTest();
				document.removeEventListener('keydown', myfunction);
				setGameState('waiting');
				await goto('/');
			}}
			on:focus={() => {
				resetButton.style.color = 'white';
				resetButton.style.backgroundColor = '#242A2D';
				resetButton.style.borderRadius = '0.375rem';
			}}
			on:blur={() => {
				resetButton.style.color = 'gray';
				resetButton.style.backgroundColor = 'inherit';
				resetButton.style.borderRadius = '0';
			}}
		>
			<ResetSvg
				variant={{
					highlighted: ``,
					unhighlighted: ''
				}}
			/>
		</a>

		<div class="flex items-center text-dark-forest-unhighlighted">
			<h1 class="text-white">input history</h1>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<button
				on:click={() => {
					navigator.clipboard.writeText($wordsArr.join(' '));
				}}
			>
				<ClipboardSvg variant="w-5 h-5 ml-2" />
			</button>
			<FireSvg variant="w-5 h-5 ml-2" />
			<div class="flex text-xs leading-none text-black font-semibold rounded-lg ml-2">
				<span class="px-2 py-1 pt-1.5 rounded-l bg-dark-forest-accent-error">0-30</span>
				<span class={`px-2 py-1 pt-1.5 bg-[#DBA9A1]`}>30-60</span>
				<span class="px-2 py-1 pt-1.5 bg-white">60-90</span>
				<span class="px-2 py-1 pt-1.5 bg-[#CFE4C6]">90-120</span>
				<span class="px-2 py-1 pt-1.5 rounded-r bg-dark-forest-accent-main">120+</span>
			</div>
		</div>
		<!-- <div class={`text-white mt-2`}>
		{#each $wordsArr.slice(0, $GlobalWordsDataArr.length) as word}
			<span class={`mr-2`}>
				{word}
			</span>
		{/each}
	</div> -->
		<div class={`text-white mt-2 mb-20`}>
			{#each inputHistory.slice(0, inputHistory.length) as ele}
				<span class={`mr-2 ${ele.style}`} title={`wpm: ${ele.wpm}`}>
					{ele.word}
				</span>
			{/each}
		</div>
	</div>
	<!-- <p class="text-white">{$wordsArr}</p> -->
{:else if $testStatus === 'invalid'}
	<div class="absolute top-[45%] -translate-y-1/2 text-dark-forest-highlighted">
		<p class="font-bold">: (</p>
		<h1 class={`${textVar['accent-error']} mt-2 text-2xl`}>Invalid Test</h1>
		<p class={`mt-2 ${textVar.highlighted}`}>
			Reason: Your accuracy is beyond the threshold of 30%
		</p>
		<div class="flex">
			<button
				on:click={async (e) => {
					// console.log('click')
					// testStatus.set('protected');
					e.preventDefault();
					resetTest();
					document.removeEventListener('keydown', myfunction);
					setGameState('waiting');
					await goto('/');
				}}
				class={`block px-4 py-3 mt-2 font-medium text-sm rounded w-fit ${bgVar['accent-error']} ${textVar.highlighted}`}
				>Restart Test</button
			>
			<button
				on:click={async (e) => {
					// console.log('click')
					// testStatus.set('protected');
					e.preventDefault();
					resetTest();
					document.removeEventListener('keydown', myfunction);
					setGameState('waiting');
					await goto('/');
				}}
				class={`block ml-2 px-4 py-3 mt-2 font-medium text-sm rounded w-fit border`}
				>Contact Support</button
			>
		</div>
	</div>
{:else}
	<div class="absolute top-[45%] -translate-y-1/2 text-dark-forest-highlighted">
		<p class="font-bold">: (</p>
		<h1 class={`${textVar['accent-error']} mt-2 text-2xl`}>Protected Route</h1>
		<p class={`mt-2 ${textVar.highlighted}`}>
			You cannot access this route without attempting the test!
		</p>
		<div class="flex">
			<button
				on:click={async (e) => {
					// console.log('click')
					// testStatus.set('protected');
					e.preventDefault();
					resetTest();
					document.removeEventListener('keydown', myfunction);
					setGameState('waiting');
					await goto('/');
				}}
				class={`block px-4 py-3 mt-2 font-medium text-sm rounded w-fit ${bgVar['accent-error']} ${textVar.highlighted}`}
				>Attempt Test</button
			>
			<button
				on:click={async (e) => {
					// console.log('click')
					// testStatus.set('protected');
					e.preventDefault();
					resetTest();
					document.removeEventListener('keydown', myfunction);
					setGameState('waiting');
					await goto('/');
				}}
				class={`block ml-2 px-4 py-3 mt-2 font-medium text-sm rounded w-fit border`}
				>Contact Support</button
			>
		</div>
	</div>
{/if}
