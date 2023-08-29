<script lang="ts">
	import { contentHeight, theme, footerEl } from '$lib/components/fun.store';
	import { newTextConfig } from '$lib/components/config.store';
	import ResetSvg from '$lib/assets/ResetSVG.svelte';
	import cn from '$lib/utils';

	import {
		resetTest,
		setGameState,
		timeDataArr,
		wordsArr,
		GlobalWordsDataArr,
		incorrectCharCount,
		charCount,
		testStatus
	} from '$lib/components/game.store';

	import { onMount } from 'svelte';
	import Graph from '$lib/components/Graph.svelte';
	import { goto } from '$app/navigation';
	import ClipboardSvg from '$lib/assets/ClipboardSVG.svelte';
	import FireSvg from '$lib/assets/FireSVG.svelte';
	import Profile from '$lib/components/Profile.svelte';
	import toast, { Toaster } from 'svelte-french-toast';

	let resetButton: HTMLAnchorElement;
	const textVar = {
		unhighlighted: 'text-dark-forest-unhighlighted',
		highlighted: 'text-dark-forest-highlighted',
		['accent-main']: 'text-dark-forest-accent-main',
		['accent-error']: 'text-dark-forest-accent-error'
	};
	const bgVar = {
		'accent-error': 'bg-dark-forest-accent-error'
	};
	$: {
		if ($theme === 'dark-forest') {
			textVar.unhighlighted = 'text-dark-forest-unhighlighted';
			textVar.highlighted = 'text-dark-forest-highlighted';
			textVar['accent-main'] = 'text-dark-forest-accent-main';
			textVar['accent-error'] = 'text-dark-forest-accent-error';
		}
		if ($theme === 'cardboard') {
			textVar.unhighlighted = 'text-cardboard-unhighlighted';
			textVar.highlighted = 'text-cardboard-highlighted';
			textVar['accent-main'] = 'text-cardboard-accent-main';
			textVar['accent-error'] = 'text-cardboard-accent-error';
		}
	}
	function myfunction(e: any) {
		if (e.key === 'Tab') {
			e.preventDefault();
			resetButton.focus();
		}
	}
	onMount(async() => {
		document.addEventListener('keydown', myfunction);
		setGameState('waiting');
		if ($testStatus === 'protected') {
			// setGameState('waiting');
			await goto('/');
		}

		return () => document.removeEventListener('keydown', myfunction);
	});
	let offsetHeight = 0;
	let innerHeight = 0;
	let innerWidth = 0;

	const handleDynamicFooter = () => {
		!($contentHeight > innerHeight - 60 - 200)
			? ($footerEl.style.position = 'absolute')
			: ($footerEl.style.position = 'relative');
	};

	onMount(() => {
		contentHeight.set(offsetHeight);
		handleDynamicFooter();
		window.addEventListener('resize', handleDynamicFooter, true);
		() => window.removeEventListener('resize', handleDynamicFooter, true);
	});

	export let data;
	const { supabase, session } = data;
	let username: string = 'anonymous';
	type PB = {
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
	type RecentTest = {
		wpm: number;
		raw: number;
		acc: number;
		std: number;
		chars: [number, number, number];
		mode: string;
		lang: string;
		date: Date;
	};
	async function fetchLatestProfile() {
		const userInstance = await supabase.from('users').select('*').eq('email', session?.user.email);
		// console.log(userInstance);
		if (userInstance.data) {
			// console.log(userInstance.data[0].pb);
			username = userInstance.data[0].username;
			// console.log(userInstance.data[0].recent_tests);
			return {
				LtestsCompleted: userInstance.data[0].testsCompleted,
				LtestsStarted: userInstance.data[0].testsStarted,
				Lpb: JSON.parse(userInstance.data[0].pb as string) as PB,
				LRecentTests: JSON.parse(userInstance.data[0].recent_tests as string) as RecentTest[],
				Lwpm: userInstance.data[0].wpm ?? 0,
				Lraw: userInstance.data[0].raw ?? 0,
				Lacc: userInstance.data[0].acc ?? 100,
				Lstd: userInstance.data[0].std ?? 0,
				LtimeTyping: userInstance.data[0].timeTyping ?? 0
			};
		} else throw new Error('User not found');
	}

	type ProfileProps = Awaited<ReturnType<typeof fetchLatestProfile>>;
	function avg(n: number, Lavg: number, current: number) {
		// console.log(n, Lavg, current);
		if (isFloat(current)) return parseFloat((((n - 1) / n) * Lavg + (1 / n) * current).toFixed(2));
		// console.log(((n - 1) / n) * Lavg + (1 / n) * current);
		return Math.floor(((n - 1) / n) * Lavg + (1 / n) * current);
	}
	function isFloat(value: number) {
		if (typeof value === 'number' && !Number.isNaN(value) && !Number.isInteger(value)) {
			return true;
		}

		return false;
	}
	function updatePB(Lpb: PB) {
		if ($newTextConfig.time.isHighlighted) {
			if ($newTextConfig.time.value === 15) {
				if (Lpb['15sec'].wpm === null || Lpb['15sec'].wpm < wpm) {
					Lpb['15sec'].wpm = wpm;
					Lpb['15sec'].acc = accuracy;
				}
			}
			if ($newTextConfig.time.value === 30) {
				if (Lpb['30sec'].wpm === null || Lpb['30sec'].wpm < wpm) {
					Lpb['30sec'].wpm = wpm;
					Lpb['30sec'].acc = accuracy;
				}
			}
			if ($newTextConfig.time.value === 60) {
				if (Lpb['60sec'].wpm === null || Lpb['60sec'].wpm < wpm) {
					Lpb['60sec'].wpm = wpm;
					Lpb['60sec'].acc = accuracy;
				}
			}
		}
		if ($newTextConfig.words.isHighlighted) {
			if ($newTextConfig.words.value === 25) {
				if (Lpb['25words'].wpm === null || Lpb['25words'].wpm < wpm) {
					Lpb['25words'].wpm = wpm;
					Lpb['25words'].acc = accuracy;
				}
			}
			if ($newTextConfig.words.value === 50) {
				if (Lpb['50words'].wpm === null || Lpb['50words'].wpm < wpm) {
					Lpb['50words'].wpm = wpm;
					Lpb['50words'].acc = accuracy;
				}
			}
			if ($newTextConfig.words.value === 100) {
				if (Lpb['100words'].wpm === null || Lpb['100words'].wpm < wpm) {
					Lpb['100words'].wpm = wpm;
					Lpb['100words'].acc = accuracy;
				}
			}
		}
		return;
	}
	function updateRecentTests(LRecentTests: RecentTest[]) {
		if (LRecentTests.length === 5) LRecentTests.pop();
		LRecentTests.unshift({
			wpm,
			raw: avgRaw,
			acc: accuracy,
			std: standardDeviation,
			chars: [$charCount, $incorrectCharCount, 0],
			mode: $newTextConfig.time.isHighlighted
				? `time ${$newTextConfig.time.value}s`
				: `words ${$newTextConfig.words.value}`,
			lang: $newTextConfig.language.value,
			date: new Date()
		});
	}
	async function updateLatestProfile({
		LtestsCompleted,
		LtestsStarted,
		Lpb,
		LRecentTests,
		// pb: JSON.parse(userInstance.data[0].pb as string)
		Lwpm,
		Lraw,
		Lacc,
		Lstd,
		LtimeTyping
	}: ProfileProps) {
		updatePB(Lpb);
		updateRecentTests(LRecentTests);
		const FtestCompleted = LtestsCompleted + 1;
		const FtimeTyping = LtimeTyping + $timeDataArr.at(-1)!.time;
		const Fwpm = avg(FtestCompleted, Lwpm, wpm);
		const Facc = avg(FtestCompleted, Lacc, accuracy);
		const Fraw = avg(FtestCompleted, Lraw, avgRaw);
		const Fstd = avg(FtestCompleted, Lstd, standardDeviation);
		await supabase
			.from('users')
			.update({
				wpm: Fwpm,
				raw: Fraw,
				acc: Facc,
				std: Fstd,
				timeTyping: FtimeTyping,
				testsCompleted: FtestCompleted,
				testsStarted: FtestCompleted,
				pb: JSON.stringify(Lpb),
				recent_tests: JSON.stringify(LRecentTests)
			})
			.eq('email', session?.user.email);
	}
	// async function updateLeaderboard() {
	// 	const leaderboard = await supabase.from('leaderboard').select('*');
	// 	const leaderboardData = leaderboard.data;
	// 	const leaderboardDataSorted = leaderboardData!.sort((a, b) => b.wpm - a.wpm);
	// 	const leaderboardDataSortedSliced = leaderboardDataSorted.slice(0, 10);
	// 	const leaderboardDataSortedSlicedEmails = leaderboardDataSortedSliced.map((ele) => ele.email);
	// 	const leaderboardDataSortedSlicedEmailsSet = new Set(leaderboardDataSortedSlicedEmails);
	// 	if (!leaderboardDataSortedSlicedEmailsSet.has(session?.user.email)) {
	// 		await supabase.from('leaderboard').insert([
	// 			{
	// 				email: session?.user.email,
	// 				wpm: wpm,
	// 				raw: avgRaw,
	// 				acc: accuracy,
	// 				std: standardDeviation,
	// 				timeTyping: $timeDataArr.at(-1)!.time
	// 			}
	// 		]);
	// 	}
	// }
	async function updateLeaderboard() {
		if (!$newTextConfig.time.isHighlighted) return;
		// if ($newTextConfig.time.value != 30) return;
		console.log($newTextConfig.time.value);
		let table = '';
		if ($newTextConfig.time.value == 30) table = 'leaderboards';
		if ($newTextConfig.time.value == 15) table = 'leaderboards_15';
		if ($newTextConfig.time.value == 60) table = 'leaderboards_60';

		const leaderboardsInstance = await supabase
			.from(table)
			.select('*')
			.eq('email', session?.user.email);
		if (leaderboardsInstance.error) throw new Error(leaderboardsInstance.error.message);
		if (leaderboardsInstance.data?.length === 0) {
			// console.log('hello world');
			await supabase.from(table).insert([
				{
					email: session!.user.email as string,
					username,
					wpm: wpm,
					raw: avgRaw,
					acc: accuracy,
					std: standardDeviation
				}
			]);
			return;
		}

		const leaderboardData = leaderboardsInstance.data[0];
		if (leaderboardData.wpm > wpm) return;
		await supabase
			.from(table)
			.update({
				wpm: wpm,
				raw: avgRaw,
				acc: accuracy,
				std: standardDeviation,
				upserted_at: new Date().toISOString()
			})
			.eq('email', session?.user.email);
	}

	onMount(async () => {
		if ($testStatus !== 'valid') return;
		// console.log('hello world', session?.user.email);
		try {
			if (!session) return;
			await updateLatestProfile(await fetchLatestProfile());
			await updateLeaderboard();
		} catch (err: any) {
			console.error(err);
		}
	});

	timeDataArr.update((arr) => {
		// console.log($newTextConfig.time.value)
		return arr.filter((ele) => {
			// console.log(ele.time)
			if ($newTextConfig.time.isHighlighted) return ele.time <= $newTextConfig.time.value;
			else return true;
		});
	});
	$: wpm = $timeDataArr.at(-1)!.wpm;
	const sum = $timeDataArr.reduce((total, ele) => total + ele.raw, 0);
	$: avgRaw = Math.ceil(sum / $timeDataArr.length);

	$: inputHistory = $GlobalWordsDataArr.map((ele, index) => {
		if (ele < 30)
			return { word: $wordsArr[index], wpm: ele, style: 'text-dark-forest-accent-error' };
		if (ele < 60) return { word: $wordsArr[index], wpm: ele, style: 'text-[#DBA9A1]' };
		if (ele < 90) return { word: $wordsArr[index], wpm: ele, style: 'text-white' };
		if (ele < 120) return { word: $wordsArr[index], wpm: ele, style: 'text-[#CFE4C6]' };
		return { word: $wordsArr[index], wpm: ele, style: 'text-dark-forest-accent-main' };
	});

	let wpmArr = $timeDataArr.map((x) => {
		return x.wpm;
	});

	const mean = wpmArr.reduce((acc, val) => acc + val, 0) / wpmArr.length;
	const variance =
		wpmArr.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (wpmArr.length - 1);
	const standardDeviation = parseFloat(Math.sqrt(variance).toFixed(2));

	// console.log(standardDeviation); // Output: 1.5811388300841898
	// $: raw = $timeDataArr.at(-1)!.raw;
	const accuracy = Math.floor((($charCount - $incorrectCharCount) * 100) / $charCount);
</script>

<svelte:window bind:innerHeight bind:innerWidth />
<Toaster/>
{#if $testStatus === 'valid'}
	<div class="px-5 big:px-0" bind:offsetHeight>
		<div class={`mt-10 ${textVar.unhighlighted} justify-between sm:flex w-full`}>
			<div class="flex items-center sm:flex-col sm:items-start">
				<div class="w-fit">
					<p class="text-2xl">wpm</p>
					<h1 class={`text-5xl mt-1 ${textVar['accent-main']}`}>{wpm}</h1>
				</div>
				<div class="ml-10 sm:ml-0 sm:mt-2 mr-10">
					<p class="text-2xl">acc</p>
					<h1 class={`text-5xl mt-1 ${textVar['accent-main']}`}>
						{accuracy}%
					</h1>
				</div>
			</div>
			<div class="w-full mt-10 sm:mt-0">
				<Graph />
			</div>
		</div>
		<div class={`mt-10 justify-between flex flex-wrap w-full ${textVar.unhighlighted}`}>
			<div>
				<h1>test type</h1>
				<div class={`${textVar['accent-main']} mt-2  text-base font-semibold`}>
					{#if $newTextConfig.time.isHighlighted}
						<p>time {$newTextConfig.time.value}</p>
					{:else if $newTextConfig.words.isHighlighted}
						<p>words {$newTextConfig.words.value}</p>
					{:else}
						<p>random quotes</p>
					{/if}
					<p>{$newTextConfig.language.value}</p>

					<p class="hidden sm:block">{$newTextConfig.punctuations ? 'punctuations' : 'no punctuations'}</p>
					<p class="hidden sm:block">{$newTextConfig.numbers ? 'numbers' : 'no numbers'}</p>
				</div>
			</div>
			<div>
				<h1>raw</h1>
				<div class={`${textVar['accent-main']} mt-2  text-sm`}>
					<p class="text-3xl">{avgRaw}</p>
				</div>
			</div>
			<div>
				<h1>characters</h1>
				<div class={`${textVar['accent-main']} mt-2  text-sm`}>
					<!-- <p class="text-3xl">{inputHistory.length * 4}/0/0</p> -->
					<p class="text-3xl">{$charCount}/{$incorrectCharCount}/0</p>
				</div>
			</div>
			<div class="mt-2 sm:mt-0">
				<h1>wpm standard deviation</h1>
				<div class={`${textVar['accent-main']} mt-2 text-sm`}>
					<p class="text-3xl">{standardDeviation}</p>
				</div>
			</div>
			<div class="mt-2 sm:mt-0">
				<h1>session</h1>
				<div class={`${textVar['accent-main']} mt-2  text-sm`}>
					<p class="text-3xl">{$timeDataArr.at(-1)?.time} s</p>
				</div>
			</div>
		</div>

		<!-- svelte-ignore a11y-positive-tabindex -->
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<a
			class={`z-50 block mx-auto my-5 w-fit text-dark-forest-unhighlighted outline-none border-none `}
			type="button"
			href="/"
			bind:this={resetButton}
			on:click={async (e) => {
				// console.log('click')
				// testStatus.set('protected');
				e.preventDefault();
				resetTest();
				document.removeEventListener('keydown', myfunction);
				setGameState('waiting');
				await goto('/');
			}}
			on:focus={() => {
				resetButton.style.color = 'white';
				resetButton.style.backgroundColor = '#242A2D';
				resetButton.style.borderRadius = '0.375rem';
			}}
			on:blur={() => {
				resetButton.style.color = 'gray';
				resetButton.style.backgroundColor = 'inherit';
				resetButton.style.borderRadius = '0';
			}}
		>
			<ResetSvg
				variant={{
					highlighted: ``,
					unhighlighted: ''
				}}
			/>
		</a>
		<div class="flex items-center text-dark-forest-unhighlighted">
			<h1 class="text-white text-lg inline sm:hidden">Inp Hst</h1>
			<h1 class="text-white hidden sm:inline">input history</h1>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<button
				on:click={() => {
					toast.success('Copied to clipboard', {
						duration: 2000,
					});
					navigator.clipboard.writeText($wordsArr.join(' '));
				}}
			>
				<ClipboardSvg variant="w-5 h-5 ml-2" />
			</button>
			<FireSvg variant="w-5 h-5 ml-2" />
			<div class="flex text-xs sm:text-xs leading-none text-black font-semibold rounded-lg ml-2">
				<span class="px-2 py-1 pt-1.5 rounded-l bg-dark-forest-accent-error">{innerWidth<500 ?"<30":"0-30"}</span>
				<span class={`px-2 py-1 pt-1.5 bg-[#DBA9A1]`}>{innerWidth<500 ?"<60":"30-60"}</span>
				<span class="px-2 py-1 pt-1.5 bg-white">{innerWidth<500 ?"<90":"60-90"}</span>
				<span class="px-2 py-1 pt-1.5 bg-[#CFE4C6]">{innerWidth<500 ?"<120":"90-120"}</span>
				<span class="px-2 py-1 pt-1.5 rounded-r bg-dark-forest-accent-main">120+</span>
			</div>
		</div>
		<!-- <div class={`text-white mt-2`}>
		{#each $wordsArr.slice(0, $GlobalWordsDataArr.length) as word}
			<span class={`mr-2`}>
				{word}
			</span>
		{/each}
	</div> -->
		<div class={`text-white mt-2 mb-20`}>
			{#each inputHistory.slice(0, inputHistory.length) as ele}
				<span class={`mr-2 ${ele.style}`} title={`wpm: ${ele.wpm}`}>
					{ele.word}
				</span>
			{/each}
		</div>
	</div>
	<!-- <p class="text-white">{$wordsArr}</p> -->
{:else if $testStatus === 'invalid'}
	<div class=" px-5 big:px-0 absolute top-[45%] -translate-y-1/2 text-dark-forest-highlighted">
		<p class="font-bold">: (</p>
		<h1 class={`${textVar['accent-error']} mt-2 text-2xl`}>Invalid Test</h1>
		<p class={`mt-2 ${textVar.highlighted}`}>
			Reason: Your accuracy is beyond the threshold of 30%
		</p>
		<div class="flex">
			<button
				on:click={async (e) => {
					// console.log('click')
					// testStatus.set('protected');
					e.preventDefault();
					resetTest();
					document.removeEventListener('keydown', myfunction);
					setGameState('waiting');
					await goto('/');
				}}
				class={`block px-4 py-3 mt-2 font-medium text-sm rounded w-fit ${bgVar['accent-error']} ${textVar.highlighted}`}
				>Restart Test</button
			>
			<button
				on:click={async (e) => {
					// console.log('click')
					// testStatus.set('protected');
					e.preventDefault();
					resetTest();
					document.removeEventListener('keydown', myfunction);
					setGameState('waiting');
					await goto('/about');
				}}
				class={`block ml-2 px-4 py-3 mt-2 font-medium text-sm rounded w-fit border`}
				>Contact Support</button
			>
		</div>
	</div>
{:else}
	<!-- <div class="absolute top-[45%] -translate-y-1/2 text-dark-forest-highlighted">
		<p class="font-bold">: (</p>
		<h1 class={`${textVar['accent-error']} mt-2 text-2xl`}>Protected Route</h1>
		<p class={`mt-2 ${textVar.highlighted}`}>
			You cannot access this route without attempting the test!
		</p>
		<div class="flex">
			<button
				on:click={async (e) => {
					// console.log('click')
					// testStatus.set('protected');
					e.preventDefault();
					resetTest();
					document.removeEventListener('keydown', myfunction);
					setGameState('waiting');
					await goto('/');
				}}
				class={`block px-4 py-3 mt-2 font-medium text-sm rounded w-fit ${bgVar['accent-error']} ${textVar.highlighted}`}
				>Attempt Test</button
			>
			<button
				on:click={async (e) => {
					// console.log('click')
					// testStatus.set('protected');
					e.preventDefault();
					resetTest();
					document.removeEventListener('keydown', myfunction);
					setGameState('waiting');
					await goto('/about');
				}}
				class={`block ml-2 px-4 py-3 mt-2 font-medium text-sm rounded w-fit border`}
				>Contact Support</button
			>
		</div>
	</div> -->
{/if}
