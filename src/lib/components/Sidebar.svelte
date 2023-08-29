<script lang="ts">
	// export let isVisible: boolean;
	import NotifSvg from '$lib/assets/NotifSVG.svelte';
	import { fade, fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	const notifs = [
		{
			type: 'info',
			message: 'Engine version: 1.4, Node-version: 20.2.0,'
		},
		{
			type: 'warning',
			message: 'Warning: Unwanted unchecked listners due to chrome extensions.'
		},
		{
			type: 'info',
			message: 'New feature: Frost theme'
		},
	];
</script>

<!-- {#if isVisible} -->
<div
	class="w-80 text-dark-forest-highlighted bg-dark-forest-primary border-l border-l-zinc-700/90 absolute h-screen right-0 top-0 px-5 z-20"
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
