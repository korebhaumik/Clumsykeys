<script lang="ts">
	import { fade } from 'svelte/transition';
	import { footerEl} from '$lib/components/store';
	import LeaderboardTable from '$lib/components/LeaderboardTable.svelte';

	import { onMount } from 'svelte';

	onMount(() => {
		$footerEl.style.position = 'absolute';
	});
</script>

<div
	class={`mt-5 text-dark-forest-highlighted`}
	in:fade={{ duration: 100, delay: 400 }}
>
	<div class="flex justify-between items-center">
		<div>
			<h1 class="text-lg">All Time English Leaderboards</h1>
			<h2 class="text-dark-forest-unhighlighted">auto-update in 5 mins</h2>
		</div>
		<div class="text-sm flex flex-col items-end">
			<div>
				<button class="bg-dark-forest-accent-main text-black px-2 py-1 rounded">all time</button>
				<button class="bg-dark-forest-fade px-2 py-1 rounded">daily</button>
			</div>
			<div class="mt-2">
				<button class="bg-dark-forest-fade px-2 py-1 rounded">15s</button>
				<button class="bg-dark-forest-accent-main px-2 py-1 rounded text-black">30s</button>
				<button class="bg-dark-forest-fade px-2 py-1 rounded">60s</button>
			</div>
		</div>
	</div>
	<LeaderboardTable />
</div>
