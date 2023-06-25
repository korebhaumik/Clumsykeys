<script lang="ts">
	import { goto } from '$app/navigation';
	import { blur, fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { theme } from './store';
	import ResetSvg from '$lib/assets/ResetSVG.svelte';
	import { game, setGameState } from './store';
	import {
		createTimer,
		resetTest,
		count,
		TimerCount,
		wordIndex,
		timeDataArr,
		WordCount
	} from './store';

	import { newTextConfig } from './store';
	import { getWords, wordsArr } from './store';

	$: lang = $newTextConfig.language.value;
	$: type = $newTextConfig.quotes.isHighlighted === true ? 'quotes' : 'words';

	type GameState = 'waiting' | 'playing' | 'finished';

	const textVar = {
		highlighted: 'text-dark-forest-highlighted',
		['accent-error']: 'text-dark-forest-accent-error',
		unhighlighted: 'text-dark-forest-unhighlighted'
	};

	// const textVar = {
	// 	highlighted: 'text-cardboard-highlighted',
	// 	['accent-error']: 'text-cardboard-accent-error',
	// 	unhighlighted: 'text-cardboard-unhighlighted '
	// };

	const bgVar = {
		// caret: 'bg-cardboard-caret'
		caret: 'bg-cardboard-caret'
	};

	// const focusVar = {
	// 	highlighted: 'focus:text-dark-forest-highlighted',
	// };

	// let k = 'bg-blue-700';
	let k = 'bg-cardboard-caret';

	$: {
		if ($theme === 'dark-forest') {
			textVar.highlighted = 'text-dark-forest-highlighted';
			textVar['accent-error'] = 'text-dark-forest-accent-error';
			textVar.unhighlighted = 'text-dark-forest-unhighlighted ';
			// bgVar.caret = 'bg-dark-forest-caret';
			// focusVar.highlighted = 'focus:text-dark-forest-highlighted';
			bgVar.caret = 'bg-cardboard-caret';
		}
		if ($theme === 'cardboard') {
			textVar.highlighted = 'text-cardboard-highlighted';
			textVar['accent-error'] = 'text-cardboard-accent-error';
			textVar.unhighlighted = 'text-cardboard-unhighlighted';
			// focusVar.highlighted = 'focus:text-cardboard-highlighted';
			bgVar.caret = 'bg-cardboard-caret';
		}
	}

	// const wordsArr: string[] = 'The quick brown fox jumps over the lazy dog.'.split(' ');
	// const wordsArr: string[] = 'call go seem problem'.split(' ');
	// let wordsArr: string[] = 'call go seem problem seem as such program any like against may from this over other fact time which problem see feel which.'.split(' ');
	// let wordsArr: string[] = [];
	// const wordsArr: string[] =
	// 	'call go seem problem seem as such program any like against may from this over other fact time which problem see feel which. call go seem problem seem as such program any like against may from this over other fact time which problem see feel which. call go seem problem seem as such program any like against may from this over other fact time which problem see feel which'.split(
	// 		' '
	// 	);

	interface wordsDataType {
		correctChars: number;
		wpm: number;
		incorrectChars: number;
		missedChars: number;
		rawChars: number;
		extraChars: number;
		startTime: number;
		endTime: number;
	}

	let wordsDataArr: wordsDataType[] = [];

	// let game: GameState = 'waiting';
	let typedLetter = '';
	// let wordIndex = 0;
	let letterIndex = 0;

	let caretEl: HTMLDivElement;
	let wordsEl: HTMLDivElement;
	let letterEl: HTMLSpanElement;
	let nextwordEl: HTMLSpanElement;
	let prevLetterEl: HTMLSpanElement;
	let nextLetterEl: HTMLSpanElement;
	let inputEl: HTMLInputElement;

	let lineH = 0;
	let lineNum = 0;

	// async function getWords(limit: number, lang: string) {
	// 	const response = await fetch(`/api/words?limit=${limit}&lang=${lang}&type=quotes`);
	// 	wordsArr = await response.json();
	// }

	onMount(async () => {
		await getWords($newTextConfig.words.isHighlighted ? $newTextConfig.words.value : 500, {
			lang: $newTextConfig.language.value,
			type: $newTextConfig.quotes.isHighlighted ? 'quotes' : 'words',
			isNumber: $newTextConfig.numbers,
			isPunctuation: $newTextConfig.punctuations
		});
		inputEl.focus();
		isBlur = false;
		// document.addEventListener('keydown', (e) => {
		// 	if (e.key === 'Tab') {
		// 		resetEl.focus();
		// 	}
		// });
	});

	interface timeDataType {
		time: number;
		correctChars: number;
		rawChars: number;
		incorrectChars: number;
		wpm: number;
		raw: number;
	}

	// let timeDataArr: timeDataType[] = [
	// 	{
	// 		time: 1,
	// 		correctChars: 0,
	// 		rawChars: 0,
	// 		incorrectChars: 0,
	// 		wpm: -1,
	// 		raw: -1
	// 	}
	// ];

	// let TimerCount = -1;
	// let WordCount = 100;
	// let count = 0;
	let intervalId: number | null = null;
	// $: RemainingTime = TimerCount - count;

	// function createTimer() {
	// 	const intervalId = setInterval(() => {
	// 		// console.log(`Count: ${count}`);
	// 		timeDataArr.push({
	// 			//Change value of 20
	// 			time: count === 0 ? 1 : count,
	// 			correctChars: 0,
	// 			rawChars: 0,
	// 			incorrectChars: 0,
	// 			wpm: -1,
	// 			raw: -1
	// 		});
	// 		count++;
	// 	}, 1000);
	// 	return intervalId;
	// }

	$: {
		if (letterIndex && intervalId === null) {
			intervalId = createTimer();
			console.log('intervalId: ', intervalId);
		}
	}

	$: {
		if ($count === $TimerCount) {
			// goto('/')
			setGameState('finished');
		}
		if ($wordIndex === $WordCount) {
			setGameState('finished');
		}
	}

	$: {
		if ($game === 'finished') {
			// console.log(count);
			console.log(letterIndex, wordIndex);
			clearInterval(intervalId as number);
			timeDataArr.update((prev) => {
				prev.pop();
				return prev;
			});
			intervalId = null;
			lineH = 0;
			lineNum = 0;
			count.set(0);
			letterIndex = 0;
			caretEl.style.left = '0px';
			caretEl.style.top = '3px';
			typedLetter = '';
			// timeDataArr.update((prev) => {
			// 	prev.forEach((timeLog, index) => {
			// 		if (index - 1 >= 0) {
			// 			let temp = (timeLog.correctChars / 5) * 60;
			// 			tempArr.push(temp);
			// 			const sum = tempArr.reduce((total, num) => total + num, 0);
			// 			timeLog.wpm = Math.floor(sum / tempArr.length);
			// 			temp = (timeLog.rawChars / 5) * 60;
			// 			timeLog.raw = Math.floor((temp + prev[index - 1].raw) / 2);
			// 		} else {
			// 			let temp = (timeLog.correctChars / 5) * 60;
			// 			tempArr.push(temp);
			// 			timeLog.wpm = Math.floor(temp);
			// 			temp = (timeLog.rawChars / 5) * 60;
			// 			timeLog.raw = temp;
			// 		}
			// 	});
			// 	prev.pop();
			// 	return prev;
			// });
			console.log(wordsDataArr);
			console.log($timeDataArr);
			// window.location.href = '/result';
			(async () => {
				await goto('/result');
			})();
		}
	}

	function populateWords() {
		wordsDataArr[$wordIndex] = {
			correctChars: 0,
			rawChars: 0,
			missedChars: 0,
			extraChars: 0,
			incorrectChars: 0,
			wpm: -1,
			startTime: Date.now(),
			endTime: -1
		};
	}

	const updateGameState = () => {
		if ($wordIndex === $wordsArr.length - 1 && letterIndex === $wordsArr[$wordIndex].length - 1) {
			wordsDataArr[$wordIndex].wpm = 60000 / (Date.now() - wordsDataArr[$wordIndex].startTime);
			setGameState('finished');
			// goto('/result');
			return;
		}
		if ($game === 'playing') {
			setLetter();
			checkLetter();
			nextLetter();
			resetLetter();
			moveCaret('forward');
		}
	};

	// const setGameState = (x: GameState) => {
	// 	game = x;
	// };

	const setLetter = () => {
		const isWordCompleted = letterIndex > $wordsArr[$wordIndex].length - 1;
		const isLastWord = $wordIndex === $wordsArr.length - 1;
		const isFirstWord = $wordIndex === 0;
		if (letterIndex + 1 < $wordsArr[$wordIndex].length - 1) {
			nextLetterEl = wordsEl.children[$wordIndex].children[letterIndex + 1] as HTMLSpanElement;
		} else {
			if (isLastWord) {
				nextLetterEl = wordsEl.children[$wordIndex].children[0] as HTMLSpanElement;
			} else {
				nextLetterEl = wordsEl.children[$wordIndex + 1].children[0] as HTMLSpanElement;
			}
		}
		if (letterIndex === 0 && !isFirstWord) {
			prevLetterEl = wordsEl.children[$wordIndex - 1].children[
				$wordsArr[$wordIndex - 1].length - 1
			] as HTMLSpanElement;
		} else {
			prevLetterEl = wordsEl.children[$wordIndex].children[letterIndex - 1] as HTMLSpanElement;
		}
		if (!isWordCompleted) {
			letterEl = wordsEl.children[$wordIndex].children[letterIndex] as HTMLSpanElement;
		}
		if (!isLastWord) {
			nextwordEl = wordsEl.children[$wordIndex + 1].children[0] as HTMLSpanElement;
		}
	};

	const checkLetter = () => {
		if (letterEl.innerHTML === typedLetter) {
			// console.log('correct');
			$timeDataArr.at(-1)!.correctChars += 1;
			$timeDataArr.at(-1)!.rawChars += 1;

			wordsDataArr.at($wordIndex)!.correctChars += 1;
			wordsDataArr.at($wordIndex)!.rawChars += 1;
			letterEl.className = textVar.highlighted;
			// letterEl.style.color = 'white';
			// letterEl.style.textDecoration = 'underline';
		}

		if (letterEl.innerHTML !== typedLetter) {
			// console.log('incorrect');
			$timeDataArr.at(-1)!.incorrectChars += 1;
			$timeDataArr.at(-1)!.rawChars += 1;

			wordsDataArr.at($wordIndex)!.incorrectChars += 1;
			wordsDataArr.at($wordIndex)!.rawChars += 1;
			letterEl.className = `${textVar['accent-error']} underline`;
		}
	};

	const nextLetter = () => {
		if (letterIndex === $wordsArr[$wordIndex].length) {
			return;
		}
		letterIndex += 1;
	};

	function nextWord() {
		const isNotFirstLetter = letterIndex !== 0;
		const isOneLetterWord = $wordsArr[$wordIndex].length === 1;

		if (isNotFirstLetter || isOneLetterWord) {
			wordIndex.update((prev) => (prev += 1));
			letterIndex = 0;
		}
	}

	function prevletter() {
		if (letterIndex !== 0) {
			letterIndex -= 1;
			setLetter();
			letterEl.className = textVar.unhighlighted;
		} else {
			wordIndex.update((prev) => (prev -= 1));
			const lastLetterIndex = $wordsArr[$wordIndex].length - 1;
			letterIndex = lastLetterIndex;
			setLetter();
			letterEl.className = textVar.unhighlighted;
		}
	}

	const resetLetter = () => {
		typedLetter = '';
	};

	let tempSpace: string | undefined;
	const handleKeydown = (e: KeyboardEvent) => {
		if (e.code === 'Space') {
			e.preventDefault();
		}

		// array of all keys
		const keys = [
			'Backspace',
			'Enter',
			'ShiftLeft',
			'ShiftRight',
			'ControlLeft',
			'ControlRight',
			'AltLeft',
			'AltRight',
			'CapsLock',
			'Tab',
			'Escape',
			'ArrowLeft',
			'ArrowRight',
			'ArrowUp',
			'ArrowDown',
			'PageUp',
			'PageDown',
			'Home',
			'End',
			'Insert',
			'Delete',
			'OSLeft',
			'OSRight',
			'ContextMenu',
			'F1',
			'F2',
			'F3',
			'F4',
			'F5',
			'F6',
			'F7',
			'F8',
			'F9',
			'F10',
			'F11',
			'F12',
			'NumLock',
			'ScrollLock',
			'Pause'
		];
		if ($game === 'waiting' && !keys.includes(e.code) && e.metaKey === false) {
			setGameState('playing');
		}

		if ($game === 'playing') {
			caretEl.className = `transition-all absolute ${bgVar.caret} h-5 rounded-full w-0.5 top-[3px]`;
			if (letterIndex === 0) {
				populateWords();
			}
			// logDataPerWord();
			tempSpace = e.key;
			if (e.code === 'Space') {
				const isLastLetter = $wordIndex + 1 >= $wordsArr.length;
				if (letterIndex === 0) return;
				if (!isLastLetter) {
					wordsDataArr[$wordIndex].endTime = Date.now();
					wordsDataArr[$wordIndex].wpm = 60000 / (Date.now() - wordsDataArr[$wordIndex].startTime);
					$timeDataArr.at(-1)!.correctChars += 1;
					$timeDataArr.at(-1)!.rawChars += 1;
					nextWord();
					populateWords();
					moveCaret('space');
				}
			}
			if (e.code === 'Backspace') {
				if ($wordIndex === 0 && letterIndex === 0) return;
				if (nextLetterEl?.offsetTop > prevLetterEl?.offsetTop) {
					if (letterIndex === 0) return;
				}
				// console.log(prevLetterEl.offsetTop, letterEl.offsetTop, nextLetterEl.offsetTop)
				prevletter();
				moveCaret('backward');
			}
		}
	};

	function moveCaret(type: 'backward' | 'forward' | 'space') {
		// if (wordY > wordsY) {
		// 	caretEl.style.top = `${wordY + 100}px`;
		// 	wordEl.scrollIntoView({ block: 'center' });
		// }
		caretEl.style.top = `${letterEl.offsetTop - lineH}px`;

		// console.log(lineNum)

		// const H = wordsEl.getBoundingClientRect().height;
		const H = wordsEl.scrollHeight;

		// console.log(H/28, lineNum)

		if (type === 'forward') {
			caretEl.style.left = `${letterEl.offsetLeft + letterEl.offsetWidth}px`;
		}
		if (type === 'backward') {
			caretEl.style.left = `${letterEl.offsetLeft}px`;
		}
		if (type === 'space') {
			if (nextwordEl.offsetTop !== letterEl.offsetTop) {
				if (lineNum > 0 && H / 28 > lineNum + 3 && wordsEl.scrollHeight > 112) {
					wordsEl.scrollBy(0, 28);
					// console.log(wordEl.getBoundingClientRect());
					lineH += 28;
				}
				lineNum += 1;
				caretEl.style.top = `${nextwordEl.offsetTop - lineH}px`;
			}

			caretEl.style.left = `${nextwordEl.offsetLeft}px`;
		}
	}

	$: isBlur = false;
	let resetEl: HTMLElement;
</script>

<p class={'text-white'}>{tempSpace}</p>
<section class="relative">
	<!-- svelte-ignore a11y-positive-tabindex -->
	<!-- svelte-ignore a11y-autofocus -->
	<input
		class="sr-only"
		id="boss"
		type="text"
		bind:this={inputEl}
		bind:value={typedLetter}
		on:input={updateGameState}
		on:keydown={handleKeydown}
		tabindex="1"
		on:blur={() => {
			isBlur = true;
		}}
		on:focus={() => {
			isBlur = false;
		}}
	/>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- class={`h-32 mt-5 overflow-hidden text-xl font-base leading-relaxed space text-cardboard-500 game ${textVar.unhighlighted}`} -->
	<div
		on:click={() => {
			inputEl.focus();
			isBlur = false;
		}}
	>
		<div bind:this={wordsEl} class={`overflow-hidden h-28`} transition:fly>
			{#each $wordsArr as word}
				<span bind:this={letterEl} class="mr-2 text-xl">
					{#each word as letter}
						<span class={`${textVar.unhighlighted}`}>{letter}</span>
					{/each}
				</span>
			{/each}
		</div>

		<div
			bind:this={caretEl}
			class={`caret new transition-all absolute ${bgVar.caret} h-5 rounded-full w-0.5 top-[3px]`}
		/>
	</div>

	{#if isBlur === true}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="w-screen h-36 absolute backdrop-blur-sm -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
			transition:blur={{ duration: 350 }}
			on:click={() => {
				inputEl.focus();
				isBlur = false;
			}}
		/>
	{/if}
</section>

<span
	bind:this={resetEl}
	class="block mx-auto mt-5 w-fit"
	on:click={async () => {
		//@ts-ignore
		clearInterval(intervalId);
		letterIndex = 0;
		caretEl.style.left = '0px';
		caretEl.style.top = '3px';
		typedLetter = '';
		resetTest();
		await getWords($newTextConfig.words.isHighlighted ? $newTextConfig.words.value : 500, {
			lang: $newTextConfig.language.value,
			type: $newTextConfig.quotes.isHighlighted ? 'quotes' : 'words',
			isNumber: $newTextConfig.numbers,
			isPunctuation: $newTextConfig.punctuations
		});
		setGameState('waiting');

		inputEl.focus();
		for (let i = 0; i < $wordsArr.length; i++) {
			for (let j = 0; j < $wordsArr[i].length; j++) {
				wordsEl.children[i].children[j].className = textVar.unhighlighted;
			}
		}
	}}
	on:keydown={async (e) => {
		if (e.key === 'Enter') {
			//@ts-ignore
			clearInterval(intervalId);
			// console.log(intervalId);
			intervalId = null;
			lineH = 0;
			lineNum = 0;
			count.set(0);
			letterIndex = 0;
			caretEl.style.left = '0px';
			caretEl.style.top = '3px';
			typedLetter = '';
			resetTest();
			await getWords($newTextConfig.words.isHighlighted ? $newTextConfig.words.value : 500, {
				lang: $newTextConfig.language.value,
				type: $newTextConfig.quotes.isHighlighted ? 'quotes' : 'words',
				isNumber: $newTextConfig.numbers,
				isPunctuation: $newTextConfig.punctuations
			});
			setGameState('waiting');

			for (let i = 0; i < $wordsArr.length; i++) {
				for (let j = 0; j < $wordsArr[i].length; j++) {
					wordsEl.children[i].children[j].className = textVar.unhighlighted;
				}
			}
			inputEl.focus();
		}
	}}
>
	<ResetSvg
		variant={{ highlighted: `focus:${textVar.highlighted}`, unhighlighted: textVar.unhighlighted }}
	/>
</span>

<!-- class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" -->
<!-- class="absolute w-full text-center -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm top-1/2 left-1/2 h-28" -->

<!-- input on focus -->
<!-- on:focus={() => {
	caretEl.className = 'transition-all absolute bg-blue-700 h-5 rounded-full w-0.5 top-[3px]';
}} -->

<style>
	@keyframes blink {
		0% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	.caret {
		transition: all 0.2s ease;
		/* animation: blink 1s infinite; */
	}
	.new {
		animation: blink 1s infinite;
	}
	.speed {
		transition-duration: 2000ms;
	}
</style>
