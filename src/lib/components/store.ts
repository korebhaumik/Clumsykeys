import { writable } from 'svelte/store';
import type {
	LangType,
	Counter,
	CounterParams,
	NewTextConfig,
	LangParams,
	ModalConfig,
	ModalContentParams,
	ModalCounterParams
} from './storeTypes';

// let inputEl: HTMLInputElement;

export let inputEl = writable({} as HTMLInputElement);
export let footerEl = writable({} as HTMLElement);
export let contentEl = writable({} as HTMLElement);
export let contentHeight = writable(0 as number);

export const theme = writable('dark-forest' as 'cardboard' | 'dark-forest' | 'sapphire');

export const newTextConfig = writable({
	punctuations: false,
	numbers: false,
	language: { isHighlighted: true, value: 'english' },
	time: { isHighlighted: true, value: 30 },
	words: { isHighlighted: false, value: 50 },
	quotes: { isHighlighted: false, value: 'Random Quotes' }
} as NewTextConfig);

export function updateTestConfigFormat(key: 'punctuations' | 'numbers') {
	newTextConfig.update((config) => {
		return { ...config, [key]: !config[key] };
	});
}

export function updateTestConfigCounter<T extends Counter>(
	key: 'time' | 'words' | 'quotes',
	value: CounterParams[T]
) {
	const otherKeys = ['time', 'words', 'quotes'].filter((k) => k !== key) as Counter[];
	if (key === 'time') {
		isTimer.set(true);
		TimerCount.update(() => value as number);
	} else {
		isTimer.set(false);
		TimerCount.update(() => -1 as number);
		WordCount.update(() => value as number);
	}

	newTextConfig.update((config) => {
		return {
			...config,
			[key]: { isHighlighted: true, value: value },
			[otherKeys[0]]: {
				isHighlighted: false,
				value: config[otherKeys[0]].value
			},
			[otherKeys[1]]: {
				isHighlighted: false,
				value: config[otherKeys[1]].value
			}
		};
	});
}

export function updateTestConfigLanguage(value: LangParams) {
	newTextConfig.update((config) => {
		return { ...config, language: { isHighlighted: true, value: value } };
	});
}

export const modalConfig = writable({
	isVisible: false,
	content: 'theme',
	counter: 'time'
} as ModalConfig);

export function updateModalVisibility(bool?: boolean) {
	if (bool === false) {
		modalConfig.update((config) => {
			return { ...config, isVisible: false };
		});
		return;
	}
	modalConfig.update((config) => {
		return { ...config, isVisible: !config.isVisible };
	});
}

export function updateModalContent(content: ModalContentParams) {
	modalConfig.update((config) => {
		return { ...config, content: content };
	});
}

export function updateModalCounter(counter: ModalCounterParams) {
	modalConfig.update((config) => {
		return { ...config, counter: counter };
	});
}

type GameState = 'waiting' | 'playing' | 'finished';
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
interface timeDataType {
	time: number;
	correctChars: number;
	rawChars: number;
	incorrectChars: number;
	wpm: number;
	raw: number;
}

export const game = writable('waiting' as GameState);

export function setGameState(state: GameState) {
	game.set(state);
}

// export const GlobalWordsDataArr = writable([] as wordsDataType[]);
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

// export const TimerCount = writable(-1 as number);
import { isTimer, TimerCount, wordIndex, WordCount } from './game.store';
// export const TimerCount = writable(30 as number);
// export const isTimer = writable(true as boolean);
// export const WordCount = writable(50 as number);
// export const wordIndex = writable(0 as number);

export const count = writable(0 as number);
let tempCount = 0;
let tempArr: number[] = [];
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
	// TimerCount.set(-1);
	// WordCount.set(50);
	// clearInterval()
	wordIndex.set(0);
	tempCount = 0;
	tempArr = [];
	GlobalWordsDataArr.set([]);
	charCount.set(0);
	incorrectCharCount.set(0);
	// timeDataArr.update(prev => [
	// 	{
	// 		time: 1,
	// 		correctChars: 0,
	// 		rawChars: 0,
	// 		incorrectChars: 0,
	// 		wpm: 0,
	// 		raw: -1
	// 	}
	// ]);
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
	// game.set('waiting');
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

// export async function getWords(limit: number, config: getWordsConfig) {
// 	const response = await fetch(`/api/words?limit=${limit}&lang=${config.lang ?? 'english'}&type=${config.type ?? 'words'}&isPunctuation=${config.isPunctuation ?? false}&isNumber=${config.isNumber ?? false}`);
// 	// const response = await fetch(`/api/words?limit=${limit}&lang=${lang}&type=${type}&isPunctuation=true&isNumber=true`);
// 	wordsArr.set(await response.json());

// 	// wordsCache.subscribe(async(words) => {
// 	// 	if(words.length === 0) {

// 	// 		wordsCache.set(await response.json());
// 	// 		return;
// 	// 	}
// 	// 	return words;

// 	// 	// console.log(words);
// 	// });
// }

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

type getWordsConfig = {
	lang: LangParams;
	type?: 'quotes' | 'words';
	isPunctuation?: boolean;
	isNumber?: boolean;
};
