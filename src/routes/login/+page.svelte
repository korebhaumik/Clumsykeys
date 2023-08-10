<script lang="ts">
	import LoginSection from '$lib/components/LoginSection.svelte';
	import Profile from '$lib/components/Profile.svelte';
	const session = "f";
	
</script>

{#if session}
	<Profile />
{:else}
	<LoginSection />
{/if}
