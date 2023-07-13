import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import english from './languages/english.json';
import english1k from './languages/english_1k.json';
import english5k from './languages/english_5k.json';
import js from './languages/code_javascript.json';
import python from './languages/code_python.json';
import hindi from './languages/hinglish.json';
import english_quotes from './quotes/english_quotes.json';
import pureHindi from './languages/hindi.json';

export const config = {
	runtime: 'edge'
};

export const GET: RequestHandler = ({ url }) => {
	const limit = Number(url.searchParams.get('limit'));
	const lang = String(url.searchParams.get('lang'));
	const type = String(url.searchParams.get('type'));
	const isPunctuation = String(url.searchParams.get('isPunctuation'));
	const isNumber = String(url.searchParams.get('isNumber'));

	let words: string[] = [];
	// console.log(lang)
	if (type === 'quotes') {
		const quoteId = Math.floor(Math.random() * english_quotes.quotes.length);
		const words = english_quotes.quotes[quoteId].text.split(' ');
		return json(words);
	}

	if (lang === 'english') words = english.words.slice(0, limit).sort(() => 0.5 - Math.random());
	if (lang === 'english 1k')
		words = english1k.words.slice(0, limit).sort(() => 0.5 - Math.random());
	if (lang === 'english 5k') words = english5k.words.slice(0, 1000).sort(() => 0.5 - Math.random());
	if (lang === 'code python') words = python.words.slice(0, limit).sort(() => 0.5 - Math.random());
	if (lang === 'code javascript') words = js.words.slice(0, limit).sort(() => 0.5 - Math.random());
	if (lang === 'hindi') words = hindi.words.slice(0, limit).sort(() => 0.5 - Math.random());

	// else { words = english.words.slice(0, limit).sort(() => 0.5 - Math.random()); }

	if (isPunctuation === 'true') {
		let k = 0;
		for (let i = 0; i < words.length / 4; i++) {
			let temp = k + Math.floor(Math.random() * 4);
			words[temp] = words[temp] + super_common_punctuations[Math.floor(Math.random() * 6)];
			k += 4;
		}
	}

	if (isNumber === 'true') {
		let t = 0;
		for (let i = 0; i < words.length / 5; i++) {
			let tempNum = getRandomNum();
			let tempIndex = t + Math.floor(Math.random() * 5);
			words.splice(tempIndex, 0, tempNum.toString());
			t += 5;
		}
	}
	// console.log(words);
	return json(words);
};

//  const all_punctuations = ['.', ',', ';', ':', '?', '!', '-', '(', ')', '[', ']', '{', '}', '\'', '\"', '`', '~', '@', '#', '$', '%', '^', '&', '*', '_', '+', '=', '\\', '|', '/', '<', '>']
// const common_punctuations = ['.', ',', ';', ':', '?', '!', '-', '(', ')', '[', ']', '{', '}']
const super_common_punctuations = ['.', ',', ';', ':', '?', '!'];

const numType = [1, 2, 3, 4];
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
