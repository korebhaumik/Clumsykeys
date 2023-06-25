<script lang="ts">
	import '../app.css';
	import Footer from '../lib/components/Footer.svelte';
	import Header from '../lib/components/Header.svelte';
	import Modal from '../lib/components/Modal.svelte';
	import { updateModalContent, updateModalVisibility } from '$lib/components/store';
	import { theme } from '$lib/components/store';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	onMount(() => {
		document.addEventListener('keydown', (e) => {
			if (e.key === 'k' && e.metaKey === true) {
				updateModalContent('menu');
				updateModalVisibility();
			}
			if (e.key === 'Escape') {
				updateModalVisibility(false);
			}
		});
		// document.body.style.backgroundColor = '#EDEBE3';
	});
	let k = '';
	let c: string | null = '';
	if (browser) {
		c = sessionStorage.getItem('theme');
		//@ts-ignore
		theme.update((t) => (t = c));
	}
	$: {
		// $theme
		if ($theme === 'cardboard') {
			k = 'bg-cardboard-primary';
			if (browser) {
				document.body.style.backgroundColor = '#EDEBE3';
				sessionStorage.setItem('theme', 'cardboard');
			}
		}
		if ($theme === 'dark-forest') {
			k = 'bg-dark-forest-primary';
			if (browser) {
				document.body.style.backgroundColor = '#151B1D';
				sessionStorage.setItem('theme', 'dark-forest');
			}
		}
		console.log(k);
	}
</script>

<!-- <header /> -->
<!-- <section class="mx-5 sm:mx-10 mt-10 big:max-w-6xl big:mx-auto"> -->
{#if browser}
	<section class="px-5 py-0 big:px-0 mt-10 big:max-w-6xl big:mx-auto">
		<Header />
		<slot />
		<Footer />
	</section>
	<Modal />
{/if}

<!-- <body class={sessionStorage.getItem('theme') ? k : ''} /> -->
<body class={k} data-content={$theme} />

<style lang="postcss">
	/* @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap'); */
	:global(:root) {
		/* background-color: theme('colors.cardboard.100'); */
		font-family: 'Comfortaa', sans-serif;
		font-weight: theme('fontWeight.medium');
		letter-spacing: 0.2px;
	}
	body {
		/* transition: ease-in-out 0.15s; */
	}
	/* [data-content='cardboard'] {
		background: #963131;
	} */
	/* [data-content='dark-forest'] {
		background-color: #1788ae;
	} */
</style>
