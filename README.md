# Moddue

React + TypeScript application using Vite and React Aria Components. The app page is blank. Reusable components remain in `src/components`.

## Development

Use Node.js 24 LTS and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. The previous catalogue page has been removed. Future personal previews should contain only components and sliders, without headers, sidebars, marketing text or specification panels.

## Components

`src/components/Button/Button.tsx` exports the shared `Button` and its types. Use `variant="primary"`, `"secondary"`, `"text"`, `"icon"`, or `"outline"`. Icon buttons require `aria-label` or `aria-labelledby`.

Buttons default to the primary colour and accept `color`, `onColor`, `height`, `width`, `padding` (horizontal), `fontSize`, and `iconSize`. Numeric dimensions are pixels; strings accept CSS lengths. Icon buttons remain square/circular and use `height` as their diameter. `iconPosition` accepts `left` or `right`. Use React Aria's `onPress` and `isDisabled` props for interaction.

Natural width reserves equal icon slots for true label centring. Under constraint, the empty slot shrinks first; longer labels stay on one line and truncate with an ellipsis, preserving the full accessible name. Defaults are 40px height, 14px font, rounded corners with radius equal to 3/8 of height (15px at the default height), 16px icons and 8px icon gap. The minimum useful width must accommodate horizontal padding, borders, an icon and its gap.

Component CSS is colocated with each component and uses prefixed classes and CSS custom properties. This is the convention for this initial component slice; it does not select storage, sync, editor or Android tooling.

Fonts are bundled locally under `public/fonts`, with their copyright and SIL Open Font Licenses. Sources: [Google Sans](https://github.com/google/fonts/tree/main/ofl/googlesans), [Urbanist](https://github.com/google/fonts/tree/main/ofl/urbanist). No runtime font CDN is required.

## Validation

```sh
npm run typecheck
npm run build
```

Automated test tooling has not been selected. When a component preview is requested, validate it in a browser at desktop and narrow widths: natural-width labels are centred, constrained labels account for the icon, long labels stay on one line and truncate, circles remain circular, colours/sizes update and radius follows height × 3/8, disabled buttons cannot activate, and Tab/Enter/Space expose focus and activate enabled buttons. Browser resizing does not replace Android or screen-reader acceptance testing. Product features have not been implemented.

App touch areas must be at least 48×48, including 40px visible buttons. Reserve non-overlapping layout space for expanded hit regions when integrating app screens. Mobile visual defaults may be larger but are not confirmed; Android touch validation remains outstanding.
