<script lang="ts">
	import { goto } from '$app/navigation';
	import { blur, fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { charCount, theme, inputEl, contentHeight, footerEl } from './store';
	import ResetSvg from '$lib/assets/ResetSVG.svelte';
	import PlaySvg from '$lib/assets/PlaySVG.svelte';
	import { game, setGameState, incorrectCharCount, testStatus } from './store';
	import {
		createTimer,
		resetTest,
		count,
		TimerCount,
		wordIndex,
		timeDataArr,
		WordCount,
		GlobalWordsDataArr
	} from './store';

	import { newTextConfig } from './store';
	import { getWords, wordsArr } from './store';

	onMount(() => {
		contentHeight.set(0);
		!($contentHeight > innerHeight - 60 - 100)
			? ($footerEl.style.position = 'absolute')
			: ($footerEl.style.position = 'relative');
	});

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
		caret: 'bg-dark-forest-caret'
		// caret: 'bg-cardboard-caret'
	};

	// const focusVar = {
	// 	highlighted: 'focus:text-dark-forest-highlighted',
	// };

	$: {
		if ($theme === 'dark-forest') {
			textVar.highlighted = 'text-dark-forest-highlighted';
			textVar['accent-error'] = 'text-dark-forest-accent-error';
			textVar.unhighlighted = 'text-dark-forest-unhighlighted ';
			bgVar.caret = 'bg-dark-forest-caret';
			// focusVar.highlighted = 'focus:text-dark-forest-highlighted';
			// bgVar.caret = 'bg-cardboard-caret';
		}
		if ($theme === 'cardboard') {
			textVar.highlighted = 'text-cardboard-highlighted';
			textVar['accent-error'] = 'text-cardboard-accent-error';
			textVar.unhighlighted = 'text-cardboard-unhighlighted';
			// focusVar.highlighted = 'focus:text-cardboard-highlighted';
			bgVar.caret = 'bg-cardboard-caret';
		}
	}
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
	let typedLetter = '';
	let letterIndex = 0;

	let caretEl: HTMLDivElement;
	let wordsEl: HTMLDivElement;
	let letterEl: HTMLSpanElement;
	let nextwordEl: HTMLSpanElement;
	let prevLetterEl: HTMLSpanElement;
	let nextLetterEl: HTMLSpanElement;

	let lineH = 0;
	let lineNum = 0;

	onMount(async () => {
		function myfunction(e: any) {
			if (e.key === 'Tab') {
				e.preventDefault();
				// if (resetEl == document.activeElement) {
				if (isBlur) {
					resetEl.blur();
					$inputEl.focus();
				} else resetEl.focus();
			}
		}
		document.addEventListener('keydown', myfunction);
		resetTest();
		testStatus.set('protected');
		wordsArr.update((prev) => {
			prev = [];
			return prev;
		});
		await getWords($newTextConfig.words.isHighlighted ? $newTextConfig.words.value : 200, {
			lang: $newTextConfig.language.value,
			type: $newTextConfig.quotes.isHighlighted ? 'quotes' : 'words',
			isNumber: $newTextConfig.numbers,
			isPunctuation: $newTextConfig.punctuations
		});
		$inputEl.focus();
		isBlur = false;

		return () => document.removeEventListener('keydown', myfunction);
	});

	let intervalId: number | null = null;

	$: {
		if (letterIndex && intervalId === null) {
			intervalId = createTimer();
			// console.log('intervalId: ', intervalId);
		}
	}

	$: {
		if ($count === $TimerCount) {
			if (wordsDataArr.at(-1)!.endTime === -1) wordsDataArr.pop();
			setGameState('finished');
		}
		if ($wordIndex === $WordCount) {
			setGameState('finished');
		}
	}

	$: {
		if ($game === 'finished') {
			const accuracy = Math.floor((($charCount - $incorrectCharCount) * 100) / $charCount);
			if (accuracy < 30) {
				testStatus.set('invalid');
			} else {
				testStatus.set('valid');
			}
			console.log($count);
			(async () => {
				// console.log(letterIndex, wordIndex);
				clearInterval(intervalId as number);
				timeDataArr.update((prev) => {
					prev.pop();
					return prev;
				});
				GlobalWordsDataArr.set(
					wordsDataArr.map((wordData) => {
						return wordData.wpm;
					})
				);
				intervalId = null;
				lineH = 0;
				lineNum = 0;
				count.set(0);
				letterIndex = 0;
				caretEl.style.left = '0px';
				caretEl.style.top = '3px';
				typedLetter = '';

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

	const setLetter = () => {
		// console.log(letterIndex, $wordIndex, $wordsArr[$wordIndex].length);
		if (letterIndex === $wordsArr[$wordIndex].length) {
			if (letterEl.children.length > 10) return;
			const extraLetter = document.createElement('span');
			extraLetter.className = `${textVar['accent-error']} underline`;
			extraLetter.textContent = typedLetter;
			letterEl.appendChild(extraLetter);
		}
		const isWordCompleted = letterIndex > $wordsArr[$wordIndex].length - 1;
		const isLastWord = $wordIndex === $wordsArr.length - 1;
		const isFirstWord = $wordIndex === 0;
		if (letterIndex + 1 < $wordsArr[$wordIndex].length - 1) {
			nextLetterEl = wordsEl.children[$wordIndex].children[letterIndex + 1] as HTMLSpanElement;
		} else {
			// console.log('keke');
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
		// if (isWordCompleted) {
		// 	letterEl = wordsEl.children[$wordIndex].children[letterIndex] as HTMLSpanElement;
		// }
		if (!isLastWord) {
			nextwordEl = wordsEl.children[$wordIndex + 1].children[0] as HTMLSpanElement;
		}
		// console.log(letterEl);
	};

	const checkLetter = () => {
		if (letterEl.children.length > 1) {
			letterEl.children[
				letterEl.children.length - 1
			].className = `${textVar['accent-error']} underline`;
			incorrectCharCount.update((prev) => prev + 1);
			charCount.update((prev) => prev + 1);
			$timeDataArr.at(-1)!.incorrectChars += 1;
			$timeDataArr.at(-1)!.rawChars += 1;

			wordsDataArr.at($wordIndex)!.incorrectChars += 1;
			wordsDataArr.at($wordIndex)!.rawChars += 1;
		} else {
			if (letterEl.textContent?.charAt(0) === typedLetter) {
				// console.log('correct');
				charCount.update((prev) => prev + 1);
				$timeDataArr.at(-1)!.correctChars += 1;
				$timeDataArr.at(-1)!.rawChars += 1;

				wordsDataArr.at($wordIndex)!.correctChars += 1;
				wordsDataArr.at($wordIndex)!.rawChars += 1;
				letterEl.children[letterEl.children.length - 1].className = textVar.highlighted;
				// letterEl.className = textVar.highlighted;
			}

			if (letterEl.children[letterEl.children.length - 1].textContent !== typedLetter) {
				// console.log('incorrect');
				incorrectCharCount.update((prev) => prev + 1);
				charCount.update((prev) => prev + 1);
				$timeDataArr.at(-1)!.incorrectChars += 1;
				$timeDataArr.at(-1)!.rawChars += 1;

				wordsDataArr.at($wordIndex)!.incorrectChars += 1;
				wordsDataArr.at($wordIndex)!.rawChars += 1;
				letterEl.children[
					letterEl.children.length - 1
				].className = `${textVar['accent-error']} underline`;
			}
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
		// console.log(letterEl);
		// console.log("finale",letterIndex, $wordIndex);
		if (letterIndex === $wordsArr[$wordIndex].length) {
			if (letterEl.children.length > 1) {
				letterEl.removeChild(letterEl.children[letterEl.children.length - 1]);
				return;
			}
		}
		if (letterIndex !== 0) {
			letterIndex -= 1;
			setLetter();
			letterEl.children[letterEl.children.length - 1].className = textVar.unhighlighted;
		} else {
			// console.log('prev', letterIndex, $wordIndex);
			wordIndex.update((prev) => (prev -= 1));
			const lastLetterIndex = $wordsArr[$wordIndex].length;
			letterIndex = lastLetterIndex;
			// setLetter();
			letterEl = wordsEl.children[$wordIndex].children[letterIndex - 1] as HTMLSpanElement;
			if (letterEl.children.length > 1) {
				letterEl.removeChild(letterEl.children[letterEl.children.length - 1]);
				// letterEl.children[letterEl.children.length - 1].className = textVar.unhighlighted;
			} else {
				// letterEl.children[letterEl.children.length - 1].className = textVar.unhighlighted;
			}
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
			if (e.code === 'Space') {
				const isLastWord = $wordIndex + 1 >= $wordsArr.length;
				if (letterIndex === 0) return;
				if (!isLastWord) {
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
				// console.log(letterEl);
				// console.log('backspace', letterIndex, $wordIndex);
				moveCaret('backward');
			}
		}
	};

	function moveCaret(type: 'backward' | 'forward' | 'space') {
		caretEl.style.top = `${letterEl.offsetTop - lineH}px`;
		const H = wordsEl.scrollHeight;

		if (type === 'forward') {
			// console.log(letterEl)
			caretEl.style.left = `${letterEl.offsetLeft + letterEl.offsetWidth}px`;
		}
		if (type === 'backward') {
			if (letterEl.children.length > 1) {
				caretEl.style.left = `${
					(letterEl.children[letterEl.children.length - 1] as HTMLSpanElement).offsetLeft +
					(letterEl.children[letterEl.children.length - 1] as HTMLSpanElement).offsetWidth
				}px`;
			}
			// if(letterEl.children.length === 1){
			// 	console.log("no width");
			// 	caretEl.style.left = `${letterEl.offsetLeft + letterEl.offsetWidth}px`;
			// }
			if (letterIndex === $wordsArr[$wordIndex].length) {
				// console.log("no width");
				// console.log(letterEl)
				// console.log(letterIndex, $wordIndex);
				caretEl.style.left = `${letterEl.offsetLeft + letterEl.offsetWidth}px`;
			} else {
				caretEl.style.left = `${letterEl.offsetLeft}px`;
			}
			// if (letterIndex == 0) {
			// 	caretEl.style.left = `${letterEl.offsetLeft + letterEl.offsetWidth}px`;
			// }
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
	let resetEl: HTMLAnchorElement;
</script>

<section class="hidden sm:block relative">
	<!-- svelte-ignore a11y-positive-tabindex -->
	<!-- svelte-ignore a11y-autofocus -->
	<input
		class="sr-only"
		id="boss"
		type="text"
		bind:this={$inputEl}
		bind:value={typedLetter}
		on:input={updateGameState}
		on:keydown={handleKeydown}
		on:blur={() => {
			isBlur = true;
		}}
		on:focus={() => {
			isBlur = false;
		}}
	/>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		on:click={() => {
			$inputEl.focus();
			isBlur = false;
		}}
	>
		<div bind:this={wordsEl} class={`overflow-hidden h-28`} transition:fly>
			{#each $wordsArr as word}
				<span class="mr-2 text-xl">
					{#each word as letter}
						<span bind:this={letterEl} class={`${textVar.unhighlighted}`}
							><span class={`${textVar.unhighlighted}`}>{letter}</span></span
						>
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
				$inputEl.focus();
				isBlur = false;
			}}
		>
			<div
				class="text-white flex items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
			>
				<PlaySvg />
				<span>Click here or press tab to focus.</span>
			</div>
		</div>
	{/if}
</section>
<section class="text-xl text-dark-forest-highlighted sm:hidden">
	Support for mobile devices is coming soon!
</section>
<!-- svelte-ignore a11y-missing-attribute -->
<a
	bind:this={resetEl}
	class="block text-dark-forest-unhighlighted outline-none border-none mx-auto mt-5 w-fit"
	type="button"
	href="/"
	on:focus={() => {
		resetEl.style.color = 'white';
		resetEl.style.backgroundColor = '#242A2D';
		resetEl.style.borderRadius = '0.375rem';
		resetEl.style.outline = 'none';
	}}
	on:blur={() => {
		resetEl.style.color = 'gray';
		resetEl.style.backgroundColor = 'inherit';
		resetEl.style.borderRadius = '0';
	}}
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

		$inputEl.focus();
		for (let i = 0; i < $wordsArr.length; i++) {
			for (let j = 0; j < $wordsArr[i].length; j++) {
				// console.log(wordsEl.children[i].children[j].children[0]);
				wordsEl.children[i].children[j].children[0].className = textVar.unhighlighted;
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
					wordsEl.children[i].children[j].replaceChildren(
						wordsEl.children[i].children[j].children[0]
					);
					wordsEl.children[i].children[j].children[0].className = textVar.unhighlighted;
				}
			}
			$inputEl.focus();
		}
	}}
>
	<ResetSvg
		variant={{
			highlighted: ``,
			unhighlighted: ''
		}}
	/>
</a>

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
	}
	.new {
		animation: blink 1s infinite;
	}
	.speed {
		transition-duration: 2000ms;
	}
</style>
