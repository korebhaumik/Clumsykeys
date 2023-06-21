// export interface TestConfig<T, D> {
// 	punctuations: boolean;
// 	numbers: boolean;
// 	type: T;
// 	due: D;
// 	language: LangType;
// }

// export type Time = 'time';
// export type TimeRange = 30 | 15 | 60 | 120;
// export type Words = 'words';
// export type WordsRange = '25' | '50' | '100' | '200' | number;
// export type Quote = 'quote';
// export type QuoteRange = 'Random Quotes' | 'Famous Quotes' | 'Programming Quotes' | string;

export type LangType = 'english' | 'english 1k' | 'english 5k';

export type QuotesParams = 'Random Quotes' | 'Famous Quotes' | 'Movie Quotes';
export type LangParams =
	| 'english'
	| 'english 5k'
	| 'english 1k'
	| 'code javascript'
	| 'code python'
	| 'hindi';

export type Counter = 'time' | 'words' | 'quotes';
export type CounterParams = {
	time: number;
	words: number;
	quotes: QuotesParams;
};

export type NewTextConfig = {
	punctuations: boolean;
	numbers: boolean;
	language: { isHighlighted: boolean; value: LangParams };
	time: { isHighlighted: boolean; value: number };
	words: { isHighlighted: boolean; value: number };
	quotes: { isHighlighted: boolean; value: QuotesParams };
};

//Modal Types
export type ModalContentParams =
	| 'theme'
	| 'counter'
	| 'language'
	| 'menu'
	| 'testType'
	| 'timeCounter'
	| 'wordsCounter'
	| 'quotesCounter';
export type ModalCounterParams = 'time' | 'words' | 'quotes';

export type ModalConfig = {
	isVisible: boolean;
	content: ModalContentParams;
	counter: 'time' | 'words' | 'quotes';
};
