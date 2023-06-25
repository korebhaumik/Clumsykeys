<script>
	import GithubSvg from '$lib/assets/GithubSVG.svelte';
	import GoogleSvg from '$lib/assets/GoogleSVG.svelte';
	import img from '$lib/assets/login_monkey.png';
	import { theme } from '$lib/components/store';
	import { fade } from 'svelte/transition';

	const textVar = {
		highlighted: 'text-dark-forest-highlighted',
		['accent-main']: 'text-dark-forest-accent-main',
		unhighlighted: 'text-dark-forest-unhighlighted',
		['accent-error']: 'text-dark-forest-accent-error'
	};

	const bgVar = {
		['accent-error']: 'bg-dark-forest-accent-error',
		unhighlighted: 'bg-dark-forest-unhighlighted',
		highlighted: 'bg-dark-forest-highlighted',
		['accent-main']: 'bg-dark-forest-accent-main'
	};

	$: {
		if ($theme === 'cardboard') {
			textVar['accent-error'] = 'text-cardboard-accent-error';
			textVar.highlighted = 'text-cardboard-highlighted';
			textVar.unhighlighted = 'text-cardboard-unhighlighted';
			textVar['accent-main'] = 'text-cardboard-accent-main';
			bgVar['accent-error'] = 'bg-cardboard-accent-error';
			bgVar.highlighted = 'bg-cardboard-highlighted';
			bgVar.unhighlighted = 'bg-cardboard-unhighlighted';
			bgVar['accent-main'] = 'bg-cardboard-accent-main';

			// if (browser) document.body.style.backgroundColor = '#EDEBE3';
		}

		if ($theme === 'dark-forest') {
			textVar['accent-error'] = 'text-dark-forest-accent-error';
			textVar.highlighted = 'text-dark-forest-highlighted';
			textVar.unhighlighted = 'text-dark-forest-unhighlighted';
			textVar['accent-main'] = 'text-dark-forest-accent-main';
			bgVar['accent-error'] = 'bg-dark-forest-accent-error';
			bgVar.highlighted = 'bg-dark-forest-highlighted';
			bgVar.unhighlighted = 'bg-dark-forest-unhighlighted';
			bgVar['accent-main'] = 'bg-dark-forest-accent-main';
			// if (browser) document.body.style.backgroundColor = 'black';
		}
		// console.log(k);
	}
</script>

<!-- <section class={` ${textVar.highlighted} text-center absolute top-[calc(50%-3%)] -translate-y-1/2 left-1/2 -translate-x-1/2 sm:w-[23rem]`}> -->
<section
	class={` ${textVar.highlighted} absolute top-[calc(50%-3%)] -translate-y-1/2 sm:w-[23rem]`}
	in:fade={{ delay: 300 }}
>
	<h1 class="text-xl">Welcome back</h1>
	<h2 class={`${textVar.unhighlighted}`}>Enter your email to sign into your account</h2>

	<input
		type="email"
		placeholder="name@provider.com"
		class="w-full px-4 py-3 mt-5 text-sm border rounded bg-inherit border-cardboard-500"
	/>
	<button class={`w-full py-3 mt-3 text-sm rounded ${bgVar.highlighted} text-black `}
		>Sign in with Email</button
	>
	<div class=" mt-3 flex items-center">
		<p class=" min-w-max">Or Continue With</p>
		<hr class="w-full ml-2 border-cardboard-500" />
	</div>
	<button
		class="w-full py-3 mt-3 text-sm border rounded border-cardboard-500 text-cardboard-900 flex justify-center items-center"
	>
		<GoogleSvg size="sm" />
		<span class="ml-1">Google</span>
	</button>
	<button
		class="w-full py-3 mt-3 text-sm border rounded border-cardboard-500 text-cardboard-900 flex justify-center items-center"
	>
		<GithubSvg />
		<span class="ml-1">GitHub</span>
	</button>
</section>
<!-- <hr class=""> -->
<!-- <img src={img} class="h-96 absolute left-1/2" alt=""> -->
