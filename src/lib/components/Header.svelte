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
	import type { Session, SupabaseClient } from '@supabase/supabase-js';
	import { goto, invalidate } from '$app/navigation';

	$: isVisible = false;

	export let supabase: SupabaseClient;
	export let session: Session | null;
	function handleEvent(e: any) {
		isVisible = !isVisible;
		// console.log(e);
	}
	function reloadPage() {
		const thisPage = window.location.pathname;

		// console.log('goto ' + thisPage);

		goto('/').then(() => goto(thisPage));
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
		<div class="justify-between hidden ml-7 mb-1 sm:flex w-44">
			<a
				aria-label={`Game`}
				href="/"
				class={cn('transition px-2  text-dark-forest-accent-red', {
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
				class={cn('transition px-2 text-dark-forest-accent-purple', {
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
				class={cn('transition px-2 text-dark-forest-accent-yellow', {
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
				class={cn('transition px-2 rounded text-dark-forest-accent-green', {
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
			class={cn(`flex mb-1 items-center text-dark-forest-credits`, {
				'text-dark-forest-credits': $theme === 'dark-forest',
				'text-cardboard-credits': $theme === 'cardboard'
			})}
		>
			<!-- <a href="/login" class="text-xs px-2 py-1 border rounded-lg bg-dark-forest-accent-main text-black">Logout</a> -->
			{#if session}
				<button
					on:click={async() => {
						await supabase.auth.signOut();
						await invalidate('supabase:auth');
						goto('/');
						// reloadPage();
					}}
					class="text-dark-forest-accent-error mr-3.5"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="48"
						height="48"
						viewBox="0 0 48 48"
						fill="none"
						class="h-6 w-6"
					>
						<path
							d="M9 42C8.2 42 7.5 41.7 6.9 41.1C6.3 40.5 6 39.8 6 39V9C6 8.2 6.3 7.5 6.9 6.9C7.5 6.3 8.2 6 9 6H22.45C22.875 6 23.2313 6.14458 23.5188 6.43375C23.8063 6.72295 23.95 7.08128 23.95 7.50875C23.95 7.93625 23.8063 8.29167 23.5188 8.575C23.2313 8.85833 22.875 9 22.45 9H9V39H22.45C22.875 39 23.2313 39.1446 23.5188 39.4337C23.8063 39.7229 23.95 40.0813 23.95 40.5087C23.95 40.9362 23.8063 41.2917 23.5188 41.575C23.2313 41.8583 22.875 42 22.45 42H9ZM36.25 25.5H19.5C19.075 25.5 18.7188 25.3554 18.4313 25.0663C18.1438 24.7771 18 24.4187 18 23.9913C18 23.5638 18.1438 23.2083 18.4313 22.925C18.7188 22.6417 19.075 22.5 19.5 22.5H36.15L32.1 18.45C31.8 18.15 31.6583 17.8 31.675 17.4C31.6917 17 31.85 16.65 32.15 16.35C32.45 16.05 32.8083 15.9 33.225 15.9C33.6417 15.9 34 16.05 34.3 16.35L40.95 23C41.25 23.3 41.4 23.65 41.4 24.05C41.4 24.45 41.25 24.8 40.95 25.1L34.35 31.7C34.0567 32 33.7083 32.1417 33.305 32.125C32.9017 32.1083 32.5435 31.95 32.2305 31.65C31.9435 31.35 31.8 30.9917 31.8 30.575C31.8 30.1583 31.95 29.8 32.25 29.5L36.25 25.5Z"
							fill="currentColor"
						/>
					</svg></button
				>
			{/if}
			<a href="/login" class="mr-3.5">
				<UserSvg />
			</a>
			<button
				on:click={() => {
					isVisible = !isVisible;
				}}
			>
				<NotifSvg />
			</button>
		</div>
	{/if}
	{#if isVisible}
		<Sidebar on:CustomClickEvent={handleEvent} />
	{/if}
</header>
