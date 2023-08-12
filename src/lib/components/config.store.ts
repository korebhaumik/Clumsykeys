import { writable } from 'svelte/store';
import type {
	Counter,
	CounterParams,
	NewTextConfig,
	LangParams,
	ModalConfig,
	ModalContentParams,
	ModalCounterParams
} from './storeTypes';

import { isTimer, TimerCount, WordCount } from './game.store';

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
