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

// export const count = writable(0);
export const theme = writable('cardboard' as 'cardboard' | 'dark-forest' | 'sapphire');

export const newTextConfig = writable({
	punctuations: false,
	numbers: false,
	language: { isHighlighted: true, value: 'english 5k' },
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

export function updateModalVisibility() {
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
	game.update(prev => state);
}

export const wordsDataArr = writable([] as wordsDataType[]);

export const timeDataArr = writable([
	{
		time: 1,
		correctChars: 0,
		rawChars: 0,
		incorrectChars: 0,
		wpm: -1,
		raw: -1
	}
] as timeDataType[]);

// export const TimerCount = writable(-1 as number);
// export const TimerCount = writable(30 as number);
// export const WordCount = writable(50 as number);
// export const WordIndex = writable(0 as number);

// export const count = writable(0 as number);
let tempCount = 0;

// export function createTimer() {
// 	const intervalId = setInterval(() => {
// 		// console.log(`Count: ${count}`);
// 		timeDataArr.update(prev => {
// 			return [...prev, {
// 				//Change value of 20
// 				time: tempCount === 0 ? 1 : tempCount,
// 				correctChars: 0,
// 				rawChars: 0,
// 				incorrectChars: 0,
// 				wpm: -1,
// 				raw: -1
// 			}]
// 		});
// 		tempCount++;
// 		count.set(tempCount);
// 	}, 1000);
// 	return intervalId;
// }


// export function resetTest() {
// 	// TimerCount.set(-1);
// 	// WordCount.set(50);
// 	// clearInterval()
// 	WordIndex.set(0);
// 	count.set(0);
// 	wordsDataArr.set([]);
// 	timeDataArr.set([
// 		{
// 			time: 1,
// 			correctChars: 0,
// 			rawChars: 0,
// 			incorrectChars: 0,
// 			wpm: -1,
// 			raw: -1
// 		}
// 	]);
// 	game.set('waiting');
// }



