<a href="https://clumsy-keys.vercel.app/">
    <h1>Clumsy Keys</h1>
</a>
<p >
  Clumsykeys is a fun and interative typing sim that helps you improve your typing speed and accuracy.
</p>

<p >
  <a href="#description"><strong>Description</strong></a> ·
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#key-functionality"><strong>Key functionality</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a> ·
</p>
<br/>

## Description

Clumsykeys is an interactive web interface that helps to improve your typing speed and accuracy. The web-app leverages the high performant capabilities of the [Svelte](https://svelte.dev/) to provide a smooth and responsive experience. The project is implemented in a [TypeScript](https://www.typescriptlang.org/) environment and hosted on [Vercel](https://vercel.com).


**Link:** [https://clumsy-keys.vercel.app/](https://clumsy-keys.vercel.app/)

<img width="1392" alt="clumsy-keys website base image" src="https://github.com/korebhaumik/Clumsykeys/assets/106856064/529757ae-e126-45c7-94de-0d79b854f3e6">
<img width="1392" alt="clumsy-keys website result image" src="https://github.com/korebhaumik/Clumsykeys/assets/106856064/9b113e55-3ef2-4cb4-a6b0-20d85f78560a">

## Features

- [Sveltekit](https://kit.svelte.dev/) App Router
- Svelte 3.x and [Typescript](https://vercel.com/ai) for reliable and fast development
- [Vercel Edge Adapter]() for Edge runtime compatibility
- User Interface and Experience
  - Design is built from scratch using [Figma](https://www.figma.com/)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - Icons from [Heroicons](https://heroicons.com) and [Google Icons](https://fonts.google.com/icons)
- [ChartsJS](https://github.com/remarkjs/react-markdown) for the visualizations.

(Soon to be added 😊)
- [Supabase Auth](https://supabase.com/docs/guides/auth), [Github OAuth](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps), [Google OAuth](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps) for authentication and authorizing users.
- [Supabase DB](https://supabase.com/docs/guides/database) as the database solution.
- [StripeJS](https://stripe.com/docs/js) for payment processing.

## Key Functionality

- Realtime typing speed (wpm) and accuracy calculations.
- Ability to practice text with punctuations, special characters and numbers.
- Time and word counter to personalize the typing experience.
- Input history your tracking typing speed for each word after every test.
- Chart to visualize your typing speed, accuracy and errors over time.

Support for the following languages are currently available:
1. English
2. English_1K
3. English_5K
4. Code Javascript
5. Code Python

Quotes are randomly generated from the `Quotes.json` file.

## Running locally

You will need to have the necessary environment variables setup in your `.env` file.
This include keys for your Supabase account, and Stripe account, Github Outh Client, Github Outh Secret. 
    
```bash
HOST =
SUPABASE_URL =
SUPABASE_ANON_KEY =
STRIPE_PUBLISHABLE_KEY =
STRIPE_WEBHOOK_KEY =
STRIPE_SECRET_KEY =
GITHUB_CLIENT_ID =
GITHUB_CLIENT_SECRET =
```

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control access to your authentication provider accounts.

1. Install run: `pnpm i`
2. Make a new `.env` file.
3. Populate the `.env` file with the necessary environment variables.

```bash
pnpm run dev
```

Your app template should now be running on [localhost:5173](http://localhost:5173/).

## Running locally with docker

```bash
docker login
docker pull korebhaumik/clumsy-keys.
docker run -env-file .env -p 3000:3000 korebhaumik/clumsy-keys
```

> Note: If the docker image is not available (repo is privated), you can build it locally by running `docker build -t clumsy-keys.` in the root directory of the project.

