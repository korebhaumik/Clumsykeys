<script lang="ts">
	import { fade, scale, fly } from 'svelte/transition';
	import {
		modalConfig,
		theme,
		updateModalContent,
		updateModalCounter,
		updateModalVisibility,
		updateTestConfigCounter,
		updateTestConfigLanguage
	} from './store';
	import SearchSvg from './SearchSVG.svelte';
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
	import InfoSvg from '$lib/assets/InfoSVG.svelte';
	import { goto } from '$app/navigation';

	let tempTimeCount: number;
	let tempWordsCount: number;

	const textVar = {
		primary: 'text-cardboard-primary',
		fade: 'text-cardboard-fade',
		unhighlighted: 'text-cardboard-unhighlighted',
		highlighted: 'text-cardboard-highlighted',

		'logo-text-subheading': 'text-cardboard-logo-text-subheading',
		'logo-text-heading': 'text-cardboard-logo-text-heading',
		'accent-red': 'text-cardboard-accent-red',
		'accent-green': 'text-cardboard-accent-green',
		'accent-purple': 'text-cardboard-accent-purple',
		'accent-yellow': 'text-cardboard-accent-yellow',
		'accent-error': 'text-carboard-accent-error',
		'accent-main': 'text-cardboard-main',
		'command-text': 'text-cardboard-command-text',
		'command-bg': 'bg-cardboard-command-bg',

		credits: `text-cardboard-credits`
	};
	const bgVar = {
		primary: 'bg-cardboard-primary',
		fade: 'bg-cardboard-fade'
	};

	const borderVar = {
		fade: 'border-cardboard-fade',
		unhighlighted: 'border-cardboard-unhighlighted',
		highlighted: 'border-cardboard-highlighted'
	};

	const placeholderVar = {
		fade: 'placeholder-cardboard-fade',
		unhighlighted: 'placeholder-cardboard-unhighlighted',
		highlighted: 'placeholder-cardboard-highlighted'
	};

	// $: {
	// 	if ($theme === 'dark-forest') {
	// 		textVar.highlighted = 'text-dark-forest-highlighted';
	// 		textVar.unhighlighted = 'text-dark-forest-unhighlighted';
	// 		borderVar.highlighted = 'border-dark-forest-highlighted';
	// 		borderVar.unhighlighted = 'border-dark-forest-unhighlighted';
	// 		placeholderVar.highlighted = 'placeholder-dark-forest-highlighted';
	// 		placeholderVar.unhighlighted = 'placeholder-dark-forest-unhighlighted';
	// 		borderVar.fade = 'border-dark-forest-fade';
	// 		placeholderVar.fade = 'placeholder-dark-forest-fade';
	// 		textVar.fade = 'text-dark-forest-fade';
	// 		textVar.credits = `text-dark-forest-credits`;
	// 		bgVar.primary = 'bg-dark-forest-primary';
	// 	}
	// 	if ($theme === 'cardboard') {
	// 		textVar.highlighted = 'text-cardboard-highlighted';
	// 		textVar.unhighlighted = 'text-cardboard-unhighlighted';
	// 		borderVar.highlighted = 'border-cardboard-highlighted';
	// 		borderVar.unhighlighted = 'border-cardboard-unhighlighted';
	// 		placeholderVar.highlighted = 'placeholder-cardboard-highlighted';
	// 		placeholderVar.unhighlighted = 'placeholder-cardboard-unhighlighted';
	// 		borderVar.fade = 'border-cardboard-fade';
	// 		placeholderVar.fade = 'placeholder-cardboard-fade';
	// 		textVar.fade = 'text-cardboard-fade';
	// 		textVar.credits = `text-cardboard-credits`;
	// 		bgVar.primary = 'bg-cardboard-primary';
	// 	}
	// }
</script>

{#if $modalConfig.isVisible}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		transition:fade={{ duration: 200 }}
		class="absolute top-0 bottom-0 left-0 right-0 z-10 w-screen h-screen bg-black opacity-40"
		on:click={()=>{
			updateModalVisibility();
		}}
		
	/>
	<div
		class={`absolute z-20 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ${textVar['highlighted']}`}
	>
		<div transition:scale={{ start: 0.95, delay: 0, duration: 400 }}>
			<div
				class={`${bgVar.primary} rounded w-80 mx-auto sm:w-[30rem] h-fit`}
				transition:fly={{ duration: 400, y: 4 }}
			>
				<!-- <div>
					<div class="flex px-5 pt-5">
						<span class="font-medium font-poppins">Aa</span>
						<h1 class="ml-1 text-base">Words Amount</h1>
					</div>
					<input placeholder="Enter no. of words"  class="mx-5 text-sm"/>
					<p class="px-5 text-sm">
						You can start an infinite test by inputting 0. Then, to stop the test, use the Bail Out
						feature (esc or ctrl/cmd + shift + p > Bail Out)
					</p>
					<button class="w-full py-3 mt-2 text-sm rounded-b bg-cardboard-300" on:click={() => isVisible.update((v) => !v)}>ok</button>
				</div> -->

				<!-- lang -->
				{#if $modalConfig.content === 'language'}
					<!-- language -->
					<div>
						<div class="flex px-5 pt-4">
							<LangSvg />
							<h1 class="ml-2">Select Language</h1>
						</div>
						<div class="flex flex-col items-start w-full py-3 text-sm">
							<button
								class="w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
								on:click={() => {
									updateTestConfigLanguage('english');
									updateModalVisibility();
								}}>english</button
							>
							<button
								class="w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
								on:click={() => {
									updateTestConfigLanguage('english 1k');
									updateModalVisibility();
								}}>english 1k</button
							>
							<button
								class="w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
								on:click={() => {
									updateTestConfigLanguage('english 5k');
									updateModalVisibility();
								}}>english 5k</button
							>
							<button
								class="w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
								on:click={() => {
									updateTestConfigLanguage('code python');
									updateModalVisibility();
								}}>code python</button
							>
							<button
								class="w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
								on:click={() => {
									updateTestConfigLanguage('code javascript');
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
								on:click={() => {
									updateTestConfigCounter('time', 30);
									updateModalVisibility();
								}}>Timer</button
							>
							<button
								class="w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
								on:click={() => {
									updateTestConfigCounter('words', 50);
									updateModalVisibility();
								}}>Words</button
							>
							<button
								class="w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
								on:click={() => {
									updateTestConfigCounter('quotes', 'Random Quotes');
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
								on:click={() => {
									theme.set('cardboard');
								}}
							>
								<span>cardboard</span>
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
								<span>Frost (soon)</span>
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
								class={`w-full py-2 pl-5 text-left align-baseline outline-none bg-cardboard-fade bg-inherit border-b border-b-cardboard-300 placeholder-cardboard-500`}
								type="text"
								placeholder="Enter word count"
								bind:value={tempWordsCount}
								on:keydown={(e) => {
									if (e.key === 'Enter') {
										if (!tempWordsCount) return;
										updateTestConfigCounter('words', tempWordsCount);
										updateModalVisibility();
									}
								}}
							/>
							<p class="px-5 mt-2 text-sm">
								You can put atmost 500 words. You can later easily change the amount in the settings
								menu : (cog icon or ctrl/cmd + k > word count)
							</p>
							<button
								class="w-full py-3 mt-2 align-baseline rounded-b bg-cardboard-300"
								on:click={() => {
									if (!tempWordsCount) return;
									updateTestConfigCounter('words', tempWordsCount);
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
								on:keydown={(e) => {
									if (e.key === 'Enter') {
										if (!tempTimeCount) return;
										updateTestConfigCounter('time', tempTimeCount);
										updateModalVisibility();
									}
								}}
							/>
							<p class="px-5 mt-2 text-sm">
								You can put atmost 1000 seconds. You can later easily change the amount in the
								settings menu : (cog icon or ctrl/cmd + k > timer count)
							</p>
							<button
								class={`w-full py-3 mt-2 align-baseline rounded-b ${bgVar.fade}`}
								on:click={() => {
									if (!tempTimeCount) return;
									updateTestConfigCounter('time', tempTimeCount);
									updateModalVisibility();
								}}>Enter</button
							>
						</div>
					</div>
				{/if}

				{#if $modalConfig.content === 'quotesCounter'}
					<!-- quotes -->
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
									updateModalVisibility();
								}}>Random Quotes</button
							>
							<button
								class="w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
								on:click={() => {
									updateTestConfigCounter('quotes', 'Movie Quotes');
									updateModalVisibility();
								}}>Movie Quotes</button
							>
							<button
								class="w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
								on:click={() => {
									updateTestConfigCounter('quotes', 'Famous Quotes');
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
							<SettingsSvg />
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
								<ResetSvg />
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
								<RocketSvg />
								<span class="ml-2">Leaderboards</span></button
							>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
