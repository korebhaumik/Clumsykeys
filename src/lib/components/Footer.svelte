<script>
	import DiscordSvg from '../assets/DiscordSVG.svelte';
	import DocumentSvg from '../assets/DocumentSVG.svelte';
	import DollarSvg from '../assets/DollarSVG.svelte';
	import GithubSvg from '../assets/GithubSVG.svelte';
	import LockSvg from '../assets/LockSVG.svelte';
	import MailSvg from '../assets/MailSVG.svelte';
	import ShieldSvg from '../assets/ShieldSVG.svelte';
	import { theme, game,testStatus } from '$lib/components/store';
	import { page } from '$app/stores';

	const bgVar = {
		command: 'bg-dark-forest-command-bg'
	};
	const textVar = {
		unhighlighted: 'text-dark-forest-unhighlighted',
		highlighted: 'text-dark-forest-highlighted',
		'command-text': 'text-dark-forest-command-text',
		credits: `text-dark-forest-credits`
	};
	let opac = 'opacity-100';
	$: {
		if ($theme === 'dark-forest') {
			bgVar.command = 'bg-dark-forest-command-bg';
			textVar['command-text'] = 'text-dark-forest-command-text';
			textVar.credits = `text-dark-forest-credits`;
			textVar.highlighted = 'text-dark-forest-highlighted';
		}
		if ($theme === 'cardboard') {
			bgVar.command = 'bg-cardboard-command-bg';
			textVar['command-text'] = 'text-cardboard-command-text';
			textVar.credits = `text-dark-forest-credits`;
			textVar.highlighted = 'text-cardboard-highlighted';
		}
	}
	$: {
		if ($game === 'playing') opac = 'opacity-0';
		if ($game != 'playing') opac = 'opacity-100';
	}
</script>

<div
	class={`${
		$page.url.pathname == '/result' && $testStatus == 'valid' ? 'mb-10' : 'absolute'
	} mx-auto mt-10 bottom-10 w-fit big:w-full big:bottom-10 big:max-w-6xl big:mx-auto`}
>
	<!-- commands -->
	<div class="mb-5 text-sm sm:text-base">
		<!-- <TerminalSvg /> -->
		<div class="flex items-center text-sm">
			<div class="items-center hidden sm:flex">
				<p class="font-medium">
					<span
						class={`inline-block px-3 py-1 rounded ${bgVar.command} ${textVar['command-text']} w-fit`}
						>tab</span
					>
					+
					<span
						class={`inline-block px-3 py-1 rounded ${bgVar.command} ${textVar['command-text']} w-fit`}
						>enter</span
					>
				</p>
				<li class={`ml-3 ${textVar.credits}`}>Restart Test</li>
			</div>
			<div class={`flex items-center sm:ml-10 ${opac}`}>
				<p class="font-medium">
					<span
						class={`inline-block px-3 py-1 rounded ${bgVar.command} ${textVar['command-text']} w-fit`}
						>cmd</span
					>
					+
					<span
						class={`px-3 py-1 ${bgVar.command} ${textVar['command-text']} w-fit inline-block rounded`}
						>k</span
					>
				</p>
				<li class={`ml-3 ${textVar.credits}`}>Settings Menu</li>
			</div>
		</div>
	</div>
	<!-- credits -->

	<div class={`flex items-center ${textVar.credits} ${opac} justify-between w-fit big:w-auto`}>
		<div class={`flex w-80 md:w-[40rem] flex-wrap justify-between font-semibold`}>
			<button class="flex items-center transition cursor-pointer hover:text-cardboard-900">
				<MailSvg />
				<span class="ml-1.5 text-xs">Contact</span>
			</button>
			<div class="flex items-center">
				<GithubSvg />
				<span class="ml-1.5 text-xs">Github</span>
			</div>
			<div class="items-center hidden md:flex">
				<DiscordSvg />
				<span class="ml-1.5 text-xs">Discord</span>
			</div>
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
				class="text-amber-700 hover:underline"
				href="https://google.com"
				target="_blank">@korebhaumik</a
			>
		</p>
	</div>
</div>
