import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import english from './languages/english.json';
import js from './languages/code_javascript.json';
import python from './languages/code_python.json';
import hindi from './languages/hinglish.json';
import pureHindi from './languages/hindi.json';

export const GET: RequestHandler = ({ url }) => {
  const limit = Number(url.searchParams.get('limit'));
  const lang = Number(url.searchParams.get('lang'));
  const words = english.words.slice(0, limit).sort(() => 0.5 - Math.random());

  // const words = python.words.slice(0, limit).sort(() => 0.5 - Math.random());
  // const words = js.words.slice(0, limit).sort(() => 0.5 - Math.random())
    // const words = pureHindi.words.slice(0, limit).sort(() => 0.5 - Math.random())
    // const words = hindi.words.slice(0, limit).sort(() => 0.5 - Math.random())
  return json(words);
};
