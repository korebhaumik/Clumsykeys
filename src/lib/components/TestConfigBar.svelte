<script lang="ts">
	import AtSvg from '$lib/assets/AtSVG.svelte';
	import GlobeSvg from '$lib/assets/GlobeSVG.svelte';
	import HashSvg from '$lib/assets/HashSVG.svelte';
	import QuotesSvg from '$lib/assets/QuotesSVG.svelte';
	import SettingsSvg from '$lib/assets/SettingsSVG.svelte';
	import TimerSvg from '$lib/assets/TimerSVG.svelte';
	import WrenchSvg from '$lib/assets/WrenchSVG.svelte';
	import { page } from '$app/stores';

	import {
		getWords,
		updateModalContent,
		updateModalVisibility,
		updateTestConfigCounter
	} from './store';
	import { newTextConfig, updateTestConfigFormat } from './store';
	import { theme } from './store';

	const bgVar = {
		primary: 'bg-dark-forest-primary',
		fade: 'bg-dark-forest-fade'
	};
	const borderVar = {
		primary: 'border-dark-forest-primary',
		fade: 'border-dark-forest-fade'
	};
	const textVar = {
		unhighlighted: 'text-dark-forest-unhighlighted',
		highlighted: 'text-dark-forest-highlighted',
		'accent-main': 'text-dark-forest-accent-main'
	};

	$: {
		if ($theme === 'dark-forest') {
			bgVar.primary = 'bg-dark-forest-primary';
			bgVar.fade = 'bg-dark-forest-fade';
			textVar.unhighlighted = 'text-dark-forest-unhighlighted';
			textVar.highlighted = 'text-dark-forest-highlighted';
			textVar['accent-main'] = 'text-dark-forest-accent-main';
			borderVar.primary = 'border-dark-forest-primary';
			borderVar.fade = 'border-dark-forest-fade';
		}
		if ($theme === 'cardboard') {
			bgVar.primary = 'bg-cardboard-primary';
			bgVar.fade = 'bg-cardboard-fade';
			textVar.highlighted = 'text-cardboard-highlighted';
			textVar.unhighlighted = 'text-cardboard-unhighlighted';
			textVar['accent-main'] = 'text-cardboard-accent-main';
			borderVar.primary = 'border-cardboard-primary';
			borderVar.fade = 'border-cardboard-fade';
		}
	}

	$: variantConfig = {
		punctuations: '',
		numbers: '',
		time: '',
		words: '',
		quotes: '',
		due: {
			val: -1,
			class: `underline underline-offset-1 decoration-2  ${textVar['accent-main']}`
		},
		wrench: {
			class: '',
			cb: () => {
				updateModalVisibility();
			}
		}
	};

	$: {
		$newTextConfig.punctuations
			? (variantConfig.punctuations = `underline underline-offset-1 decoration-2  ${textVar['accent-main']}`)
			: (variantConfig.punctuations = '');
		$newTextConfig.numbers
			? (variantConfig.numbers = `underline underline-offset-1 decoration-2  ${textVar['accent-main']}`)
			: (variantConfig.numbers = '');
		$newTextConfig.time.isHighlighted
			? (variantConfig.time = `underline underline-offset-1 decoration-2  ${textVar['accent-main']}`)
			: (variantConfig.time = '');
		$newTextConfig.words.isHighlighted
			? (variantConfig.words = `underline underline-offset-1 decoration-2  ${textVar['accent-main']}`)
			: (variantConfig.words = '');
		$newTextConfig.quotes.isHighlighted
			? (variantConfig.quotes = `underline underline-offset-1 decoration-2  ${textVar['accent-main']}`)
			: (variantConfig.quotes = '');

		if ($newTextConfig.time.isHighlighted) {
			variantConfig.due.val = $newTextConfig.time.value;
			variantConfig.wrench.class = [15, 30, 60, 120].includes($newTextConfig.time.value)
				? ''
				: textVar['accent-main'];
			variantConfig.wrench.cb = () => {
				updateModalContent('timeCounter');
				updateModalVisibility();
			};
		}
		if ($newTextConfig.words.isHighlighted) {
			variantConfig.due.val = $newTextConfig.words.value;
			variantConfig.wrench.class = [25, 50, 75, 100].includes($newTextConfig.words.value)
				? ''
				: textVar['accent-main'];
			variantConfig.wrench.cb = () => {
				updateModalContent('wordsCounter');
				updateModalVisibility();
			};
		}
		if ($newTextConfig.quotes.isHighlighted) {
			variantConfig.wrench.class = textVar['accent-main'];
			variantConfig.wrench.cb = () => {
				updateModalContent('quotesCounter');
				updateModalVisibility();
			};
		}
	}
	// if($newTextConfig.quotes.isHighlighted) variantConfig.due.val = $newTextConfig.quotes.value;
</script>

<!-- 972 -->
<!-- {#if $page.url.pathname === '/'} -->
<main
	class={`flex font-semibold px-4 hd:hidden ${bgVar.fade}  py-3 w-fit ${textVar.unhighlighted} rounded-lg`}
>
	<SettingsSvg variant="" />
	<span class="ml-2">test settings</span>
</main>

<main
	class={`hidden font-semibold px-4 hd:flex ${bgVar.fade} py-3 w-[55rem] ${textVar.unhighlighted} rounded-lg justify-between`}
>
	<!-- punctuations -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<button
		on:click={async () => {
			updateTestConfigFormat('punctuations');
			getWords($newTextConfig.words.isHighlighted ? $newTextConfig.words.value : 200, {
				lang: $newTextConfig.language.value,
				type: $newTextConfig.quotes.isHighlighted ? 'quotes' : 'words',
				isNumber: $newTextConfig.numbers,
				isPunctuation: $newTextConfig.punctuations
			});
		}}
		class={`flex items-center cursor-pointer ${variantConfig.punctuations}`}
	>
		<AtSvg />
		<span class="ml-1 text-sm">punctuations</span>
	</button>

	<!-- Numbers -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<button
		on:click={() => {
			updateTestConfigFormat('numbers');
			getWords($newTextConfig.words.isHighlighted ? $newTextConfig.words.value : 200, {
				lang: $newTextConfig.language.value,
				type: $newTextConfig.quotes.isHighlighted ? 'quotes' : 'words',
				isNumber: $newTextConfig.numbers,
				isPunctuation: $newTextConfig.punctuations
			});
		}}
		class={`flex items-center cursor-pointer ${variantConfig.numbers}`}
	>
		<HashSvg />
		<span class="ml-1 text-sm">numbers</span>
	</button>

	<hr class={`w-1 h-6 rounded ${bgVar.primary} ${borderVar.primary}`} />

	<!-- Time -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<button
		on:click={async () => {
			updateTestConfigCounter('time', $newTextConfig.time.value);
			await getWords(200, {
				lang: $newTextConfig.language.value,
				isNumber: $newTextConfig.numbers,
				isPunctuation: $newTextConfig.punctuations
			});
		}}
		class={`flex items-center cursor-pointer ${variantConfig.time}`}
	>
		<TimerSvg />
		<span class="ml-1 text-sm">time</span>
	</button>

	<!-- Words -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<button
		on:click={async () => {
			updateTestConfigCounter('words', $newTextConfig.words.value);
			await getWords($newTextConfig.words.value, {
				lang: $newTextConfig.language.value,
				isNumber: $newTextConfig.numbers,
				isPunctuation: $newTextConfig.punctuations
			});
		}}
		class={`flex items-center cursor-pointer ${variantConfig.words} no-underline`}
	>
		<span class="text-base font-poppins">Aa</span>
		<span class={`ml-1 text-sm ${variantConfig.words} `}>words</span>
	</button>
	<!-- Quotes -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<button
		on:click={async () => {
			updateTestConfigCounter('quotes', 'Random Quotes');
			await getWords(100, {
				type: 'quotes',
				lang: 'english'
			});
		}}
		class={`flex items-center cursor-pointer ${variantConfig.quotes} no-underline`}
	>
		<QuotesSvg />
		<span class={`ml-1 text-sm ${variantConfig.quotes}`}> quotes</span>
	</button>

	<hr class={`w-1 h-6 rounded  ${bgVar.primary} ${borderVar.primary}`} />

	<!-- due -->
	<div class="flex items-center">
		{#if $newTextConfig.time.isHighlighted}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<span
				class={`mr-3 text-sm cursor-pointer ${
					variantConfig.due.val === 15 ? variantConfig.due.class : null
				}`}
				on:click={() => {
					updateTestConfigCounter('time', 15);
					getWords(200, {
						lang: $newTextConfig.language.value,
						isNumber: $newTextConfig.numbers,
						isPunctuation: $newTextConfig.punctuations
					});
				}}>15</span
			>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<span
				class={`mr-3 text-sm cursor-pointer ${
					variantConfig.due.val === 30 ? variantConfig.due.class : null
				}`}
				on:click={() => {
					updateTestConfigCounter('time', 30);
					getWords(200, {
						lang: $newTextConfig.language.value,
						isNumber: $newTextConfig.numbers,
						isPunctuation: $newTextConfig.punctuations
					});
				}}>30</span
			>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<span
				class={`mr-3 text-sm cursor-pointer ${
					variantConfig.due.val === 60 ? variantConfig.due.class : null
				}`}
				on:click={() => {
					updateTestConfigCounter('time', 60);
					getWords(200, {
						lang: $newTextConfig.language.value,
						isNumber: $newTextConfig.numbers,
						isPunctuation: $newTextConfig.punctuations
					});
				}}>60</span
			>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<span
				class={`mr-3 text-sm cursor-pointer ${
					variantConfig.due.val === 120 ? variantConfig.due.class : null
				}`}
				on:click={() => {
					updateTestConfigCounter('time', 120);
					getWords(200, {
						lang: $newTextConfig.language.value,
						isNumber: $newTextConfig.numbers,
						isPunctuation: $newTextConfig.punctuations
					});
				}}>120</span
			>
		{:else if $newTextConfig.words.isHighlighted}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<span
				class={`mr-3 text-sm cursor-pointer ${
					variantConfig.due.val === 25 ? variantConfig.due.class : null
				}`}
				on:click={() => {
					updateTestConfigCounter('words', 25);
					getWords(25, {
						lang: $newTextConfig.language.value,
						isNumber: $newTextConfig.numbers,
						isPunctuation: $newTextConfig.punctuations
					});
				}}>25</span
			>
			<!-- svelte-ignore a11y-click-events-have-key-events -->

			<span
				class={`mr-3 text-sm cursor-pointer ${
					variantConfig.due.val === 50 ? variantConfig.due.class : null
				}`}
				on:click={() => {
					updateTestConfigCounter('words', 50);
					getWords(50, {
						lang: $newTextConfig.language.value,
						isNumber: $newTextConfig.numbers,
						isPunctuation: $newTextConfig.punctuations
					});
				}}>50</span
			>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<span
				class={`mr-3 text-sm cursor-pointer ${
					variantConfig.due.val === 75 ? variantConfig.due.class : null
				}`}
				on:click={() => {
					updateTestConfigCounter('words', 75);
					getWords(75, {
						lang: $newTextConfig.language.value,
						isNumber: $newTextConfig.numbers,
						isPunctuation: $newTextConfig.punctuations
					});
				}}>75</span
			>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<span
				class={`mr-3 text-sm cursor-pointer ${
					variantConfig.due.val === 100 ? variantConfig.due.class : null
				}`}
				on:click={() => {
					updateTestConfigCounter('words', 100);
					getWords(100, {
						lang: $newTextConfig.language.value,
						isNumber: $newTextConfig.numbers,
						isPunctuation: $newTextConfig.punctuations
					});
				}}>100</span
			>
		{:else if $newTextConfig.quotes.isHighlighted}
			<span
				class={`mr-3 text-sm cursor-pointer ${textVar['accent-main']} underline underline-offset-1 decoration-2`}
				>{$newTextConfig.quotes.value}</span
			>
		{/if}
		<WrenchSvg variant={variantConfig.wrench.class} cb={variantConfig.wrench.cb} />
	</div>

	<hr class={`w-1 h-6 rounded  ${bgVar.primary} ${borderVar.primary}`} />

	<!-- language -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class={`flex items-center cursor-pointer ${textVar['accent-main']}  underline underline-offset-1 decoration-2`}
		on:click={() => {
			updateModalContent('language');
			updateModalVisibility();
		}}
	>
		<GlobeSvg />
		<span class="ml-1 text-sm">{$newTextConfig.language.value}</span>
	</div>
</main>
<!-- {/if} -->
