import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
//@ts-ignore
import english from './languages/english.json';

export const GET: RequestHandler = ({ url }) => {
  const limit = Number(url.searchParams.get('limit'));
  const words = english.words.slice(0, limit).sort(() => 0.5 - Math.random());
  // const words = js.words.slice(0, limit).sort(() => 0.5 - Math.random())
  //   const words = hindi.words.slice(0, limit).sort(() => 0.5 - Math.random())
  //   const words = hinglish.words.slice(0, limit).sort(() => 0.5 - Math.random())
  return json(words);
};
