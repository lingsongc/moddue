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

Use standard rounded corners. For buttons, the corner radius is always **3/8 of the button height**: 40px height gives 15px radius. Icon-only buttons are circular (50% radius).

## Typography

Sans-serif only:

- **Urbanist Bold (700):** brand wordmark and headings.
- **Google Sans:** body text and interface controls. Use tabular numbers for aligned numeric displays.

Google Sans weights and the type scale remain open. Retain the font's copyright and SIL Open Font License when bundling it.

## Buttons — confirmed style

Explore reusable components directly in React. Latest instruction, 19 November 2026: the previous catalogue page is deleted. Future personal previews must contain only the requested components and sliders, without headers, sidebars, decorative sections or detailed specification panels. Keep design values documented here.

Use `src/components/Button/Button.tsx`, built on React Aria Components. Five treatments share the same interaction and layout: primary (filled), secondary (tonal), text, icon only (circular filled), and outline. The default colour is primary; custom colour/foreground and dimensions are supported. Component styles use colocated CSS Modules (`Button.module.css`) with local class names and CSS custom properties. Font declarations, shared tokens and document defaults remain global CSS.

The user confirmed these button defaults on 19 November 2026. This does not finalise the product-wide type/spacing scale:

| Property | Default |
|---|---|
| Minimum height / circular diameter | 40px |
| Horizontal padding | 20px; circular buttons use 0 |
| Vertical padding at the default height | 8.5px, plus 1px border per side |
| Corners | Standard rounded corners, height × 3/8 (15px at 40px height) |
| Circular corners | 50%, always round |
| Label | Google Sans 600, 14px, 21px line height |
| Icon size / stroke / gap | 16px / 1.8px / 8px |
| Outline | 1px solid button colour |
| Other borders | 1px transparent, for consistent sizing |
| Tonal background | 10% button colour mixed with 90% surface |
| Hover / pressed overlay | 8% / 14% foreground |
| Keyboard focus | 2px button-colour ring, 3px offset |
| Disabled | 38% opacity; activation disabled |
| Shadow / motion | None |

User-defined layout rule: accept an icon at the left or right; centre the label against the whole button whenever space permits. Natural width grows with the label and reserves a matching icon slot on each side. At constrained widths, the empty slot collapses first, then the single-line label truncates with an ellipsis. The full label remains the accessible name. No icon is duplicated or exposed to assistive technology as label content. Icon-only buttons require an accessible name.

The app page is currently blank; the reusable button implementation and confirmed specifications remain. Custom light fills may need an explicit dark `onColor` to maintain contrast.

### App touch areas and mobile sizing

- App touch areas must be at least **48 × 48** (CSS pixels in the shared web UI, density-independent units for native adapters), including circular buttons.
- The 40px default is the visible button height, not permission to use a 40px touch area in an app. App integration must provide enough reserved layout space and an expanded hit area, with no overlap with neighbouring controls. Test touches in the expanded region as well as visible bounds.
- Mobile visual defaults may be larger, but are **not confirmed**. Do not silently change the agreed 40px/14px base defaults or treat catalogue/browser checks as Android touch acceptance.
- The app page is currently blank; app touch-target integration and real Android testing remain acceptance work when app screens are built.

The temporary comparison and catalogue UI have been removed. Button height changes derive the radius automatically.

Google Sans and Urbanist are bundled through `@fontsource-variable/google-sans` and `@fontsource-variable/urbanist`, with copyright and SIL Open Font Licenses included in the packages. `src/main.tsx` imports their normal variable faces; `src/fonts.css` defines body/heading font tokens. The bundled fonts work without runtime font CDN requests. The former `public/fonts` copies have been removed. Broader typography and real Android/screen-reader validation remain open.

Use the shared `Icon` component from `src/components/Icon.tsx` for Tabler icons, including button icons: `<Button icon={<Icon icon={IconPlus} />}>Add</Button>`. It defaults to size 16 and stroke 1.8; pass `size` or `stroke` explicitly to override. Button icons remain optional and support left/right placement. Raw third-party icon elements retain their own defaults.
