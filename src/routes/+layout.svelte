<script>
	import '../app.css';
</script>

<slot />

<style lang="postcss">
	/* @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap'); */
	:global(:root) {
		background-color: #edebe3;
		font-family: 'Comfortaa', sans-serif;
		font-weight: theme('fontWeight.medium');
		letter-spacing: 0.2px;
	}
</style>
