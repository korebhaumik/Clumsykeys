<script lang="ts">
	export let isVisible: boolean;
	import NotifSvg from '$lib/assets/NotifSVG.svelte';
	import { fade, fly } from 'svelte/transition';
</script>

<!-- {#if isVisible} -->
<div
	class="w-80 bg-cardboard-100 absolute h-screen right-0 top-0 px-5 z-20"
	transition:fly={{ duration: 400, x: 200 }}
>
	<div class="flex mt-10">
		<NotifSvg />
		<h1 class="ml-2">Notifications</h1>
	</div>
    <p class="text-sm mt-3">You have no active notifications.</p>
</div>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="w-screen opacity-30 bg-black absolute h-screen right-0 top-0 z-10"
	on:click={() => {
		isVisible = false;
	}}
	transition:fade={{ duration: 200 }}
/>
<!-- {/if} -->
