<script lang="ts">
	import DiscordSvg from '../assets/DiscordSVG.svelte';
	import DocumentSvg from '../assets/DocumentSVG.svelte';
	import DollarSvg from '../assets/DollarSVG.svelte';
	import GithubSvg from '../assets/GithubSVG.svelte';
	import LockSvg from '../assets/LockSVG.svelte';
	import MailSvg from '../assets/MailSVG.svelte';
	import ShieldSvg from '../assets/ShieldSVG.svelte';
	import { theme } from '$lib/components/fun.store';
	import { game } from '$lib/components/game.store';
	import { footerEl } from '$lib/components/fun.store';
	import cn from '$lib/utils';

	let footerHeight = 0;
	let innerWidth = 0;
	let innerHeight = 0;
</script>

<svelte:window bind:innerWidth bind:innerHeight />
<div
	class="mx-auto px-5 big:px-0 mt-10 bottom-5 sm:bottom-7 w-full big:w-full big:bottom-10 big:max-w-6xl big:mx-auto"
	bind:this={$footerEl}
	bind:offsetHeight={footerHeight}
>
	<!-- commands -->
	<div class="mb-5 text-sm sm:text-base">
		<!-- <TerminalSvg /> -->
		<div class="flex items-center text-sm">
			<div class="items-center hidden sm:flex">
				<p>
					<span
						class={cn(
							`inline-block px-3 py-1 rounded bg-dark-forest-command-bg text-dark-forest-command-text w-fit`,
							{
								'bg-dark-forest-command-bg': $theme === 'dark-forest',
								'bg-cardboard-command-bg': $theme === 'cardboard',
								'text-dark-forest-command-text': $theme === 'dark-forest',
								'text-cardboard-command-text': $theme === 'cardboard'
							}
						)}>tab</span
					>
					<span
						class={cn('font-medium mx-1 text-lg text-dark-forest-unhighlighted ', {
							'text-dark-forest-unhighlighted': $theme === 'dark-forest'
						})}>+</span
					>
					<span
						class={cn(
							`inline-block px-3 py-1 rounded bg-dark-forest-command-bg text-dark-forest-command-text w-fit`,
							{
								'bg-dark-forest-command-bg': $theme === 'dark-forest',
								'bg-cardboard-command-bg': $theme === 'cardboard',
								'text-dark-forest-command-text': $theme === 'dark-forest',
								'text-cardboard-command-text': $theme === 'cardboard'
							}
						)}>enter</span
					>
				</p>
				<span
					class={cn(`ml-3 text-dark-forest-credits `, {
						'text-dark-forest-credits': $theme === 'dark-forest',
						'text-cardboard-credits': $theme === 'cardboard'
					})}
				>
					Restart Test
				</span>
			</div>
			<div
				class={cn(`flex items-center sm:ml-10 opacity-100`, {
					'opacity-0': $game === 'playing'
				})}
			>
				<p class="font-medium">
					<span
						class={cn(
							`inline-block px-3 py-1 bg-dark-forest-command-bg text-dark-forest-command-text rounded w-fit`,
							{
								'bg-dark-forest-command-bg': $theme === 'dark-forest',
								'bg-cardboard-command-bg': $theme === 'cardboard',
								'text-dark-forest-command-text': $theme === 'dark-forest',
								'text-cardboard-command-text': $theme === 'cardboard'
							}
						)}>cmd</span
					>
					<span
						class={cn('font-medium mx-1 text-lg text-dark-forest-unhighlighted', {
							'text-dark-forest-unhighlighted': $theme === 'dark-forest'
						})}>+</span
					>

					<span
						class={cn(
							`px-3 py-1 bg-dark-forest-command-bg text-dark-forest-command-text w-fit inline-block rounded`,
							{
								'bg-dark-forest-command-bg': $theme === 'dark-forest',
								'bg-cardboard-command-bg': $theme === 'cardboard',
								'text-dark-forest-command-text': $theme === 'dark-forest',
								'text-cardboard-command-text': $theme === 'cardboard'
							}
						)}>k</span
					>
				</p>
				<span
					class={cn(`ml-3 text-dark-forest-credits `, {
						'text-dark-forest-credits': $theme === 'dark-forest',
						'text-cardboard-credits': $theme === 'cardboard'
					})}
				>
					Settings Menu
				</span>
			</div>
		</div>
	</div>
	<!-- credits -->
	<div
		class={cn(
			`flex items-center opacity-100 justify-between w-fit big:w-auto text-dark-forest-credits`,
			{
				'text-dark-forest-credits': $theme === 'dark-forest',
				'text-cardboard-credits': $theme === 'cardboard',
				'opacity-0': $game === 'playing'
			}
		)}
	>
		<div class={`flex w-80 md:w-[40rem] flex-wrap justify-between font-semibold`}>
			<a
				aria-label="Contact"
				href="mailto:bhaumik.kore31@gmail.com"
				class="flex items-center transition cursor-pointer hover:text-cardboard-900"
			>
				<MailSvg />
				<span class="ml-1.5 text-xs">Contact</span>
			</a>
			<a
				aria-label={`Github`}
				href="http://github.com/korebhaumik/Clumsykeys"
				target="_blank"
				class="flex items-center"
			>
				<GithubSvg />
				<span class="ml-1.5 text-xs">Github</span>
			</a>
			<a
				aria-label={`Discord`}
				href="http://discord.gg"
				target="_blank"
				class="items-center hidden md:flex"
			>
				<DiscordSvg />
				<span class="ml-1.5 text-xs">Discord</span>
			</a>
			<div class="items-center hidden md:flex">
				<ShieldSvg />
				<span class="ml-1.5 text-xs">Security</span>
			</div>
			<div class="items-center hidden md:flex">
				<DocumentSvg />
				<span class="ml-1.5 text-xs">Terms</span>
			</div>
			<div class="items-center hidden md:flex">
				<LockSvg />
				<span class="ml-1.5 text-xs">Privacy</span>
			</div>
			<div class="flex items-center">
				<DollarSvg />
				<span class="ml-1.5 text-xs">Support</span>
			</div>
		</div>
		<p class="hidden text-xs big:block">
			developed by <a
				aria-label={`Kore Bhaumik`}
				class="text-amber-700 hover:underline"
				href="http://github.com/korebhaumik"
				target="_blank">@korebhaumik</a
			>
		</p>
	</div>
</div>
