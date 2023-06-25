<script lang="ts">
	// export let isVisible: boolean;
	import NotifSvg from '$lib/assets/NotifSVG.svelte';
	import { fade, fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	const notifs = [
		{
			type: 'info',
			message: 'Engine version: 1.0, Node-version: 20.2.0,'
		},
		{
			type: 'warning',
			message: 'Warning: Accuracy is static 100%, todo new formula.'
		},
		{
			type: 'warning',
			message: 'Warning: Unwanted unchecked listners due to chrome extensions.'
		},
		{
			type: 'error',
			message: 'Bug #4 space and backspace glitch on mobile'
		},
		{
			type: 'error',
			message: 'Bug #12 Result not rendering'
		},
		{
			type: 'info',
			message: 'New feature: Frost theme'
		},
		{
			type: 'info',
			message: 'New feature: Mobile support'
		},
		{
			type: 'error',
			message: 'Bug #13 Accuracy glitch above 130wpm'
		},
		{
			type: 'error',
			message: 'Bug #14 Wpm glitch by space abuse '
		},
		{
			type: 'warning',
			message: 'Warning: Customevents interface is not yet implemented.'
		},
		{
			type: 'warning',
			message: 'Warning: Harden ts for engine.'
		},
		{
			type: 'error',
			message: 'Bug #21 Caret animation lag on safari.'
		},
		{
			type: 'info',
			message: 'New feature: Implement new wala auth'
		},
		{
			type: 'warning',
			message: 'Warinig: reduce memory footprint.'
		}
	];
</script>

<!-- {#if isVisible} -->
<div
	class="w-80 bg-dark-forest-primary text-dark-forest-highlighted absolute h-screen right-0 top-0 px-5 z-20"
	transition:fly={{ duration: 400, x: 200 }}
>
	<div class="flex mt-10">
		<NotifSvg />
		<h1 class="ml-2">Notifications</h1>
	</div>
	<div class="mt-3 overflow-scroll h-[83%]">
		{#each notifs as notif}
			<div class="flex relative h-fit ml-2 mb-2">
				{#if notif.type === 'info'}
					<div class="absolute h-full w-1 rounded border-none block bg-dark-forest-accent-main" />
				{:else if notif.type === 'warning'}
					<div class="absolute h-full w-1 rounded border-none block bg-dark-forest-accent-yellow" />
				{:else if notif.type === 'error'}
					<div class="absolute h-full w-1 rounded border-none block bg-dark-forest-accent-error" />
				{:else}
					<div class="absolute h-full w-1 rounded border-none block bg-dark-forest-accent-main" />
				{/if}
				<p class="text-sm py-1 ml-4">{notif.message}</p>
			</div>
		{/each}
	</div>
</div>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="w-screen opacity-30 bg-black absolute h-screen right-0 top-0 z-10"
	on:click={() => {
		dispatch('CustomClickEvent', { isVisible: false });
		// isVisible = false;
	}}
	transition:fade={{ duration: 200 }}
/>
<!-- {/if} -->
