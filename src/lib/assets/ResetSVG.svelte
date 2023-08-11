<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-positive-tabindex -->
<script lang="ts">
	export let variant: { highlighted: string; unhighlighted: string; ['accent-main']?: string };
	// import them
	// const textVar = {
	// 	unhighlighted: 'text-cardboard-unhighlighted',
	// 	highlighted: 'text-cardboard-highlighted',
	// 	['accent-main']: 'text-cardboard-accent-main'
	// };
	// $:{
	// 	if ($theme === 'dark-forest') {
	// 		textVar.highlighted = 'text-dark-forest-highlighted';
	// 		textVar.unhighlighted = 'text-dark-forest-unhighlighted';
	// 		textVar['accent-main'] = 'text-dark-forest-accent-main';
	// 	}
	// 	if ($theme === 'cardboard') {
	// 		textVar.highlighted = 'text-cardboard-highlighted';
	// 		textVar.unhighlighted = 'text-cardboard-unhighlighted ';
	// 		textVar['accent-main'] = 'text-cardboard-accent-main';
	// 	}
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	type="button"
	fill="none"
	viewBox="0 0 24 24"
	stroke-width="2.5"
	stroke="currentColor"
	class={`w-7 h-7 ${variant.unhighlighted} ${variant.highlighted} p-1 focus:bg-dark-forest-fade rounded outline-none border-none `}
>
	<path
		stroke-linecap="round"
		stroke-linejoin="round"
		d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
	/>
</svg>
