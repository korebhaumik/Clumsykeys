<script lang="ts">
	import InfoSvg from '../assets/InfoSVG.svelte';
	import KeyboardSvg from '../assets/KeyboardSVG.svelte';
	import LogoSvg from '../assets/LogoSVG.svelte';
	import NotifSvg from '../assets/NotifSVG.svelte';
	import RocketSvg from '../assets/RocketSVG.svelte';
	import SettingsSvg from '../assets/SettingsSVG.svelte';
	import UserSvg from '../assets/UserSVG.svelte';
</script>

<header class="flex items-end justify-between">
	<div class="flex items-end">
		<!-- logo -->
		<div class="flex items-center w-fit">
			<LogoSvg />
			<div class="flex flex-col items-start ml-3 font-normal font-poppins">
				<span class="text-xs sm:text-sm leading-none ml-0.5 text-[#87A383]">monkey see</span>
				<span class="text-2xl leading-none sm:text-3xl">monkeytype</span>
			</div>
		</div>

		<!-- Menu -->
		<div class="justify-between hidden ml-5 sm:flex w-36">
			<KeyboardSvg />
			<RocketSvg />
			<InfoSvg />
			<SettingsSvg />
		</div>
	</div>

	<!-- User -->
	<div class="flex justify-between w-16">
		<NotifSvg />
		<UserSvg />
	</div>
</header>

