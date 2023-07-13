<script lang="ts">
	import { text } from '@sveltejs/kit';
	import InfoSvg from '../assets/InfoSVG.svelte';
	import KeyboardSvg from '../assets/KeyboardSVG.svelte';
	import LogoSvg from '../assets/LogoSVG.svelte';
	import NotifSvg from '../assets/NotifSVG.svelte';
	import RocketSvg from '../assets/RocketSVG.svelte';
	import SettingsSvg from '../assets/SettingsSVG.svelte';
	import UserSvg from '../assets/UserSVG.svelte';
	import Sidebar from './Sidebar.svelte';
	import { theme, game, updateModalContent, updateModalVisibility } from './store';
	// import {textVar, bgVar,} from './store';

	$: isVisible = false;

	function handleEvent(e: any) {
		isVisible = !isVisible;
		// console.log(e);
	}

	const bgVar = {
		command: 'bg-cardboard-command-bg'
	};
	const textVar = {
		unhighlighted: 'text-dark-forest-unhighlighted',
		highlighted: 'text-dark-forest-highlighted',
		credits: `text-dark-forest-credits`,
		'logo-text-subheading': 'text-dark-forest-logo-text-subheading',
		'logo-text-heading': 'text-dark-forest-logo-text-heading',
		'logo-icon-fg': 'text-dark-forest-logo-icon-fg',
		'logo-icon-bg': 'text-dark-forest-logo-icon-bg',
		'accent-red': 'text-dark-forest-accent-red',
		'accent-purple': 'text-dark-forest-accent-purple',
		'accent-yellow': 'text-dark-forest-accent-yellow',
		'accent-green': 'text-dark-forest-accent-green'
	};

	$: {
		if ($theme === 'dark-forest') {
			bgVar.command = 'bg-dark-forest-command-bg';
			textVar['logo-text-subheading'] = 'text-dark-forest-logo-text-subheading';
			textVar['logo-text-heading'] = 'text-dark-forest-logo-text-heading';
			textVar.highlighted = 'text-dark-forest-highlighted';
			textVar.credits = `text-dark-forest-credits`;
			textVar['logo-icon-fg'] = 'text-dark-forest-logo-icon-fg';
			textVar['logo-icon-bg'] = 'text-dark-forest-logo-icon-bg';
			textVar['accent-red'] = 'text-dark-forest-accent-red';
			textVar['accent-purple'] = 'text-dark-forest-accent-purple';
			textVar['accent-yellow'] = 'text-dark-forest-accent-yellow';
			textVar['accent-green'] = 'text-dark-forest-accent-green';
		}
		if ($theme === 'cardboard') {
			bgVar.command = 'bg-cardboard-command-bg';
			textVar['logo-text-subheading'] = 'text-cardboard-logo-text-subheading';
			textVar['logo-text-heading'] = 'text-cardboard-logo-text-heading';
			textVar.highlighted = 'text-cardboard-highlighted';
			textVar.credits = `text-cardboard-credits`;
			textVar['logo-icon-fg'] = 'text-cardboard-logo-icon-fg';
			textVar['logo-icon-bg'] = 'text-cardboard-logo-icon-bg';
			textVar['accent-red'] = 'text-cardboard-accent-red';
			textVar['accent-purple'] = 'text-cardboard-accent-purple';
			textVar['accent-yellow'] = 'text-cardboard-accent-yellow';
			textVar['accent-green'] = 'text-cardboard-accent-green';
		}
	}
	$: {
		if ($game === 'playing') {
			textVar['logo-text-subheading'] = 'text-dark-forest-unhighlighted transition';
			textVar['logo-text-heading'] = 'text-dark-forest-unhighlighted transition';
			textVar['accent-red'] = 'text-dark-forest-unhighlighted transition';
			textVar['accent-purple'] = 'text-dark-forest-unhighlighted transition';
			textVar['accent-yellow'] = 'text-dark-forest-unhighlighted transition';
			textVar['accent-green'] = 'text-dark-forest-unhighlighted transition';
			textVar['accent-yellow'] = 'text-dark-forest-unhighlighted transition';
		}
		if ($game != 'playing') {
			textVar['logo-text-subheading'] = 'text-dark-forest-logo-text-subheading';
			textVar['logo-text-heading'] = 'text-dark-forest-logo-text-heading';
			textVar['accent-red'] = 'text-dark-forest-accent-red';
			textVar['accent-purple'] = 'text-dark-forest-accent-purple';
			textVar['accent-yellow'] = 'text-dark-forest-accent-yellow';
			textVar['accent-green'] = 'text-dark-forest-accent-green';
			textVar['accent-yellow'] = 'text-dark-forest-accent-yellow';
		}
	}
</script>

<header class="flex items-end justify-between">
	<div class="flex items-end">
		<!-- logo -->
		<div class="flex items-end w-fit">
			<LogoSvg fg={textVar['logo-icon-fg']} bg={textVar['logo-icon-bg']} />
			<div class="flex flex-col items-start ml-3 font-normal font-poppins">
				<span
					class={`text-xs sm:text-sm leading-none ml-0.5 sm:-mb-1.5 ${textVar['logo-text-subheading']}`}
					>cleverly clumsy</span
				>
				<span class={`leading-none text-2xl sm:text-3xl ${textVar['logo-text-heading']} `}
					>clumsykeys</span
				>
			</div>
		</div>

		<!-- Menu -->
		<div class="justify-between hidden ml-7 mb-1 sm:flex w-40">
			<a href="/" data-sveltekit-preload-code>
				<KeyboardSvg variant={textVar['accent-red']} />
			</a>
			<a href={$game === 'playing' ? '' : '/leaderboards'} data-sveltekit-preload-code>
				<RocketSvg variant={textVar['accent-purple']} />
			</a>
			<a href="/">
				<InfoSvg variant={textVar['accent-yellow']} />
			</a>
			<a
				href="/"
				on:click={() => {
					if ($game === 'playing') return;
					updateModalContent('menu');
					updateModalVisibility();
				}}
			>
				<SettingsSvg variant={textVar['accent-green']} />
			</a>
			<!-- <InfoSvg variant={textVar['accent-yellow']}  /> -->
		</div>
	</div>

	<!-- User -->
	{#if $game != 'playing'}
		<div class={`flex justify-between w-16 mb-1 ${textVar['credits']}`}>
			<button
				on:click={() => {
					isVisible = !isVisible;
				}}
			>
				<NotifSvg />
			</button>
			<a href="/login">
				<UserSvg />
			</a>
		</div>
	{/if}
	{#if isVisible}
		<Sidebar on:CustomClickEvent={handleEvent} />
	{/if}
</header>
