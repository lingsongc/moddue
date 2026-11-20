# Moddue

React + TypeScript application using Vite and React Aria Components. The page is a minimal form-field preview. Reusable components remain in `src/components`.

## Development

Use Node.js 24 LTS and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. The page contains text/date/time fields, module/type selectors and adjustment sliders. Preview values are temporary and do not save tasks. No headers, sidebar or specification panels are included.

## Components

`src/components/Button/Button.tsx` exports the shared `Button` and its types. Use `variant="primary"`, `"secondary"`, `"text"`, `"icon"`, or `"outline"`. Icon buttons require `aria-label` or `aria-labelledby`.

Buttons default to the primary colour and accept `color`, `onColor`, `height`, `width`, `padding` (horizontal), `fontSize`, and `iconSize`. Numeric dimensions are pixels; strings accept CSS lengths. Icon buttons are rounded squares, use `height` for both sides, and follow the same height × 3/8 corner radius as every other variant. `iconPosition` accepts `left` or `right`. Use React Aria's `onPress` and `isDisabled` props for interaction.

Natural width reserves equal icon slots for true label centring. Under constraint, the empty slot shrinks first; longer labels stay on one line and truncate with an ellipsis, preserving the full accessible name. Defaults are 40px height, 14px font, rounded corners with radius equal to 3/8 of height (15px at the default height), 16px icons and 8px icon gap. The minimum useful width must accommodate horizontal padding, borders, an icon and its gap.

Component CSS is colocated with each component and uses CSS Modules and CSS custom properties. This is the current component convention; it does not select storage, sync, editor or Android tooling.

Fonts are bundled through `@fontsource-variable/google-sans` (full variable face, including grade) and `@fontsource-variable/urbanist`, with their copyright and SIL Open Font Licenses. Sources: [Google Sans](https://github.com/google/fonts/tree/main/ofl/googlesans), [Urbanist](https://github.com/google/fonts/tree/main/ofl/urbanist). No runtime font CDN is required.

## Validation

```sh
npm run typecheck
npm run build
```

Automated test tooling has not been selected. When a component preview is requested, validate it in a browser at desktop and narrow widths: natural-width labels are centred, constrained labels account for the icon, long labels stay on one line and truncate, icon-only buttons stay square, colours/sizes update and every button radius follows height × 3/8, disabled buttons cannot activate, and Tab/Enter/Space expose focus and activate enabled buttons. Browser resizing does not replace Android or screen-reader acceptance testing. Product features have not been implemented.

App touch areas must be at least 48×48, including 40px visible buttons. Reserve non-overlapping layout space for expanded hit regions when integrating app screens. Mobile visual defaults may be larger but are not confirmed; Android touch validation remains outstanding.

Form-field components live in `src/components/Fields` with shared CSS Module styles. Date/time values use React Aria types and `@internationalized/date`; date selection defaults the optional time to 23:59. See `docs/DESIGN.md` for field defaults and validation scope.

Fields default to 52px height and 16px content text, with rounded corners equal to 3/8 of height (19.5px). Labels use Title Case, 12px Google Sans and grade 100, aligned with content. Fields are required by default. Pass `isRequired={false}` for the automatic “(Optional)” label, `description` for supporting text, and `isInvalid`/`errorMessage` for errors. Supporting areas collapse completely when there is no displayed help or error.

Borders and focus indicators are 2px. Field icons are Tabler 20×20px with 2px strokes; button icons default to 16×16px with 2px strokes. Date/time icon buttons remain square as field height grows (48×48 at 52px; 60×60 at 64px). App touch targets are at least 48×48.

All popovers use 8px padding, matching field radius and content font size. Inner radius is outer radius minus padding. Selector cards match field width; date/time popups use content width within viewport bounds. Selected options are primary-filled and hover is tonal. Selector arrows rotate while open. The calendar aligns right and uses a 2px today marker and an animated keyboard focus frame. Time wheels loop in both directions, animate with an ease-out curve, step one digit per wheel event, and support touch snapping and keyboard input. Motion honours reduced-motion preferences.
