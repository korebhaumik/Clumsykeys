<script lang="ts">
	import GithubSvg from '$lib/assets/GithubSVG.svelte';
	import GoogleSvg from '$lib/assets/GoogleSVG.svelte';
	import JESUS from '$lib/assets/jesus.webp';
	import StarSVG from '$lib/assets/StarSVG.svelte';
	import { contentHeight, footerEl, theme } from '$lib/components/fun.store';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	export let supabase: SupabaseClient;
	import toast, { Toaster } from 'svelte-french-toast';
	// let { supabase } = data;
	$: supabase = supabase;
	let inputVal: string = '';
	const handleKeyboardSumbit = async (e: KeyboardEvent) => {
		if (e.key !== 'Enter') return;
		await handleSumbit();
	};
	const handleSumbit = async () => {
		toast.error('Service is down : (\n Use your GitHub or Google login.', {
			style:
				'font-size: 14px; color: black; background-color: #DADADA; border: 2px solid rgba(169, 84, 6, 1); border-radius: 10px',
			iconTheme: {
				primary: 'rgba(169, 84, 6, 1)',
				secondary: 'white'
			}
		});

		// await supabase.auth.signInWithOtp({
		// 	email: inputVal,
		// 	options: {
		// 		data: { hello: 'world' },
		// 		// emailRedirectTo: `${location.origin}/auth/callback`,
		// 		emailRedirectTo: `${location.origin}/login`
		// 	}
		// });

		inputVal = '';
	};
	const handleGithubSignIn = async () => {
		toast.loading('Signing in with Github...', {
			style:
				'font-size: 14px; color: black; background-color: #DADADA; border: 2px solid rgba(112, 200, 143, 1); border-radius: 10px',
			iconTheme: {
				primary: 'rgba(112, 200, 143, 1)',
				secondary: 'rgba(112, 200, 143, 0.2)'
			}
		});
		// toast.loading('Signing in with Github...', {
		// 	style:
		// 		'font-size: 14px; color: #f7f7f7; background-color: black; border: 1px solid rgba(155, 205, 134, 0.8)',
		// 	iconTheme: {
		// 		primary: 'rgba(155, 205, 134, 1)',
		// 		secondary: 'rgba(155, 205, 134, 0.3)'
		// 	}
		// });
		await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: `${location.origin}/callback`
			}
		});
	};
	const handleGoogleSignIn = async () => {
		toast.loading('Signing in with Google...', {
			style:
				'font-size: 14px; color: black; background-color: #DADADA; border: 2px solid rgba(112, 200, 143, 1); border-radius: 10px',
			iconTheme: {
				primary: 'rgba(112, 200, 143, 1)',
				secondary: 'rgba(112, 200, 143, 0.2)'
			}
		});
		await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${location.origin}/callback`,
			}
		});
	};
	onMount(() => {
		contentHeight.set(0);
		!($contentHeight > innerHeight - 60 - 100)
			? ($footerEl.style.position = 'absolute')
			: ($footerEl.style.position = 'relative');
	});

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
	}
</script>

<Toaster />
<section
	class={` ${textVar.highlighted} absolute top-[calc(50%-3%)] flex flex-wrap items-center -translate-y-1/2 w-[calc(100%-10%)] max-w-6xl justify-between`}
	in:fade={{ delay: 400, duration: 150 }}
>
	<div class="w-[21rem] sm:w-[23rem]">
		<h1 class="text-xl">Welcome back</h1>
		<h2 class={`${textVar.unhighlighted}`}>Enter your email to sign into your account</h2>

		<input
			bind:value={inputVal}
			on:keydown={handleKeyboardSumbit}
			type="email"
			placeholder="name@provider.com"
			class="w-full px-4 py-3 mt-5 text-sm border rounded bg-inherit border-cardboard-500"
		/>
		<button
			on:click={handleSumbit}
			class={`w-full py-3 mt-3 text-sm rounded ${bgVar.highlighted} text-black `}
			>Sign in with Email</button
		>
		<div class=" mt-3 flex items-center">
			<p class=" min-w-max">Or Continue With</p>
			<hr class="w-full ml-2 border-cardboard-500" />
		</div>
		<button
		on:click={handleGoogleSignIn}
			class="w-full py-3 mt-3 text-sm border rounded border-cardboard-500 text-cardboard-900 flex justify-center items-center"
		>
			<GoogleSvg size="sm" />
			<span class="ml-1">Google</span>
		</button>
		<button
			on:click={handleGithubSignIn}
			class="w-full py-3 mt-3 text-sm border rounded border-cardboard-500 text-cardboard-900 flex justify-center items-center"
		>
			<GithubSvg />
			<span class="ml-1">GitHub</span>
		</button>
	</div>
	<div
		class="h-full relative bg-black w-[37rem] border border-dark-forest-unhighlighted/50 px-20 pr-16 py-12 pb-8 rounded-lg mt-2"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="24"
			viewBox="0 -960 960 960"
			width="24"
			class="w-16 h-16 absolute top-5 left-10 text-white/20 rotate-180"
			><path
				d="M687-280q-30 0-46-25.5t-2-52.5l41-82h-80q-33 0-56.5-23.5T520-520v-120q0-33 23.5-56.5T600-720h120q33 0 56.5 23.5T800-640v181q0 9-1.5 18.5T792-423l-57 113q-7 14-20 22t-28 8Zm-360 0q-30 0-46-25.5t-2-52.5l41-82h-80q-33 0-56.5-23.5T160-520v-120q0-33 23.5-56.5T240-720h120q33 0 56.5 23.5T440-640v181q0 9-1.5 18.5T432-423l-57 113q-7 14-20 22t-28 8Z"
				fill="currentColor"
			/></svg
		>
		<p class="text-lg leading-relaxed tracking-wide">
			Tried <span class="text-dark-forest-accent-main underline underline-offset-2 tracking-wide"
				>@clumsykeys</span
			> for the first time yesterday. Amazing! I was able to learn touch-typing in no time and their
			support for different langs helped a lot! 👏 Can't wait for the "Bible" practice mode to arrive!
			All true children of god should definitely try clumsykeys...
		</p>
		<div class="flex items-center mt-2">
			<img
				class="h-11 w-8 object-cover object-center rounded-full border border-orange-200"
				src={JESUS}
				alt="jesus_image"
			/>
			<div class="ml-3">
				<div class="flex">
					<span
						class="text-white text-opacity-50 text-sm font-medium leading-normal tracking-tight"
					>
						@jesusOfficial
					</span>
					<svg
						class="ml-1"
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M0.875 10C0.875 5.5125 4.5125 1.875 9 1.875C13.4875 1.875 17.125 5.5125 17.125 10C17.125 14.4875 13.4875 18.125 9 18.125C4.5125 18.125 0.875 14.4875 0.875 10ZM12.0083 8.48833C12.0583 8.42171 12.0945 8.34576 12.1147 8.26496C12.135 8.18415 12.1388 8.10012 12.1261 8.0178C12.1134 7.93547 12.0844 7.85652 12.0407 7.78558C11.9971 7.71464 11.9396 7.65315 11.8719 7.60471C11.8041 7.55627 11.7273 7.52187 11.6461 7.50352C11.5648 7.48518 11.4807 7.48326 11.3987 7.49789C11.3167 7.51251 11.2385 7.54338 11.1686 7.58868C11.0987 7.63398 11.0385 7.69279 10.9917 7.76167L8.295 11.5367L6.94167 10.1833C6.82319 10.0729 6.66648 10.0128 6.50456 10.0157C6.34265 10.0185 6.18816 10.0841 6.07365 10.1986C5.95914 10.3132 5.89354 10.4676 5.89069 10.6296C5.88783 10.7915 5.94793 10.9482 6.05833 11.0667L7.93333 12.9417C7.99749 13.0058 8.07483 13.0552 8.15999 13.0864C8.24515 13.1176 8.33608 13.1299 8.42647 13.1224C8.51686 13.115 8.60455 13.088 8.68344 13.0432C8.76233 12.9985 8.83054 12.9371 8.88333 12.8633L12.0083 8.48833Z"
							fill="#0179D0"
						/>
					</svg>
				</div>
				<span class="flex">
					<StarSVG />
					<StarSVG />
					<StarSVG />
					<StarSVG />
					<StarSVG />
				</span>
			</div>
		</div>
	</div>
</section>

<!-- src="https://s3-alpha-sig.figma.com/img/9dbd/f79f/c6ab96327a82e57511e92a5f67831250?Expires=1693785600&Signature=h6yfM-qt2rqJqe6ckI4K3GpxsYveXPFiD21~mqhOdzYD6tJS7u8qK4RqDlauqHtydhM-sFYeVgI28IoI~CjS4Ov1LbBDXEaRdRCSYglLiOQDlPXMMmDEQXFkFIxS9UQG9t4UoMwP~Oh~7j4h-gMsjRyJqUMml08WWfk5ACpYIKUp5r-U-qG6V6czsXqJAbJmRa3PnJ4~EBNhLvP-icGibd4QSrouvO~hgJHuQUl-HpxyyTJd5aRK0vXkMKqou5klbmesuWb3-fkOkU8vk0ZZW27fRttuLUEQ6AO0OmtL0Yvcv606tuVQc2ngxVRD8mAi~RpbRGDR9Ui5CQmHZpmJIA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" -->
