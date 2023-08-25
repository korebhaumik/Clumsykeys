import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// export const config = {
// 	runtime: 'edge'
// };

export const GET: RequestHandler = ({ url }) => {
	const limit = Number(url.searchParams.get('limit'));
	const lang = String(url.searchParams.get('lang'));
	const type = String(url.searchParams.get('type'));

	return json({ hello: 'world' });
};
