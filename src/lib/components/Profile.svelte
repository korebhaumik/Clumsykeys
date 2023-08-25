<script lang="ts">
	import UserFilledSvg from '$lib/assets/UserFilledSVG.svelte';
	import { contentHeight, footerEl } from '$lib/components/fun.store';
	import { onMount } from 'svelte';
	import RecentTestsTable from './Table.Profile.svelte';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { goto } from '$app/navigation';
	import type { Database, Json } from '../../types/supabase';

	export let supabase: SupabaseClient<Database>;
	// export let supabase: SupabaseClient<Database>;
	export let userInstance:
		| {
				acc: number | null;
				created_at: string;
				email: string;
				id: string;
				pb: Json;
				raw: number | null;
				std: number | null;
				testsCompleted: number;
				testsStarted: number;
				timeTyping: number | null;
				username: string;
				wpm: number | null;
				recent_tests: Json;
		  }[]
		| null;

	let offsetHeight = 0;
	let innerHeight = 0;

	const handleDynamicFooter = () => {
		!($contentHeight > innerHeight - 60 - 200)
			? ($footerEl.style.position = 'absolute')
			: ($footerEl.style.position = 'relative');
	};
	let username: string;
	let wpm: number | null;
	let acc: number | null;
	let raw: number | null;
	let std: number | null;
	let testsCompleted: number;
	let testsStarted: number;
	let timeTyping: number | null;
	let pb: {
		'15sec': {
			wpm: number;
			acc: number;
		};
		'30sec': {
			wpm: number;
			acc: number;
		};
		'60sec': {
			wpm: number;
			acc: number;
		};
		'25words': {
			wpm: number;
			acc: number;
		};
		'50words': {
			wpm: number;
			acc: number;
		};
		'100words': {
			wpm: number;
			acc: number;
		};
	};
	let recentTests: {
		wpm: number;
		raw: number;
		acc: number;
		std: number;
		chars: [number, number, number];
		mode: string;
		lang: string;
		date: Date;
	}[];
	function formatTime(seconds: number | null) {
		if (seconds === null) return '--';
		let hours: string | number = Math.floor(seconds / 3600);
		let minutes: string | number = Math.floor((seconds % 3600) / 60);
		let remainingSeconds: string | number = seconds % 60;
		if (hours < 10) hours = `0${hours}`;
		if (minutes < 10) minutes = `0${minutes}`;
		if (remainingSeconds < 10) remainingSeconds = `0${remainingSeconds}`;
		return `${hours}:${minutes}:${remainingSeconds}s`;
	}
	if (userInstance) {
		username = userInstance[0].username;
		wpm = userInstance[0].wpm;
		acc = userInstance[0].acc;
		raw = userInstance[0].raw;
		std = userInstance[0].std;
		testsCompleted = userInstance[0].testsCompleted;
		testsStarted = userInstance[0].testsStarted;
		timeTyping = userInstance[0].timeTyping;
		pb = JSON.parse(userInstance[0].pb as string);
		recentTests = JSON.parse(userInstance[0].recent_tests as string);
	}
	import toast, { Toaster } from 'svelte-french-toast';
	interface Leaderboard {
		'15sec': null | string;
		'30sec': null | string;
		'60sec': null | string;
	}

	const leaderboard: Leaderboard = {
		'15sec': null,
		'30sec': null,
		'60sec': null
	};

	onMount(async () => {
		if (userInstance) {
			const { data, error } = await supabase.rpc('findrankbyemail', {
				emailstr: userInstance[0].email
			});
			if (!data) return;
			const rank = data.toString();
			if (rank.match(/1$/)) {
				leaderboard['30sec'] = `${rank}st`;
			} else if (rank.match(/2$/)) {
				leaderboard['30sec'] = `${rank}nd`;
			} else if (rank.match(/3$/)) {
				leaderboard['30sec'] = `${rank}rd`;
			} else leaderboard['30sec'] = `${rank}th`;
		}

		contentHeight.set(offsetHeight);
		handleDynamicFooter();
		window.addEventListener('resize', handleDynamicFooter, true);

		() => window.removeEventListener('resize', handleDynamicFooter, true);
	});
</script>

<svelte:window bind:innerHeight />
<Toaster />
<main class="mt-12 mb-20 text-dark-forest-highlighted" bind:offsetHeight>
	<section
		class="relative flex flex-col sm:max-w-lg md:max-w-full md:flex-row px-5 py-5 rounded-lg bg-dark-forest-fade/80"
	>
		<aside>
			<div class="flex items-center">
				<UserFilledSvg />
				<div class="flex relative flex-col ml-3">
					<p class="text-lg">{username}</p>
					<span class="text-xs text-dark-forest-unhighlighted">joined 31 Oct, 2023</span>
					<!-- <button
						class="absolute text-dark-forest-accent-error left-[100px]"
						on:click={async () => {
							supabase.auth.signOut({ scope: 'global' });
							await goto('/');
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="48"
							height="48"
							viewBox="0 0 48 48"
							fill="none"
							class="h-6 w-6"
						>
							<path
								d="M9 42C8.2 42 7.5 41.7 6.9 41.1C6.3 40.5 6 39.8 6 39V9C6 8.2 6.3 7.5 6.9 6.9C7.5 6.3 8.2 6 9 6H22.45C22.875 6 23.2313 6.14458 23.5188 6.43375C23.8063 6.72295 23.95 7.08128 23.95 7.50875C23.95 7.93625 23.8063 8.29167 23.5188 8.575C23.2313 8.85833 22.875 9 22.45 9H9V39H22.45C22.875 39 23.2313 39.1446 23.5188 39.4337C23.8063 39.7229 23.95 40.0813 23.95 40.5087C23.95 40.9362 23.8063 41.2917 23.5188 41.575C23.2313 41.8583 22.875 42 22.45 42H9ZM36.25 25.5H19.5C19.075 25.5 18.7188 25.3554 18.4313 25.0663C18.1438 24.7771 18 24.4187 18 23.9913C18 23.5638 18.1438 23.2083 18.4313 22.925C18.7188 22.6417 19.075 22.5 19.5 22.5H36.15L32.1 18.45C31.8 18.15 31.6583 17.8 31.675 17.4C31.6917 17 31.85 16.65 32.15 16.35C32.45 16.05 32.8083 15.9 33.225 15.9C33.6417 15.9 34 16.05 34.3 16.35L40.95 23C41.25 23.3 41.4 23.65 41.4 24.05C41.4 24.45 41.25 24.8 40.95 25.1L34.35 31.7C34.0567 32 33.7083 32.1417 33.305 32.125C32.9017 32.1083 32.5435 31.95 32.2305 31.65C31.9435 31.35 31.8 30.9917 31.8 30.575C31.8 30.1583 31.95 29.8 32.25 29.5L36.25 25.5Z"
								fill="currentColor"
							/>
						</svg>
					</button> -->
				</div>
			</div>
			<div class="mt-3 text-sm">
				<h1>All Time English Leaderboards</h1>
				<div class="flex flex-wrap sm:w-[22rem] mt-2">
					<span
						class="px-3 py-1 mr-3 font-bold rounded-lg bg-dark-forest-accent-main/90 text-dark-forest-fade"
						>{leaderboard['15sec'] == null ? '--' : `${leaderboard['15sec']}`} : 15 sec
					</span>
					<span
						class="px-3 py-1 mr-3 font-bold rounded-lg bg-dark-forest-accent-main/90 text-dark-forest-fade"
						>{leaderboard['30sec'] == null ? '--' : leaderboard['30sec']} : 30 sec
					</span>
					<span
						class="hidden sm:inline-block px-3 py-1 font-bold rounded-lg bg-dark-forest-accent-main/90 text-dark-forest-fade"
						>{leaderboard['60sec'] == null ? '--' : leaderboard['60sec']} : 60 sec
					</span>
				</div>
			</div>
		</aside>
		<hr
			class="w-1 h-32 mx-10 border-none hidden md:inline-block rounded-full bg-dark-forest-unhighlighted"
		/>
		<hr
			class="w-full h-1 my-5 border-none block md:hidden rounded-full bg-dark-forest-unhighlighted"
		/>
		<aside
			class="grid grid-cols-2 lg:grid-cols-3 w-full xl:grid-cols-4 xl:gap-x-3.5 flex-wrap text-dark-forest-accent-main"
		>
			<div class="flex flex-col">
				<span class="text-dark-forest-unhighlighted">tests started</span>
				<span class="text-2xl">{testsStarted}</span>
			</div>
			<div class="flex flex-col">
				<span class="text-dark-forest-unhighlighted">average wpm</span>
				<span class="text-2xl">{wpm ?? '--'}</span>
			</div>
			<div class="flex flex-col">
				<span class="text-dark-forest-unhighlighted">time typing</span>
				<!-- <span class="text-2xl">{timeTyping ?? '--'}</span> -->
				<span class="text-2xl">{formatTime(timeTyping)}</span>
			</div>
			<div class="flex flex-col">
				<span class="text-dark-forest-unhighlighted">average accuracy</span>
				<span class="text-2xl">{acc ?? '-- '}%</span>
			</div>
			<div class="flex flex-col">
				<span class="text-dark-forest-unhighlighted">tests completed</span>
				<span class="text-2xl">{testsCompleted}</span>
			</div>
			<div class=" hidden xl:flex flex-col">
				<span class="text-dark-forest-unhighlighted">average raw (wpm)</span>
				<span class="text-2xl">{raw ?? '--'}</span>
			</div>
			<div class="flex flex-col">
				<span class="text-dark-forest-unhighlighted">average std</span>
				<span class="text-2xl">{std ?? '--'}</span>
			</div>
		</aside>
		<!-- <aside class="flex flex-wrap text-dark-forest-accent-main">
			<div class="flex flex-col">
				<span class="text-dark-forest-unhighlighted">tests started</span>
				<span class="text-2xl">{testsStarted}</span>
			</div>
			<div class="flex flex-col ml-16">
				<span class="text-dark-forest-unhighlighted">average wpm</span>
				<span class="text-2xl">{wpm ?? '--'}</span>
			</div>
			<div class="flex flex-col ml-16">
				<span class="text-dark-forest-unhighlighted">time typing</span>
				<span class="text-2xl">{timeTyping ?? '--'}</span>
			</div>
			<div class="flex flex-col ml-16">
				<span class="text-dark-forest-unhighlighted">average accuracy</span>
				<span class="text-2xl">{acc ?? '-- '}%</span>
			</div>
			<div class="flex flex-col">
				<span class="text-dark-forest-unhighlighted">tests completed</span>
				<span class="text-2xl">{testsCompleted}</span>
			</div>
			<div class="flex flex-col ml-9">
				<span class="text-dark-forest-unhighlighted">average raw (wpm)</span>
				<span class="text-2xl">{raw ?? '--'}</span>
			</div>
			<div class="flex flex-col ml-5">
				<span class="text-dark-forest-unhighlighted">average std</span>
				<span class="text-2xl">{std ?? '--'}</span>
			</div>
		</aside> -->
	</section>
	<h1 class="mt-5">Personal Best</h1>
	<section class="flex flex-wrap max-w-[63rem] justify-between mt-5 text-dark-forest-highlighted">
		<aside
			class="relative flex px-5 py-5 w-[30rem] mb-2 justify-between rounded-lg bg-dark-forest-fade/80"
		>
			<div class="flex flex-col">
				<span class="text-sm text-dark-forest-unhighlighted">15 seconds</span>
				<span class="text-2xl my-0.5">{pb['15sec'].wpm ?? '--'} wpm</span>
				<span class="text-base text-dark-forest-accent-error">{pb['15sec'].acc ?? '--'} %</span>
			</div>
			<div class="flex flex-col">
				<span class="text-sm text-dark-forest-unhighlighted">30 seconds</span>
				<span class="text-2xl my-0.5">{pb['30sec'].wpm ?? '--'} wpm</span>
				<span class="text-base text-dark-forest-accent-error">{pb['30sec'].acc ?? '--'} %</span>
			</div>
			<div class="flex flex-col">
				<span class="text-sm text-dark-forest-unhighlighted"> 60 seconds</span>
				<span class="text-2xl my-0.5">{pb['60sec'].wpm ?? '--'} wpm</span>
				<span class="text-base text-dark-forest-accent-error">{pb['60sec'].acc ?? '--'} %</span>
			</div>
		</aside>
		<aside
			class=" relative flex px-5 py-5 mb-2 w-[30rem] justify-between rounded-lg bg-dark-forest-fade/80"
		>
			<div class="flex flex-col">
				<span class="text-sm text-dark-forest-unhighlighted">25 words</span>
				<span class="text-2xl my-0.5">{pb['25words'].wpm ?? '--'} wpm</span>
				<span class="text-base text-dark-forest-accent-error">{pb['25words'].acc ?? '--'} %</span>
			</div>
			<div class="flex flex-col">
				<span class="text-sm text-dark-forest-unhighlighted">50 words</span>
				<span class="text-2xl my-0.5">{pb['50words'].wpm ?? '--'} wpm</span>
				<span class="text-base text-dark-forest-accent-error">{pb['50words'].acc ?? '--'} %</span>
			</div>
			<div class="flex flex-col">
				<span class="text-sm text-dark-forest-unhighlighted">100 words</span>
				<span class="text-2xl my-0.5">{pb['100words'].wpm ?? '--'} wpm</span>
				<span class="text-base text-dark-forest-accent-error">{pb['100words'].acc ?? '--'} %</span>
			</div>
		</aside>
	</section>
	<h1 class="mt-5">Recent Tests</h1>
	<RecentTestsTable {recentTests} />
	<!-- <p class="mt-3 text-dark-forest-unhighlighted">This feature is in development</p> -->
</main>
