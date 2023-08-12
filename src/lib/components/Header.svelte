<script lang="ts">
	import cn from '$lib/utils';
	import InfoSvg from '../assets/InfoSVG.svelte';
	import KeyboardSvg from '../assets/KeyboardSVG.svelte';
	import LogoSvg from '../assets/LogoSVG.svelte';
	import NotifSvg from '../assets/NotifSVG.svelte';
	import RocketSvg from '../assets/RocketSVG.svelte';
	import SettingsSvg from '../assets/SettingsSVG.svelte';
	import UserSvg from '../assets/UserSVG.svelte';
	import Sidebar from './Sidebar.svelte';
	import { theme } from './fun.store';
	import { game } from './game.store';
	import { updateModalContent, updateModalVisibility } from './config.store';

	$: isVisible = false;

	function handleEvent(e: any) {
		isVisible = !isVisible;
		// console.log(e);
	}
</script>

<header class="flex items-end justify-between">
	<div class="flex items-end">
		<!-- logo -->
		<div class="flex items-end w-fit">
			<!-- <LogoSvg fg={textVar['logo-icon-fg']} bg={textVar['logo-icon-bg']} /> -->
			<LogoSvg />

			<div class="flex flex-col items-start ml-3 font-normal font-poppins">
				<span
					class={cn(
						`text-xs sm:text-sm leading-none ml-0.5 sm:-mb-1.5 transition text-dark-forest-logo-text-subheading`,
						{
							'text-dark-forest-logo-text-subheading': $theme === 'dark-forest',
							'text-cardboard-logo-text-subheading': $theme === 'cardboard',
							'text-dark-forest-unhighlighted': $game === 'playing'
						}
					)}>cleverly clumsy</span
				>
				<span
					class={cn(
						`leading-none text-2xl sm:text-3xl transition text-dark-forest-logo-text-heading `,
						{
							'text-dark-forest-logo-text-heading': $theme === 'dark-forest',
							'text-dark-forest-unhighlighted': $game === 'playing',
							'text-cardboard-logo-text-heading': $theme === 'cardboard'
						}
					)}>clumsykeys</span
				>
			</div>
		</div>

		<!-- Menu -->
		<div class="justify-between hidden ml-7 mb-1 sm:flex w-40">
			<a
				aria-label={`Game`}
				href="/"
				class={cn('transition text-dark-forest-accent-red', {
					'text-dark-forest-accent-red': $theme === 'dark-forest',
					'text-dark-forest-unhighlighted': $game === 'playing'
				})}
				data-sveltekit-preload-code
			>
				<KeyboardSvg />
			</a>
			<a
				aria-label={`Leaderboards`}
				href={$game === 'playing' ? '' : '/leaderboards'}
				class={cn('transition text-dark-forest-accent-purple', {
					'text-dark-forest-accent-purple': $theme === 'dark-forest',
					'text-dark-forest-unhighlighted': $game === 'playing'
				})}
				data-sveltekit-preload-code
			>
				<RocketSvg />
			</a>
			<a
				aria-label={`About`}
				href="/"
				class={cn('transition text-dark-forest-accent-yellow', {
					'text-dark-forest-accent-yellow': $theme === 'dark-forest',
					'text-dark-forest-unhighlighted': $game === 'playing'
				})}
			>
				<InfoSvg />
			</a>
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a
				aria-label={`Settings`}
				href=""
				class={cn('transition text-dark-forest-accent-green', {
					'text-dark-forest-accent-green': $theme === 'dark-forest',
					'text-dark-forest-unhighlighted': $game === 'playing'
				})}
				on:click={() => {
					if ($game === 'playing') return;
					updateModalContent('menu');
					updateModalVisibility();
				}}
			>
				<SettingsSvg />
			</a>
		</div>
	</div>

	<!-- User -->
	{#if $game != 'playing'}
		<div
			class={cn(`flex justify-between w-16 mb-1 text-dark-forest-credits`, {
				'text-dark-forest-credits': $theme === 'dark-forest',
				'text-cardboard-credits': $theme === 'cardboard'
			})}
		>
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
