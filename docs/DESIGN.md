# Moddue Design

## Colours

Brand colour: **Indigo `#4F46E5`**.

| Role | Light mode | Dark mode |
|---|---|---|
| Background | `#F8FAFC` | `#0E141F` |
| Main text | `#0E141F` | `#F8FAFC` |
| Cards and editor | `#FFFFFF` | `#182233` |
| Primary buttons | `#4F46E5` | `#4F46E5` |
| Button text | `#FFFFFF` | `#FFFFFF` |
| Logo, links and selected icons | `#4F46E5` | `#A5B4FC` |
| Selected-item backgrounds | `#EEF2FF` | `#25234B` |
| Progress and completion | `#0F766E` | `#6CCFC4` |
| Completion backgrounds | `#D1FAE5` | `#153D3A` |
| Secondary text | `#475569` | `#94A3B8` |
| Borders and dividers | `#E2E8F0` | `#334155` |

## Shapes

Use standard rounded corners. For buttons, the corner radius is always **3/8 of the button height**: 40px height gives 15px radius. Icon-only buttons are circular (50% radius). Form-field radius is **3/8 of the single-line field height**. At the default 52px field height, all four field types use 19.5px corners. Button radius remains based on button height, independently.

## Typography

Sans-serif only:

- **Urbanist Bold (700):** brand wordmark and headings.
- **Google Sans:** body text and interface controls. Use tabular numbers for aligned numeric displays.

The wider type scale remains open; component defaults are specified below. Retain the font's copyright and SIL Open Font License when bundling it.

Form-field labels use title case (including the displayed optional suffix) and Google Sans grade 100 (`'GRAD' 100`). Load the full variable font so its grade axis is available. Label size remains 12px.

## Buttons — confirmed style

Personal component previews contain only the requested components and sliders, without headers, sidebars, decorative sections or specification panels. Design values live in this document.

Use `src/components/Button/Button.tsx`, built on React Aria Components. Five treatments share the same interaction and layout: primary (filled), secondary (tonal), text, icon only (circular filled), and outline. The default colour is primary; custom colour/foreground and dimensions are supported. Component styles use colocated CSS Modules (`Button.module.css`) with local class names and CSS custom properties. Font declarations, shared tokens and document defaults remain global CSS.

The user confirmed these button defaults on 19 November 2026. This does not finalise the product-wide type/spacing scale:

| Property | Default |
|---|---|
| Minimum height / circular diameter | 40px |
| Horizontal padding | 20px; circular buttons use 0 |
| Vertical padding at the default height | 7.5px, plus 2px border per side |
| Corners | Standard rounded corners, height × 3/8 (15px at 40px height) |
| Circular corners | 50%, always round |
| Label | Google Sans 600, 14px, 21px line height |
| Icon size / stroke / gap | 16px / 2px / 8px |
| Outline | 2px solid button colour |
| Other borders | 2px transparent, for consistent sizing |
| Tonal background | 10% button colour mixed with 90% surface |
| Hover / pressed overlay | 8% / 14% foreground |
| Keyboard focus | 2px button-colour ring, 3px offset |
| Disabled | 38% opacity; activation disabled |
| Shadow / motion | None |

User-defined layout rule: accept an icon at the left or right; centre the label against the whole button whenever space permits. Natural width grows with the label and reserves a matching icon slot on each side. At constrained widths, the empty slot collapses first, then the single-line label truncates with an ellipsis. The full label remains the accessible name. No icon is duplicated or exposed to assistive technology as label content. Icon-only buttons require an accessible name.

The reusable button implementation and confirmed specifications remain; the page now previews the requested form fields. Custom light fills may need an explicit dark `onColor` to maintain contrast.

### App touch areas and mobile sizing

- App touch areas must be at least **48 × 48** (CSS pixels in the shared web UI, density-independent units for native adapters), including circular buttons.
- The 40px default is the visible button height, not permission to use a 40px touch area in an app. App integration must provide enough reserved layout space and an expanded hit area, with no overlap with neighbouring controls. Test touches in the expanded region as well as visible bounds.
- Mobile visual defaults may be larger, but are **not confirmed**. Do not silently change the agreed 40px/14px base defaults or treat catalogue/browser checks as Android touch acceptance.
- Real Android touch-target validation remains acceptance work when app screens are built.

Button radius follows button height automatically.

Google Sans and Urbanist are bundled through `@fontsource-variable/google-sans` and `@fontsource-variable/urbanist`, with copyright and SIL Open Font Licenses included in the packages. `src/main.tsx` imports the full Google Sans variable face (including the grade axis) and the Urbanist normal variable face; `src/fonts.css` defines body/heading font tokens. The bundled fonts work without runtime font CDN requests. Broader typography and real Android/screen-reader validation remain open.

Use the shared `Icon` component from `src/components/Icon.tsx` for Tabler icons, including button icons: `<Button icon={<Icon icon={IconPlus} />}>Add</Button>`. It defaults to size 16 and stroke 2; pass `size` or `stroke` explicitly to override. Button icons remain optional and support left/right placement. Raw third-party icon elements retain their own defaults.

## Form fields — current specification

Reusable components live in `src/components/Fields`: `TextField.tsx`, `Selector.tsx`, `DatePicker.tsx` and `TimePicker.tsx`. They use React Aria Components directly, shared CSS Module styles and Tabler icons.

| Property | Default / rule |
|---|---|
| Single-line control height | 52px |
| Content font | Google Sans, 16px |
| Corners | Height × 3/8: 19.5px at 52px height |
| Content left inset | 16px padding inside the 2px border: 18px from the outer edge |
| Label | Title Case, 12px, 16px line height, grade 100 (`'GRAD' 100`) |
| Label alignment | 14px left margin + 4px padding: text aligns with the content |
| Border | 2px solid #94A3B8 |
| Hover border | #475569, 2px |
| Focus border | Primary #4F46E5, 2px, without an additional field outline |
| Invalid border / error text | #B42318 |
| Field and calendar-navigation icons | Tabler, 20×20px, 2px strokes |
| Picker / clear icon buttons inside fields | Square: max(48px, field height − 4px), with no padding |
| Supporting text | 12px, 18px line height; minimum 18px only while text is displayed |

Field dimensions are independent of button dimensions. At 52px field height, picker icon buttons are 48×48; at 64px they are 60×60. Hover corners follow the field radius and are clipped by the control. Nested icon buttons rely on the field focus border; standalone popup controls retain their own keyboard focus indicators.

### Required fields and supporting messages

All four components default to `isRequired={true}`. Parents can set `isRequired={false}` to display “(Optional)” beside the label, with corresponding native/ARIA semantics. Parents supply `description` for help and `isInvalid` / `errorMessage` (or React Aria validation) for errors. Errors replace help visually; long messages wrap. Empty supporting areas collapse completely, including their layout gap. Messages stay associated with the field through React Aria slots.

### Popovers

- Every selector, calendar and time popup uses 8px padding and a 2px #E2E8F0 border.
- Outer radius matches the originating field: 19.5px by default. Inner item radius is `max(0px, outer radius − padding)`: 11.5px by default.
- All popup text follows the field content font size, including selector options, calendar heading/weekdays/dates and time headings/digits/colon. `useFieldPopoverStyle` forwards font size and radius through the body portal and keeps them in sync with the field.
- Selector cards match trigger width. Date/time cards use their content width and are constrained to the viewport. The date popup aligns to the right of its field (`bottom end`), with viewport collision handling.
- Selector rows and calendar cells have 4px gaps. Selected options use primary #4F46E5 with white text; hover/focus uses tonal #EEF2FF. Keyboard focus remains visible.
- Selector chevrons rotate 180 degrees while open. Popovers support Escape, outside dismissal and focus return. Enter confirms picker selections; Enter on a time wheel closes the popup.

### Date picker

The editable field has keyboard date segments and an optional clear action. The calendar has a 360px grid: seven 48px day targets with six 4px gaps, plus popup padding, borders and scrollbar gutter. Narrow viewports can scroll inside the popup to preserve day targets without page overflow. Calendar navigation icons use the shared 20px icon size.

Today's date has a 2px inset primary marker. Keyboard focus uses one aria-hidden 2px moving frame following the focused cell. It slides over 140ms with `cubic-bezier(.16, 1, .3, 1)` and follows day/month/year navigation. React Aria owns navigation, selection and announcements.

### Time picker

The field uses 24-hour keyboard segments with minute precision. Its popup has two looping wheels inside `TimePicker.tsx`, separated by a colon. Each wheel is 88px wide, the colon column is 12px, and column gaps are 8px. Five 48px rows are visible with the centre row selected. The selected band is tonal, without a border or shadow; selected digits use primary.

Hour and Minute headings are horizontally and vertically centred in 30px minimum-height rows and use Google Sans grade 100. Their font size follows the field content size.

Each mouse/trackpad wheel event advances one digit, independently of pixel delta. Touch scrolling uses snapping and updates the selected value as the centred row changes; settling only recentres the repeated rows, so dismissing the popup cannot discard the latest selection. Pointer selection, Arrow Up/Down, Page Up/Down, Home and End are supported. Hours wrap 23 ↔ 00 and minutes 59 ↔ 00 independently. Stepping animates over 160ms with an ease-out curve; repeated cycles and recentering support continuous looping. Keyboard focus on a wheel has a distinct 2px indicator.

All motion honours reduced-motion preferences.

### Preview and scope

`App.tsx` displays title, module/type selectors, deadline/time and height/font sliders. Height starts at 52px (slider 48–64px); font size starts at 16px (slider 14–20px). Radius follows height and has no independent slider. Title and task type are required; module, date and time are explicitly optional. Other module reveals a text field. Title validation appears on blur.

Reference behaviour: [old Android AddTaskPage](https://github.com/yujiankoh/modulo/blob/main/app/app/src/main/java/com/example/modulo/pages/AddTaskPage.kt) and [web task form](https://github.com/yujiankoh/modulo/blob/main/web/task.js). Module options are fixtures. Selecting a date with no time sets 23:59; clearing the date clears/disables time. Clearing only time leaves it omitted for the eventual domain to apply the 23:59 rule.

Date/time values use React Aria types and the direct `@internationalized/date` dependency (3.12.4, Apache-2.0). The preview has temporary state, without task saving, persistence, sync or full timezone/instant conversion. Functional acceptance remains separate from component demonstration.

Browser checks cover default 52px/16px fields, 19.5px radius, square picker buttons at 52px and 64px field heights, popup font sizing, empty supporting-area collapse, visible help/errors, keyboard confirmation, date navigation, looping time selection and representative narrow layouts. Typecheck and production build pass; the build reports a main-chunk size warning. Real Android lifecycle/touch/inertia/input and screen-reader acceptance remain outstanding. Wider screen design, typography and mobile-specific visual defaults remain open.
