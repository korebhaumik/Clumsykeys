// src/routes/+layout.ts
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { Database } from '../types/supabase';
import type { Fetch } from '@supabase/supabase-js/dist/module/lib/types';
import type { Session } from '@supabase/supabase-js';
// import type { Session } from '@supabase/supabase-js'

interface Props {
	fetch: Fetch;
	data: {
		session: Session | null;
	};
	depends: (key: string) => void;
}

export const load = async ({ fetch, data, depends }: Props) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient<Database>({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data?.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	return { supabase, session };
};
