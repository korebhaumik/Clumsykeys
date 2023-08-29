<script lang="ts">
	// export let isVisible: boolean;
	import NotifSvg from '$lib/assets/NotifSVG.svelte';
	import { fade, fly } from 'svelte/transition';
	import { createEventDispatcher, onMount } from 'svelte';
	import MenuSvg from '$lib/assets/MenuSVG.svelte';
	import RocketSvg from '$lib/assets/RocketSVG.svelte';
	import InfoSvg from '$lib/assets/InfoSVG.svelte';
	import SettingsSvg from '$lib/assets/SettingsSVG.svelte';
	import KeyboardSvg from '$lib/assets/KeyboardSVG.svelte';
	import { updateModalContent, updateModalVisibility } from './config.store';

	const dispatch = createEventDispatcher();
	let menuEl: HTMLDivElement;
	export let menuIsVisible: boolean;
	function handleClick(e: Event) {
		console.log(menuIsVisible);
		console.log(e.target);
		console.log(menuEl);
		if (!menuEl.contains(e.target as Node)) {
			// if (menuIsVisible !== true) return dispatch('CustomClickEvent', { menuIsVisible: true });
			dispatch('CustomClickEvent', { menuIsVisible: false });
		}
	}

	// onMount(() => {
	// 	// if (menuIsVisible === true) return;
	// 	// if (!menuEl.contains(e.target as Node))
	// 	document.addEventListener('click', handleClick);

	// 	return () => {
	// 		document.removeEventListener('click', handleClick);
	// 	};
	// });
</script>

<!-- {#if isVisible} -->
<!-- <svelte:body bind:this={menuEl} /> -->
<div
	bind:this={menuEl}
	class="w-fit py-5 shadow-md text-dark-forest-highlighted bg-dark-forest-primary border border-zinc-700/90 absolute h-fit right-0 top-[5.8rem] rounded-lg mx-5 px-5 z-20"
	transition:fly={{ duration: 400, y: -50, x: 50 }}
>
	<div class="inline-flex gap-3 items-center">
		<!-- <NotifSvg /> -->
		<!-- <MenuSvg /> -->
		<h1 class="mt-0.5">Menu Settings</h1>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<svg
			on:click={() => dispatch('CustomClickEvent', { menuIsVisible: false })}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-5 h-5 text-cardboard-accent-red"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
		</svg>
	</div>
	<div class="mt-3 text-dark-forest-unhighlighted">
		<a
			href="/"
			on:click={() => dispatch('CustomClickEvent', { isVisible: false })}
			class="inline-flex gap-3"
		>
			<KeyboardSvg />
			<span>Game</span>
		</a>
		<br />
		<a
			href="/leaderboards"
			on:click={() => dispatch('CustomClickEvent', { isVisible: false })}
			class="inline-flex gap-3"
		>
			<RocketSvg />
			<span>Leaderboards</span>
		</a>
		<br />
		<a
			href="/about"
			on:click={() => dispatch('CustomClickEvent', { isVisible: false })}
			class="inline-flex gap-3 mt-1 justify-between"
		>
			<InfoSvg />
			<span>About</span>
		</a>
		<br />
		<a
			href="/"
			on:click={() => {
                dispatch('CustomClickEvent', { MenuIsVisible: false });
                updateModalContent('menu');
				updateModalVisibility();
			}}
			class="inline-flex gap-3 mt-1 justify-between"
		>
			<SettingsSvg />
			<span>Settings</span>
		</a>
		<br />
		<!-- <div class="inline-flex gap-3 mt-1 justify-between">
			<NotifSvg />
			<span>Notifs</span>
		</div> -->
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
