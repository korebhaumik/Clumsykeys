<script>
	import GithubSvg from '$lib/assets/GithubSVG.svelte';
	import GoogleSvg from '$lib/assets/GoogleSVG.svelte';
	import img from '$lib/assets/login_monkey.png';
</script>

<!-- <section class=" absolute top-[calc(50%-3%)] -translate-y-1/2 left-1/2 -translate-x-1/2 sm:w-[23rem]"> -->
<section class=" absolute top-[calc(50%-3%)] -translate-y-1/2 sm:w-[23rem]">
	<h1 class="text-xl">Welcome back</h1>
	<h2 class="text-cardboard-500">Enter your email to sign into your account</h2>

	<input
		type="email"
		placeholder="name@provider.com"
		class="w-full px-4 py-3 mt-5 text-sm border rounded bg-inherit border-cardboard-500"
	/>
	<button class="w-full py-3 mt-3 text-sm rounded text-cardboard-100 bg-cardboard-900"
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
<hr class="">
 <img src={img} class="h-96 absolute left-1/2" alt="">
