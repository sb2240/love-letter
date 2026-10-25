# Love Letter

A personal, animated letter built with Next.js, React, Tailwind CSS, and Motion.

## Run locally

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

## Personalize

Edit `app/config.ts` to change the recipient name, messages, question, responses,
and button colors. The first greeting uses `herName` automatically.

`successLink` opens WhatsApp with a prefilled reply. Use a full international
number without a plus sign, spaces, or the local leading zero. The current link
uses Nigeria's country code (234). A visitor must press Send in WhatsApp;
choosing Yes on the website does not send a message or store a response.

The background photo is in `public/`. No music is included or requested.
Fonts are Inter and Playfair Display, downloaded at build time by Next.js and
served locally to visitors. Building requires access to Google Fonts.

## Checks and production

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

Navigation is locked during transitions to prevent repeated clicks from skipping
messages. Back and Read again allow rereading. Keyboard focus moves to each new
heading, progress is announced to assistive technology, and reduced-motion
preferences are respected.
