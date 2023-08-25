// src/routes/+layout.server.ts
export const load = async ({ locals: { getSession, supabase } }) => {
	return {
		session: await getSession()
		// supabase: supabase
	};
};
