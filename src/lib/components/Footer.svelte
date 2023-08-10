<script lang="ts">
	import DiscordSvg from '../assets/DiscordSVG.svelte';
	import DocumentSvg from '../assets/DocumentSVG.svelte';
	import DollarSvg from '../assets/DollarSVG.svelte';
	import GithubSvg from '../assets/GithubSVG.svelte';
	import LockSvg from '../assets/LockSVG.svelte';
	import MailSvg from '../assets/MailSVG.svelte';
	import ShieldSvg from '../assets/ShieldSVG.svelte';
	import { theme, game, testStatus } from '$lib/components/store';
	import { page } from '$app/stores';
	import { contentHeight } from '$lib/components/store';

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
	// const arr
	import { footerEl, footerTop } from '$lib/components/store';
	import { onMount } from 'svelte';
	// let footerEl: HTMLElement;
	$: {
		if ($footerEl.offsetTop) {
			// console.log($footerEl.offsetTop);
			footerTop.set($footerEl.offsetTop);
		}
		// console.log(height)
	}

	let footerHeight = 0;
	let innerWidth = 0;
	let innerHeight = 0;
	let outerHeight = 0;
	// const contentHeight = 0;
	let bodyHeight;

	// onMount(() => {
	// 	console.log($contentHeight);
	// 	!($contentHeight > innerHeight - footerHeight - 100)
	// 		? ($footerEl.style.position = 'absolute')
	// 		: ($footerEl.style.position = 'relative');
	// });
	$: bool = $contentHeight > innerHeight - footerHeight;
	// $: contentHeight > innerHeight - footerHeight? $footerEl.className = 'absolute': $footerEl.className = 'relative';
	// console.log(bool);
</script>

<!-- $page.url.pathname == '/result' && $testStatus == 'valid' -->
<svelte:window bind:innerWidth bind:innerHeight />
<svelte:body bind:offsetHeight={bodyHeight} />
<!-- <h1>{innerHeight}</h1>
<h1>{bool}</h1>
<h1>{footerHeight}</h1> -->
<div
	class={`${''} mx-auto mt-10 bottom-10 w-fit big:w-full big:bottom-10 big:max-w-6xl big:mx-auto`}
	bind:this={$footerEl}
	bind:offsetHeight={footerHeight}
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
			<a
				href="mailto:bhaumik.kore31@gmail.com"
				class="flex items-center transition cursor-pointer hover:text-cardboard-900"
			>
				<MailSvg />
				<span class="ml-1.5 text-xs">Contact</span>
			</a>
			<a href="http://github.com/korebhaumik/Clumsykeys" target="_blank" class="flex items-center">
				<GithubSvg />
				<span class="ml-1.5 text-xs">Github</span>
			</a>
			<a href="http://discord.gg" target="_blank" class="items-center hidden md:flex">
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
				class="text-amber-700 hover:underline"
				href="http://github.com/korebhaumik"
				target="_blank">@korebhaumik</a
			>
		</p>
	</div>
</div>
