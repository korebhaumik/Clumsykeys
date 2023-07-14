<script lang="ts">
	import { fade, scale, fly } from 'svelte/transition';
	import {
		getWords,
		modalConfig,
		newTextConfig,
		theme,
		updateModalContent,
		updateModalCounter,
		updateModalVisibility,
		updateTestConfigCounter,
		updateTestConfigLanguage
	} from './store';
	// import SearchSvg from './SearchSVG.svelte';
	import LangSvg from '$lib/assets/LangSVG.svelte';
	import GlobeSvg from '$lib/assets/GlobeSVG.svelte';
	import TimerSvg from '$lib/assets/TimerSVG.svelte';
	import QuotesSvg from '$lib/assets/QuotesSVG.svelte';
	import SettingsSvg from '$lib/assets/SettingsSVG.svelte';
	import ResetSvg from '$lib/assets/ResetSVG.svelte';
	import NotifSvg from '$lib/assets/NotifSVG.svelte';
	import ConfigSvg from '$lib/assets/ConfigSVG.svelte';
	import MoonSvg from '$lib/assets/MoonSVG.svelte';
	import UserSvg from '$lib/assets/UserSVG.svelte';
	import RocketSvg from '$lib/assets/RocketSVG.svelte';
	import { goto } from '$app/navigation';
	import { text } from '@sveltejs/kit';

	let tempTimeCount: number;
	let tempWordsCount: number;

	const textVar = {
		primary: 'text-dark-forest-primary',
		unhighlighted: 'text-dark-forest-unhighlighted',
		highlighted: 'text-dark-forest-highlighted'
	};
	const bgVar = {
		primary: 'bg-dark-forest-primary',
		fade: 'bg-dark-forest-fade'
	};
	const borderVar = {
		fade: 'border-dark-forest-fade',
		unhighlighted: 'border-dark-forest-unhighlighted'
	};
	const placeholderVar = {
		fade: 'placeholder-dark-forest-fade',
		unhighlighted: 'placeholder-dark-forest-unhighlighted',
		highlighted: 'placeholder-dark-forest-highlighted'
	};

	$: {
		if ($theme === 'dark-forest') {
			textVar.highlighted = 'text-dark-forest-highlighted';
			textVar.unhighlighted = 'text-dark-forest-unhighlighted';
			borderVar.unhighlighted = 'border-dark-forest-unhighlighted';
			placeholderVar.highlighted = 'placeholder-dark-forest-highlighted';
			placeholderVar.unhighlighted = 'placeholder-dark-forest-unhighlighted';
			borderVar.fade = 'border-dark-forest-fade';
			placeholderVar.fade = 'placeholder-dark-forest-fade';
			bgVar.primary = 'bg-dark-forest-primary';
			bgVar.fade = 'bg-dark-forest-fade';
		}
		if ($theme === 'cardboard') {
			textVar.highlighted = 'text-cardboard-highlighted';
			textVar.unhighlighted = 'text-cardboard-unhighlighted';
			borderVar.unhighlighted = 'border-cardboard-unhighlighted';
			placeholderVar.highlighted = 'placeholder-cardboard-highlighted';
			placeholderVar.unhighlighted = 'placeholder-cardboard-unhighlighted';
			borderVar.fade = 'border-cardboard-fade';
			placeholderVar.fade = 'placeholder-cardboard-fade';
			bgVar.primary = 'bg-cardboard-primary';
			bgVar.fade = 'bg-dark-forest-fade';
		}
	}
</script>

{#if $modalConfig.isVisible}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- Backdrop -->
	<div
		transition:fade={{ duration: 200 }}
		class="absolute top-0 bottom-0 left-0 right-0 z-10 w-screen h-screen bg-black opacity-40"
		on:click={() => {
			updateModalVisibility();
		}}
	/>
	<!-- Content -->
	<div
		class={`absolute z-20 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ${textVar['highlighted']}`}
	>
		<div transition:scale={{ start: 0.95, delay: 0, duration: 400 }}>
			<div
				class={`${bgVar.primary} rounded w-80 mx-auto sm:w-[30rem] h-fit`}
				transition:fly={{ duration: 400, y: 4 }}
			>
				<!-- lang -->
				{#if $modalConfig.content === 'language'}
					<div>
						<div class="flex px-5 pt-4">
							<LangSvg />
							<h1 class="ml-2">Select Language</h1>
						</div>
						<div class="flex flex-col items-start w-full py-3 text-sm">
							<button
								class="w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
								on:click={async () => {
									updateTestConfigLanguage('english');
									await getWords(100, {
										lang: 'english',
										type: $newTextConfig.quotes.isHighlighted ? 'quotes' : 'words',
										isNumber: $newTextConfig.numbers,
										isPunctuation: $newTextConfig.punctuations
									});
									updateModalVisibility();
								}}>english</button
							>
							<button
								class="w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
								on:click={async () => {
									updateTestConfigLanguage('english 1k');
									await getWords(1000, {
										lang: 'english 1k',
										type: $newTextConfig.quotes.isHighlighted ? 'quotes' : 'words',
										isNumber: $newTextConfig.numbers,
										isPunctuation: $newTextConfig.punctuations
									});
									updateModalVisibility();
								}}>english 1k</button
							>
							<button
								class="w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
								on:click={async () => {
									updateTestConfigLanguage('english 5k');
									await getWords(1000, {
										lang: 'english 5k',
										type: $newTextConfig.quotes.isHighlighted ? 'quotes' : 'words',
										isNumber: $newTextConfig.numbers,
										isPunctuation: $newTextConfig.punctuations
									});
									updateModalVisibility();
								}}>english 5k</button
							>
							<button
								class="w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
								on:click={async () => {
									updateTestConfigLanguage('code python');
									await getWords(100, {
										lang: 'code python',
										type: $newTextConfig.quotes.isHighlighted ? 'quotes' : 'words',
										isNumber: $newTextConfig.numbers,
										isPunctuation: $newTextConfig.punctuations
									});
									updateModalVisibility();
								}}>code python</button
							>
							<button
								class="w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
								on:click={async () => {
									updateTestConfigLanguage('code javascript');
									await getWords(100, {
										lang: 'code javascript',
										type: $newTextConfig.quotes.isHighlighted ? 'quotes' : 'words',
										isNumber: $newTextConfig.numbers,
										isPunctuation: $newTextConfig.punctuations
									});
									updateModalVisibility();
								}}>code javascript</button
							>
						</div>
					</div>
				{/if}

				<!-- test type -->
				{#if $modalConfig.content === 'testType'}
					<div>
						<div class="flex px-5 pt-4">
							<ConfigSvg />
							<h1 class="ml-2">Select test type</h1>
						</div>
						<div class="flex flex-col items-start w-full py-3 text-sm">
							<button
								class="w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
								on:click={async () => {
									updateTestConfigCounter('time', 30);
									await getWords(1000, {
										lang: $newTextConfig.language.value,
										isNumber: $newTextConfig.numbers,
										isPunctuation: $newTextConfig.punctuations
									});
									updateModalCounter('time');
									updateModalVisibility();
								}}>Timer</button
							>
							<button
								class="w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
								on:click={async () => {
									updateTestConfigCounter('words', 50);
									updateModalCounter('words');
									await getWords(1000, {
										lang: $newTextConfig.language.value,
										isNumber: $newTextConfig.numbers,
										isPunctuation: $newTextConfig.punctuations
									});
									updateModalVisibility();
								}}>Words</button
							>
							<button
								class="w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
								on:click={async () => {
									updateTestConfigCounter('quotes', 'Random Quotes');
									updateModalCounter('quotes');
									await getWords(100, {
										lang: $newTextConfig.language.value,
										type: $newTextConfig.quotes.isHighlighted ? 'quotes' : 'words'
									});
									updateModalVisibility();
								}}>Quotes</button
							>
						</div>
					</div>
				{/if}

				<!-- theme -->
				{#if $modalConfig.content === 'theme'}
					<div>
						<div class="flex px-5 pt-4">
							<MoonSvg />
							<h1 class="ml-2">Select Theme</h1>
						</div>
						<div class="flex flex-col items-start w-full py-3 text-sm">
							<button
								class="w-full py-2 px-5 flex justify-between text-left align-baseline hover:bg-cardboard-300"
							>
								<span>cardboard (disabled temporarily)</span>
								<div class="ml-3">
									<span class="h-4 w-4 inline-block bg-cardboard-fade" />
									<span class="h-4 w-4 inline-block bg-cardboard-unhighlighted" />
									<span class="h-4 w-4 inline-block bg-cardboard-accent-main" />
								</div>
							</button>
							<button
								class="w-full py-2 px-5 flex justify-between text-left align-baseline hover:bg-cardboard-300"
								on:click={() => {
									theme.set('dark-forest');
								}}
							>
								<span>dark forest</span>
								<div class="ml-3">
									<span class="h-4 w-4 inline-block bg-dark-forest-fade" />
									<span class="h-4 w-4 inline-block bg-dark-forest-unhighlighted" />
									<span class="h-4 w-4 inline-block bg-dark-forest-accent-main" />
								</div>
							</button>
							<button
								class="w-full py-2 px-5 flex justify-between text-left align-baseline hover:bg-cardboard-300"
								on:click={() => {}}
							>
								<span>Frost (disabled temporarily)</span>
								<div class="ml-3">
									<span class="h-4 w-4 inline-block bg-gray-800" />
									<span class="h-4 w-4 inline-block bg-sky-900" />
									<span class="h-4 w-4 inline-block bg-sky-400" />
								</div>
							</button>
						</div>
					</div>
				{/if}

				<!-- word count -->
				{#if $modalConfig.content === 'wordsCounter'}
					<div>
						<div class="flex px-5 pt-4">
							<GlobeSvg />
							<h1 class="ml-2">Select word count</h1>
						</div>
						<div class="flex flex-col items-start w-full pt-3 text-sm">
							<input
								class={`w-full py-2 pl-5 text-left align-baseline outline-none bg-inherit border-b ${borderVar.fade} ${placeholderVar.unhighlighted}`}
								type="number"
								placeholder="Enter word count"
								bind:value={tempWordsCount}
								on:keydown={async (e) => {
									if (e.key === 'Enter') {
										if (tempWordsCount < 5) {
											tempWordsCount = 5;
											return;
										}
										if (tempWordsCount > 500) {
											tempWordsCount = 500;
											return;
										}
										updateTestConfigCounter('words', tempWordsCount);
										await getWords(tempWordsCount, {
											lang: $newTextConfig.language.value,
											isNumber: $newTextConfig.numbers,
											isPunctuation: $newTextConfig.punctuations
										});
										updateModalVisibility();
									}
								}}
							/>
							<p class="px-5 mt-2 text-sm">
								You can put value between 5 and 500 words. You can later easily change the amount in
								the settings menu : (cog icon or ctrl/cmd + k > word count)
							</p>
							<button
								class={`w-full py-3 mt-2 align-baseline rounded-b ${bgVar.fade}`}
								on:click={async() => {
									if (tempWordsCount < 5) {
										tempWordsCount = 5;
										return;
									}
									if (tempWordsCount > 500) {
										tempWordsCount = 500;
										return;
									}
									updateTestConfigCounter('words', tempWordsCount);
									await getWords(tempWordsCount, {
											lang: $newTextConfig.language.value,
											isNumber: $newTextConfig.numbers,
											isPunctuation: $newTextConfig.punctuations
										});
									updateModalVisibility();
								}}>Enter</button
							>
						</div>
					</div>
				{/if}

				<!-- timer count -->
				{#if $modalConfig.content === 'timeCounter'}
					<div>
						<div class="flex px-5 pt-4">
							<TimerSvg />
							<h1 class="ml-2">Select timer count</h1>
						</div>
						<div class="flex flex-col items-start w-full pt-3 text-sm">
							<input
								class={`w-full py-2 pl-5 text-left align-baseline outline-none bg-inherit border-b ${borderVar.fade} ${placeholderVar.unhighlighted}`}
								type="number"
								bind:value={tempTimeCount}
								placeholder="Enter timer count"
								on:keydown={async(e) => {
									if (e.key === 'Enter') {
										if (tempTimeCount < 5) {
											tempTimeCount = 5;
											return;
										}
										if (tempTimeCount > 1000) {
											tempTimeCount = 1000;
											return;
										}
										updateTestConfigCounter('time', tempTimeCount);
										await getWords(1000, {
											lang: $newTextConfig.language.value,
											isNumber: $newTextConfig.numbers,
											isPunctuation: $newTextConfig.punctuations
										});
										updateModalVisibility();
									}
								}}
							/>
							<p class="px-5 mt-2 text-sm">
								You can put a value between 5 and 1000 seconds. You can later easily change the
								amount in the settings menu : (cog icon or ctrl/cmd + k > timer count)
							</p>
							<button
								class={`w-full py-3 mt-2 align-baseline rounded-b ${bgVar.fade}`}
								on:click={async() => {
									if (tempTimeCount < 5) {
										tempTimeCount = 5;
										return;
									}
									if (tempTimeCount > 1000) {
										tempTimeCount = 1000;
										return;
									}
									updateTestConfigCounter('time', tempTimeCount);
									await getWords(100, {
											lang: $newTextConfig.language.value,
											isNumber: $newTextConfig.numbers,
											isPunctuation: $newTextConfig.punctuations
										});
									updateModalVisibility();
								}}>Enter</button
							>
						</div>
					</div>
				{/if}

				<!-- quotes counter-->
				{#if $modalConfig.content === 'quotesCounter'}
					<div>
						<div class="flex px-5 pt-4">
							<QuotesSvg />
							<h1 class="ml-2">Select quote style</h1>
						</div>
						<div class="flex flex-col items-start w-full py-3 text-sm">
							<button
								class="w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
								on:click={() => {
									updateTestConfigCounter('quotes', 'Random Quotes');
									getWords(200, {
										lang: $newTextConfig.language.value,
										type: $newTextConfig.quotes.isHighlighted ? 'quotes' : 'words'
									});
									updateModalVisibility();
								}}>Random Quotes</button
							>
							<button
								class="w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
								on:click={() => {
									updateTestConfigCounter('quotes', 'Movie Quotes');
									getWords(200, {
										lang: $newTextConfig.language.value,
										type: $newTextConfig.quotes.isHighlighted ? 'quotes' : 'words'
									});
									updateModalVisibility();
								}}>Movie Quotes</button
							>
							<button
								class="w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
								on:click={() => {
									updateTestConfigCounter('quotes', 'Famous Quotes');
									getWords(200, {
										lang: $newTextConfig.language.value,
										type: $newTextConfig.quotes.isHighlighted ? 'quotes' : 'words'
									});
									updateModalVisibility();
								}}>Famous Quotes</button
							>
							<button class="w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
								>Code snippets</button
							>
						</div>
					</div>
				{/if}

				{#if $modalConfig.content === 'menu'}
					<!-- Settings -->
					<div>
						<div class="flex px-5 pt-4">
							<SettingsSvg variant="" />
							<h1 class="ml-2 font-medium">Settings Menu</h1>
						</div>
						<div class="flex flex-col items-start w-full py-3 text-sm">
							<button
								class="flex items-center w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
								on:click={() => {
									updateModalVisibility();
									goto('/');
								}}
							>
								<ResetSvg
									variant={{
										highlighted: textVar.highlighted,
										unhighlighted: textVar.highlighted
									}}
								/>
								<span class="ml-2">Reset Test</span>
							</button>
							<button
								class="flex items-center w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
								on:click={() => updateModalVisibility()}
							>
								<NotifSvg />
								<span class="ml-2">Notifications</span>
							</button>
							<button
								class="flex items-center w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
								on:click={() => updateModalContent('theme')}
							>
								<MoonSvg />
								<span class="ml-2">Theme</span>
							</button>
							<button
								class="flex items-center w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
								on:click={() => updateModalContent('language')}
							>
								<GlobeSvg />
								<span class="ml-2">Language</span></button
							>
							<button
								class="flex items-center w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
								on:click={() => updateModalContent('testType')}
							>
								<ConfigSvg />
								<span class="ml-2">Test type</span></button
							>
							{#if $modalConfig.counter === 'time'}
								<button
									class="flex items-center w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
									on:click={() => updateModalContent('timeCounter')}
								>
									<TimerSvg />
									<span class="ml-2">Time counter</span></button
								>
							{/if}
							{#if $modalConfig.counter === 'words'}
								<button
									class="flex items-center w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
									on:click={() => updateModalContent('wordsCounter')}
								>
									<TimerSvg />
									<span class="ml-2">Words counter</span></button
								>
							{/if}
							{#if $modalConfig.counter === 'quotes'}
								<button
									class="flex items-center w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
									on:click={() => updateModalContent('quotesCounter')}
								>
									<TimerSvg />
									<span class="ml-2">Quotes counter</span></button
								>
							{/if}

							<button
								class="flex items-center w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
								on:click={() => {
									updateModalVisibility();
									goto('/login');
								}}
							>
								<UserSvg />
								<span class="ml-2">User settings</span></button
							>
							<button
								class="flex items-center w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
								on:click={() => {
									updateModalVisibility();
									goto('/leaderboards');
								}}
							>
								<RocketSvg variant="" />
								<span class="ml-2">Leaderboards</span></button
							>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
