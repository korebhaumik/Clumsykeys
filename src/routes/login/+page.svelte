<script lang="ts">
	import LoginSection from '$lib/components/LoginSection.svelte';
	import Profile from '$lib/components/Profile.svelte';
	export let data;
	const { session, supabase, userInstance } = data;
</script>

{#if session && userInstance}
	<Profile {userInstance} {supabase} />
{:else}
	<LoginSection {supabase} />
{/if}
