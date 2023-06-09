<script>
	import DiscordSvg from '../assets/DiscordSVG.svelte';
	import DocumentSvg from '../assets/DocumentSVG.svelte';
	import DollarSvg from '../assets/DollarSVG.svelte';
	import GithubSvg from '../assets/GithubSVG.svelte';
	import LockSvg from '../assets/LockSVG.svelte';
	import MailSvg from '../assets/MailSVG.svelte';
	import ShieldSvg from '../assets/ShieldSVG.svelte';
	import TerminalSvg from '../assets/TerminalSVG.svelte';
</script>

<div class="absolute bottom-10 left-10 right-10">
	<!-- commands -->
	<div class="mb-3 text-sm sm:text-base">
		<!-- <TerminalSvg /> -->
		<div class="flex items-center text-sm">
			<div class="items-center hidden sm:flex">
				<p class="font-bold">
					<span class="inline-block p-2 rounded bg-zinc-900 text-zinc-100 w-fit">tab</span> +
					<span class="inline-block p-2 rounded bg-zinc-900 text-zinc-100 w-fit">enter</span>
				</p>
				<li class="ml-3">Restart Test</li>
			</div>
			<div class="flex items-center sm:ml-10">
				<p class="font-bold">
					<span class="inline-block p-2 rounded bg-zinc-900 text-zinc-100 w-fit">cmd</span> +
					<span class="p-2 px-3.5 bg-zinc-900 text-zinc-100 w-fit inline-block rounded">k</span>
				</p>
				<li class="ml-3">Settings Menu</li>
			</div>
		</div>
	</div>
	<!-- credits -->
	<div class="flex items-center justify-between">
		<div class="flex w-80 md:w-[40rem] flex-wrap justify-between font-semibold">
			<div class="flex items-center">
				<MailSvg />
				<span class="ml-1.5 text-xs">Contact</span>
			</div>
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
			<div class="items-center hidden md:flex ">
				<LockSvg />
				<span class="ml-1.5 text-xs">Privacy</span>
			</div>
			<div class="flex items-center">
				<DollarSvg />
				<span class="ml-1.5 text-xs">Support</span>
			</div>
		</div>
		<p class="hidden text-xs sm:inline">developed by <span class="text-amber-700">@korebhaumik</span></p>
	</div>
</div>
