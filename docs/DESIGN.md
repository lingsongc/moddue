# Moddue Design

## Component review batch — provisional values

On 20 November 2026 the user authorised Luna agents to implement the shared-component draft before finalising its remaining visual choices. Preserve existing main-page components and append working examples, with compact details such as padding, corner radius and dimensions. No page header, sidebar or decorative catalogue. These examples are review material; provisional values below are not final design approval.

- Selection indicators: 24px rounded squares with 9px radius. Switch: 20px thumb/7.5px radius, 4px rail inset, 48×28px rail/11.5px radius, no decorative rail outline or shadow. The provisional off rail uses a neutral secondary-colour fill so it remains visible against the page; the off thumb uses the surface colour and the selected thumb is white over primary. Hover uses brightness feedback. Reserve at least 48px targets.
- Multiline field: initially three rows, vertically resizable up to eight rows with scrolling; radius remains tied to the single-line field height. The resize cue is a concentric quarter-circle inset 4px from the bottom/right (half the earlier 8px gap). Its radius is outer field radius minus 4px: 15.5px at default field height. Arc and field outline share default/hover/focus/invalid colours. Native resizing remains enabled.
- Dialogs: centred, 400px small/720px large maximum widths, 24px padding/radius, bounded scrolling and visible Close. The React Aria modal boundary matches the visible surface so backdrop dismissal works beside and above it. Footers may contain grouping wrappers/help text; expanded hit areas belong only to actual shared action buttons. This provisional shared example does not settle the calendar's mobile presentation. Dirty dismissal stays with the owner.
- Action menu: 8px popup padding, 16px outer radius, 8px inner radius, at least 48px option rows. User refinement: use compact, vertically centred dots; replace the former Unicode ellipsis with Tabler IconDots through the shared Icon component.
- Tabs: use one segmented treatment for all tabs; remove the underline treatment and its preview. User requested a more visible active background; primary fill with white text is the current review choice. The visible tab box is now 40px high with 15px radius (height × 3/8), with reserved, non-overlapping targets at least 48px high/wide. Missing selection falls back to the first enabled item; owners reconcile controlled selection.
- Status badges: user requested coloured backgrounds instead of outlines and the same rounded-corner rule (3/8 of nominal height), with icons equally inset from the top, left and bottom. Current review dimensions are 32px nominal height, 12px radius, 16px icon, 2px transparent border, 6px top/bottom/left padding and 10px right padding, with 16px text line height. This places the icon 8px from the top/left/bottom at default single-line height. Semantic backgrounds use the existing tone background tokens; neutral uses the border colour as a fill with main-text foreground. Notices retain their separate plain icon/body/action layout.
- Spinner: confirmed 16px/2px geometry; provisional one-second rotation, static under reduced motion. Progress track: 8px high/4px radius. Pending Button retains label and space while replacing/reserving its icon slot.
- Root semantic CSS properties support light/dark themes, including body-portalled overlays. Additional warning/error/info colours remain provisional.
- Dark-theme non-filled button text/borders, selected radio marks and time digits use the light accent; field/button focus uses the focus token. Filled primary and icon-only buttons retain primary with white foreground. All buttons, including icon-only and dialog Close, use rounded corners at height × 3/8; circular buttons are retired.

See `COMPONENT_PLAN_DRAFT.md` for implementation scope and subsequent verification evidence. No product persistence, sync or native acceptance is implied.

Batch verification, 20 November 2026: typecheck, production build and diff checks pass; the main bundle remains above Vite's 500kB warning threshold (622.10kB, gzip 191.43kB). Browser inspection covered desktop and 390px/320px widths, both themes and portalled pickers, checkbox/radio/tab keyboard use, dialog focus and edit recovery, expanded touch-hit regions, stable pending-button widths, progress 0/100/unknown states, multiline Enter and slider-driven field geometry. No automated test runner was added. Native Android, screen readers, IME and real text-scaling checks remain outstanding. These results demonstrate components rather than product acceptance.

Annotation follow-up verification: native textarea dragging in the current Chromium preview changed height from 108px to 181px within the 228px maximum, with the pointer-transparent arc following the corner. Stock grip decoration is hidden using the vendor-specific `::-webkit-resizer`; other browser engines need separate verification. The Tabler menu SVG measures 16×16px with zero horizontal/vertical centre offset. One segmented tab list remains, with keyboard selection and no unnecessary desktop scrollbar. All five badge tones measure 32px high/12px radius, with 8px icon insets. Desktop and 320px light/dark inspection, typecheck/build/diff checks and focused source review pass. The bundle-size warning remains (622.12kB, gzip 191.44kB).

Second geometry pass verification: measured textarea outer radius/arc radius pairs are 19.5px/15.5px at 52px field height and 24px/20px at 64px, with 4px insets. Arc and outline match in default, hover and focus; invalid-state precedence was checked in source review. Icon-only buttons and dialog Close measure 40px/15px radius. Tabs measure 40px/15px radius with a 48px expanded hit region; a click above the visible tab activates it. At 320px viewport width the tab strip has no excess horizontal scrolling. Focused review, typecheck/build/diff checks pass; the existing main-chunk warning remains (622.19kB, gzip 191.47kB). Temporary viewport/field-height changes were restored after browser checks.

Review fixes, 21 November 2026: RadioGroup honours its inherited orientation prop (vertical by default, horizontal options wrap while retaining 48px targets). Browser checks confirmed small/large dialog boundaries at 400px/720px, side/above backdrop dismissal, interactive body fields and actions with a wrapped footer, horizontal/vertical radio layout and arrow selection, and a fitting 320px dialog. Focused review, typecheck/build/diff checks pass; the existing bundle warning remains. The main preview files were unchanged, and the standalone verification fixture was removed after testing.

## Naming

Use **Home** for the landing page, navigation label and page title. The Home-owned unboxed feature-section component is named `HomeWidget`; it is not part of the shared component library. Individual widgets retain their tool names, such as Tasks and Timetable.

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

The calendar day-cell interaction uses a large dialog with date, previous/next-day controls, deadlines and Add task. Task details replace its body with a Back action. Add task navigates to its dedicated page with the date prefilled; it is not a dialog form. On phone, the user is deciding between a bottom drawer and a large centred dialog; neither is approved yet. The shared-component plan is `COMPONENT_PLAN_DRAFT.md`; Kanban/calendar feature implementation is outside that plan.

Mobile full-board tasks use tap-only status tabs: Not started, In progress and Completed (two tabs when In progress is disabled). Task-card swipes change status: right advances one active status, left goes back one, and both stop at the ends without wrapping. A fast swipe or sufficient travel commits immediately; a short slow swipe snaps back without changing status. Gesture thresholds and feedback remain to be specified and validated on device. Keep a non-gesture status action. Home widget presentation is separate and remains open.

The ring loading spinner follows button-icon rules: 16px default size, 2px stroke, current foreground and 8px gap to the button label, respecting icon-size overrides and reduced motion. Spinner placement while loading remains open. The text-badge mockup is not final and will be redesigned; no replacement or unmentioned component style has been approved.

Confirmed layout rule: **no nested cards**. Use spacing, headings and dividers to group content within a surface instead of placing one card inside another. For the task Kanban board, keep columns as unboxed layout groups so task cards are not enclosed by column cards.

Home widgets are **unboxed feature sections**, separated from neighbouring widgets with spacing. Each has the tool title (for example Tasks or Timetable), a button to open that tool's page, and the content below. Do not enclose widgets in cards or add outer card backgrounds, borders or shadows. The Home-owned structure is named `HomeWidget`; exact header-action appearance, spacing and content layouts remain open. Its implementation belongs to Home feature work; see `PLAN.md` §6.6 and `TIMELINE.md` M11.

The notice mockups need redesign, alongside text badges. Neither the side-marker nor tinted notice is an approved final treatment. Keep their functional accessibility/announcement requirements while exploring replacement visuals.

Use standard rounded corners. For every button variant, including square icon-only buttons, the corner radius is **3/8 of the button height**: 40px height gives 15px radius. Circular buttons are no longer used. Form-field radius is **3/8 of the single-line field height**. At the default 52px field height, all four field types use 19.5px corners. Button radius remains based on button height, independently.

## Selection controls — confirmed direction, dimensions open

Include shared Checkbox, Switch and RadioGroup components. Checkbox indicators and switch thumbs follow the rounded-square shape direction. Radios use a rounded-square outline with a smaller filled rounded square when selected; exact dimensions, inset and state colours remain open. Preserve each control's checkbox/switch/radio semantics regardless of custom geometry.

The switch rail is a background-colour surface, with inset padding and related corner radii rather than a decorative border/shadow. The separate 2px keyboard focus indicator remains required. Follow the established 3/8-of-height rounded-square direction for the thumb/checkbox; final visible dimensions, marks, colours, rail padding/width and the rail's nested-radius relationship must be specified before implementation. Do not assume field/popover padding applies to the rail. Minimum touch targets remain 48×48 even when visible indicators are smaller.

## Typography

Sans-serif only:

- **Urbanist Bold (700):** brand wordmark and headings.
- **Google Sans:** body text and interface controls. Use tabular numbers for aligned numeric displays.

The wider type scale remains open; component defaults are specified below. Retain the font's copyright and SIL Open Font License when bundling it.

Form-field labels use title case (including the displayed optional suffix) and Google Sans grade 100 (`'GRAD' 100`). Load the full variable font so its grade axis is available. Label size remains 12px.

## Buttons — confirmed style

Personal component previews contain only the requested components and sliders, without headers, sidebars, decorative sections or specification panels. Design values live in this document.

Use `src/components/Button/Button.tsx`, built on React Aria Components. Five treatments share the same interaction and layout: primary (filled), secondary (tonal), text, icon only (rounded-square filled), and outline. The default colour is primary; custom colour/foreground and dimensions are supported. Component styles use colocated CSS Modules (`Button.module.css`) with local class names and CSS custom properties. Font declarations, shared tokens and document defaults remain global CSS.

The user confirmed these button defaults on 19 November 2026. This does not finalise the product-wide type/spacing scale:

| Property | Default |
|---|---|
| Minimum height / icon-only side | 40px |
| Horizontal padding | 20px; icon-only buttons use 0 |
| Vertical padding at the default height | 7.5px, plus 2px border per side |
| Corners | Standard rounded corners, height × 3/8 (15px at 40px height) |
| Icon-only corners | Height × 3/8, matching all other button variants |
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

- App touch areas must be at least **48 × 48** (CSS pixels in the shared web UI, density-independent units for native adapters), including icon-only buttons.
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
