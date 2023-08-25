<script lang="ts">
	import '../app.css';
	import Footer from '../lib/components/Footer.svelte';
	import Header from '../lib/components/Header.svelte';
	import Modal from '../lib/components/Modal.svelte';
	import { updateModalContent, updateModalVisibility } from '$lib/components/config.store';
	import { theme } from '$lib/components/fun.store';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { invalidate } from '$app/navigation';
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
	}
	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
	// console.log(session)
</script>

{#if browser}
	<section class="px-5 py-0 big:px-0 mt-10 big:max-w-6xl big:mx-auto">
		<Header {supabase} {session}/>
		<slot />
		<Footer />
	</section>
	<Modal />
{/if}

<body class={k} data-content={$theme} />

<style lang="postcss">
	:global(:root) {
		font-family: 'Comfortaa', sans-serif;
		font-weight: theme('fontWeight.medium');
		letter-spacing: 0.2px;
	}
</style>
