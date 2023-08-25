import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { PageLoad } from './$types.js';
import type { Database } from '../../types/supabase.js';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';

export async function load({ parent, depends, fetch }) {
	const { session } = await parent();
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient<Database>({
		supabaseUrl: PUBLIC_SUPABASE_URL as string,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY as string,
		event: { fetch },
		serverSession: session
	});

	if (!session) return { session, supabase, userInstance: null };
	// console.log(session.user);
	let { data: userInstance, error } = await supabase
		.from('users')
		.select('*')
		.eq('email', session?.user.email);
	if (userInstance?.length) return { session, supabase, userInstance };
	let username = 'anonymous';
	if (session.user.user_metadata.user_name) username = session.user.user_metadata.user_name;
	else username = session.user.email?.match(/(.*)@/)?.[1] ?? 'anonymous';
	const { data } = await supabase
		.from('users')
		.insert({
			username: username as string,
			email: session.user.email as string,
			pb: JSON.stringify({
				'15sec': {
					wpm: null,
					acc: null
				},
				'30sec': {
					wpm: null,
					acc: null
				},
				'60sec': {
					wpm: null,
					acc: null
				},
				'25words': {
					wpm: null,
					acc: null
				},
				'50words': {
					wpm: null,
					acc: null
				},
				'100words': {
					wpm: null,
					acc: null
				}
			})
		})
		.select('*');
	return { session, supabase, userInstance: data };
}
