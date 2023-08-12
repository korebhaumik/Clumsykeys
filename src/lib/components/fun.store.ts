import { writable } from "svelte/store";

export let inputEl = writable({} as HTMLInputElement);
export let footerEl = writable({} as HTMLElement);
export let contentEl = writable({} as HTMLElement);
export let contentHeight = writable(0 as number);

export const theme = writable('dark-forest' as 'cardboard' | 'dark-forest' | 'sapphire');