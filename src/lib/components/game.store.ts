import { writable } from 'svelte/store';
import type { LangParams } from './storeTypes';

//Game Status
type GameState = 'waiting' | 'playing' | 'finished';

export const game = writable('waiting' as GameState);

export function setGameState(state: GameState) {
	game.set(state);
}

interface timeDataType {
	time: number;
	correctChars: number;
	rawChars: number;
	incorrectChars: number;
	wpm: number;
	raw: number;
}

export const GlobalWordsDataArr = writable([] as number[]);

export const timeDataArr = writable([
	{
		time: 1,
		correctChars: 0,
		rawChars: 0,
		incorrectChars: 0,
		wpm: 0,
		raw: 0
	}
] as timeDataType[]);

export const TimerCount = writable(30 as number);
export const isTimer = writable(true as boolean);
export const WordCount = writable(50 as number);
export const wordIndex = writable(0 as number);

export const count = writable(0 as number);
let tempCount = 0;
let tempArr: number[] = [];

// function updateTimeArr() {
// 	timeDataArr.update((prev) => {
// 		const timeLog = prev.at(-1);
// 		if (timeLog!.time - 1 > 0) {
// 			let temp = (timeLog!.correctChars / 5) * 60;
// 			tempArr.push(temp);
// 			const sum = tempArr.reduce((total, num) => total + num, 0);
// 			timeLog!.wpm = Math.floor(sum / tempArr.length);
// 			// console.log(timeLog!.wpm);
// 		}
// 		return [...prev];
// 	});
// }

// function addNewTimeLog() {
// 	timeDataArr.update((prev) => {
// 		return [
// 			...prev,
// 			{
// 				time: tempCount,
// 				correctChars: 0,
// 				rawChars: 0,
// 				incorrectChars: 0,
// 				wpm: -1,
// 				raw: -1
// 			}
// 		];
// 	});
// }


// timeDataArr.update((arr) => {
//     // console.log($newTextConfig.time.value)
//     return arr.filter((ele) => {
//         // console.log(ele.time)
//         if ($newTextConfig.time.isHighlighted) return ele.time <= $newTextConfig.time.value;
//         else return true;
//     });
// });

export function createTimer() {
	const intervalId = setInterval(() => {
		// console.log(`Count: ${count}`);
		timeDataArr.update((prev) => {
			const timeLog = prev.at(-1);
			if (timeLog!.time - 1 > 0) {
				let temp = (timeLog!.correctChars / 5) * 60;
				tempArr.push(temp);
				const sum = tempArr.reduce((total, num) => total + num, 0);
				timeLog!.wpm = Math.floor(sum / tempArr.length);
				// console.log(timeLog!.wpm);

				temp = (timeLog!.rawChars / 5) * 60;
				timeLog!.raw = Math.floor((temp + prev.at(-2)!.raw) / 2);
			} else {
				let temp = (timeLog!.correctChars / 5) * 60;
				tempArr.push(temp);
				timeLog!.wpm = Math.floor(temp);
				// console.log(timeLog!.wpm);

				temp = (timeLog!.rawChars / 5) * 60;
				timeLog!.raw = temp;
			}
			// prev.pop();
			prev.at(-1)!.wpm = timeLog!.wpm;

			prev.at(-1)!.raw = timeLog!.raw;
			return [...prev];
		});

		timeDataArr.update((prev) => {
			return [
				...prev,
				{
					//Change value of 20
					time: tempCount + 2,
					correctChars: 0,
					rawChars: 0,
					incorrectChars: 0,
					wpm: -1,
					raw: -1
				}
			];
		});
		tempCount++;
		count.set(tempCount);
	}, 1000);
	return intervalId;
}

export const incorrectCharCount = writable(0 as number);
export const charCount = writable(0 as number);
export const testStatus = writable('protected' as 'protected' | 'valid' | 'invalid');

export function resetTest() {
	wordIndex.set(0);
	tempCount = 0;
	tempArr = [];
	GlobalWordsDataArr.set([]);
	charCount.set(0);
	incorrectCharCount.set(0);
	timeDataArr.set([
		{
			time: 1,
			correctChars: 0,
			rawChars: 0,
			incorrectChars: 0,
			wpm: 0,
			raw: -1
		}
	]);
}

//Get words from api

type getWordsConfig = {
	lang: LangParams;
	type?: 'quotes' | 'words';
	isPunctuation?: boolean;
	isNumber?: boolean;
};

export const wordsArr = writable([] as string[]);

export const WordsCache = writable({
	english: [] as string[],
	'english 1k': [] as string[],
	'english 5k': [] as string[],
	'code python': [] as string[],
	'code javascript': [] as string[],
	hindi: [] as string[],
	quotes: [] as string[]
});

export async function getWords(limit: number, config: getWordsConfig) {
	WordsCache.subscribe(async (lang) => {
		if (config.type === 'quotes') {
			console.log('api request');
			const response = await fetch(
				`/api/words?limit=${limit}&lang=${config.lang ?? 'english'}&type=quotes`
			);
			const words = await response.json();
			// WordsCache.update((prev) => {
			// 	return { ...prev, quotes: words };
			// });
			wordsArr.set(words);
			return;
		}
		if (lang[config.lang].length === 0) {
			console.log('api request');
			const response = await fetch(`/api/words?limit=${limit}&lang=${config.lang ?? 'english'}`);
			const words = await response.json();
			WordsCache.update((prev) => {
				return { ...prev, [config.lang]: words };
			});
			return;
		}
		let words = [...lang[config.lang]];
		if (config.isPunctuation === true) {
			let k = 0;
			const super_common_punctuations = ['.', ',', ';', ':', '?', '!'];

			for (let i = 0; i < words.length / 4; i++) {
				let temp = k + Math.floor(Math.random() * 4);
				words[temp] = words[temp] + super_common_punctuations[Math.floor(Math.random() * 6)];
				k += 4;
			}
			wordsArr.set(words.slice(0, limit ?? 200).sort(() => 0.5 - Math.random()));
			if (!config.isNumber) return;
			// return;
		}
		if (config.isNumber === true) {
			let t = 0;
			// let words = [...lang[config.lang]];
			for (let i = 0; i < words.length / 5; i++) {
				let tempNum = getRandomNum();
				let tempIndex = t + Math.floor(Math.random() * 5);
				words.splice(tempIndex, 0, tempNum.toString());
				t += 5;
			}
			wordsArr.set(words.slice(0, limit ?? 200).sort(() => 0.5 - Math.random()));
			return;
		}
		wordsArr.set(lang[config.lang].slice(0, limit ?? 200).sort(() => 0.5 - Math.random()));
		return;
		// console.log(words);
	});
}

function getRandomNum() {
	const RandomType = Math.floor(Math.random() * 4 + 1);
	if (RandomType === 1) {
		return Math.floor(Math.random() * 10 + 1);
	}
	if (RandomType === 2) {
		return Math.floor(Math.random() * 100 + 1);
	}
	if (RandomType === 3) {
		return Math.floor(Math.random() * 1000 + 1);
	}
	if (RandomType === 4) {
		return Math.floor(Math.random() * 10000 + 1);
	}
	return 77;
}
