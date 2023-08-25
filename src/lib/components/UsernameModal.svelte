<script lang="ts">
	import { fade, scale, fly } from 'svelte/transition';
	import {
		modalConfig,
		newTextConfig,
		updateModalContent,
		updateModalCounter,
		updateModalVisibility,
		updateTestConfigCounter,
		updateTestConfigLanguage
	} from './config.store';
	import { theme, inputEl } from './fun.store';
	import { getWords } from './game.store';

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

<!-- {#if $modalConfig.isVisible} -->
{#if true}
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
		class={`absolute z-20 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2  ${textVar['highlighted']}`}
	>
		<div transition:scale={{ start: 0.95, delay: 0, duration: 400 }}>
			<div
				class={`${bgVar.primary} rounded-lg w-80 mx-auto sm:w-[30rem] border border-zinc-800 h-fit`}
				transition:fly={{ duration: 400, y: 4 }}
			>
				<!-- username -->
				<div>
					<div class="flex px-5 pt-4">
						<LangSvg />
						<h1 class="ml-2">Enter your username</h1>
					</div>
					<div class="flex flex-col items-start w-full py-3 text-sm">
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
									$inputEl.focus();
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
						<button
							class="w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
							on:click={async () => {
								$inputEl.focus();
								updateTestConfigLanguage('english');

								await getWords(
									$newTextConfig.words.isHighlighted ? $newTextConfig.words.value : 100,
									{
										lang: 'english',
										type: $newTextConfig.quotes.isHighlighted ? 'quotes' : 'words',
										isNumber: $newTextConfig.numbers,
										isPunctuation: $newTextConfig.punctuations
									}
								);
								updateModalVisibility();
							}}>english</button
						>
						<button
							class="w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
							on:click={async () => {
								$inputEl.focus();
								updateTestConfigLanguage('english 1k');
								await getWords(
									$newTextConfig.words.isHighlighted ? $newTextConfig.words.value : 1000,
									{
										lang: 'english 1k',
										type: $newTextConfig.quotes.isHighlighted ? 'quotes' : 'words',
										isNumber: $newTextConfig.numbers,
										isPunctuation: $newTextConfig.punctuations
									}
								);
								updateModalVisibility();
							}}>english 1k</button
						>
						<button
							class="w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
							on:click={async () => {
								$inputEl.focus();
								updateTestConfigLanguage('english 5k');
								await getWords(
									$newTextConfig.words.isHighlighted ? $newTextConfig.words.value : 2000,
									{
										lang: 'english 5k',
										type: $newTextConfig.quotes.isHighlighted ? 'quotes' : 'words',
										isNumber: $newTextConfig.numbers,
										isPunctuation: $newTextConfig.punctuations
									}
								);
								updateModalVisibility();
							}}>english 5k</button
						>
						<button
							class="w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
							on:click={async () => {
								$inputEl.focus();
								updateTestConfigLanguage('code python');
								await getWords(
									$newTextConfig.words.isHighlighted ? $newTextConfig.words.value : 100,
									{
										lang: 'code python',
										type: $newTextConfig.quotes.isHighlighted ? 'quotes' : 'words',
										isNumber: $newTextConfig.numbers,
										isPunctuation: $newTextConfig.punctuations
									}
								);
								updateModalVisibility();
							}}>code python</button
						>
						<button
							class="w-full py-2 pl-5 text-left align-baseline hover:bg-cardboard-300"
							on:click={async () => {
								$inputEl.focus();
								updateTestConfigLanguage('code javascript');
								await getWords(
									$newTextConfig.words.isHighlighted ? $newTextConfig.words.value : 100,
									{
										lang: 'code javascript',
										type: $newTextConfig.quotes.isHighlighted ? 'quotes' : 'words',
										isNumber: $newTextConfig.numbers,
										isPunctuation: $newTextConfig.punctuations
									}
								);
								updateModalVisibility();
							}}>code javascript</button
						>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
