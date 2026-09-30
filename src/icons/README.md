# Fretara icons

92 individual React SVG components: 66 Line and 26 Fill. No icon dependency, runtime name lookup, custom size variants, or changes to existing components.

```tsx
import { PlusIcon, StarFillIcon, CheckmarkIcon } from './icons'
// Direct imports are also supported:
import { PlusIcon as DirectPlusIcon } from './icons/line/PlusIcon'

<PlusIcon aria-hidden="true" width={20} height={20} />
<StarFillIcon style={{ color: 'var(--primary-300)' }} />
<CheckmarkIcon aria-label="Saved" />
```

## API and accessibility

Each component accepts React `SVGProps<SVGSVGElement>` including native dimensions, className, style, ref (React 19), and ARIA attributes. SVG children are supported for consumer-supplied title/description elements. Icons default to decorative (`aria-hidden=true`). `aria-label` or `aria-labelledby` makes the default role `img` and removes the default hiding. Explicit native attributes override defaults. A title child alone must be paired with `aria-labelledby`, or explicit `aria-hidden={false}` and `role="img"`. No accessible label is hardcoded.

Defaults use the original viewBox and export dimensions. RefreshResetIcon and SendMessageFillIcon have 24 × 25 canvases; all others have 24 × 24. Size these two proportionally if overriding both width and height.

## Geometry and color

Source: [Figma Icons section](https://www.figma.com/design/obfA79k84IcRerE44fUqL7/Fretara--NEW-?node-id=4556-2167).

Original SVG path data, transforms, fill rules, opacities, and strokes are retained from Figma exports. Figma’s exporter applies its own numeric serialization; no additional path simplification or rounding is performed. The Line group contains icons already authored as filled vector outlines in Figma; these are deliberately not redrawn as strokes. SendMessageFillIcon and AiChatAssistantIcon retain their native 1.5 strokes with round caps and joins. Unreferenced Figma layer IDs are removed to prevent duplicate DOM IDs.

Black monochrome paints become `currentColor`. UsersFillIcon, PendingClockDashFillIcon, SendMessageFillIcon, and ClipboardCheckFillIcon retain their original 0.4 opacity layers. XmarkCircleFillAlternateIcon and PlayCircleFillIcon keep their fixed Gray 50 backgrounds through the existing `--gray-50` token; load `src/styles/tokens.css` in the consuming application (as the existing app and Storybook do). Their foregrounds inherit currentColor.

GoldFillIcon, SilverFillIcon, and BronzeFillIcon are intentionally multicolor **raster image crops in Figma**, not vectors. Their SVG wrappers use the single original local `assets/medals.png` with exact source image-paint crop transforms. They keep the original colors and do not inherit currentColor. No tracing, recoloring, resampling, or generated replacements are used.

## Naming exceptions

- `xmark.circle.fill` occurs twice: node 4556:2189 → XmarkCircleFillIcon; node 4556:2191 → XmarkCircleFillAlternateIcon (light circular background).
- `Link` / `link` collide after normalization: node 4665:19890 → LinkIcon (chain); node 5031:12375 → LinkAlternateIcon (external link). Both remain distinct.
- `User personr` appears misspelled in Figma; UserPersonrIcon deliberately preserves it for review.
- Mixed case, dots, commas, hyphens, spaces, and trailing spaces are normalized to PascalCase. Names such as Dollar2, TargetGoal, WarningError, and SliderHorizontal3 retain the source words/numbers.
- Fill exports consistently end in FillIcon, including sources that omit `.fill`, avoiding collisions with Line exports.

## Review and maintenance

Run `npm run storybook`, then open **Fretara / Icons**. Gallery lists every icon in Figma order, its component name, source link, and any exception. Figma Order reproduces the source rows/spacing for visual comparison. Accessibility shows decorative, labelled, and title-based usage.

`inventory.json` is the complete one-to-one source manifest. Update it and the group barrel whenever adding/removing an icon. All 89 vector components were exported in full through Figma MCP, preserving component transforms (including the rotated Expand icon). The 3 raster medals use the original image and exact crop transforms. All 92 source nodes are represented. No paths are approximated, and there are no temporary asset URLs or missing icons.

## Files

- `line/*.tsx` — 66 individual Line components, listed below.
- `fill/*.tsx` — 26 individual Fill components, listed below.
- `line/index.ts`, `fill/index.ts`, `index.ts` — named exports.
- `assets/medals.png` — original shared multicolor image.
- `inventory.json` — original names, source IDs, viewBoxes, extraction methods, and exceptions.
- `Icons.stories.tsx`, `Icons.stories.css` — gallery and review stories.
- `README.md` — API, fidelity notes, and complete file inventory.

## Complete component file inventory

| File | Figma name | Node |
| --- | --- | --- |
| `fill/HouseFillIcon.tsx` | Icon/ Fill/ house.fill | 4556:2171 |
| `fill/ChartBarFillIcon.tsx` | Icon/ Fill/ chart.bar.fill | 4556:2173 |
| `fill/GearshapeFillIcon.tsx` | Icon/ Fill/ gearshape.fill | 4556:2178 |
| `fill/BoltFillIcon.tsx` | Icon/ Fill/ bolt.fill | 4556:2180 |
| `fill/PlayFillIcon.tsx` | Icon/ Fill/ play.fill | 4556:2183 |
| `fill/FlagFillIcon.tsx` | Icon/ Fill/ flag.fill | 4556:2185 |
| `fill/ClockFillIcon.tsx` | Icon/ Fill/ clock.fill | 4556:2187 |
| `fill/XmarkCircleFillIcon.tsx` | Icon/ Fill/ xmark.circle.fill | 4556:2189 |
| `fill/XmarkCircleFillAlternateIcon.tsx` | Icon/ Fill/ xmark.circle.fill | 4556:2191 |
| `fill/PlayCircleFillIcon.tsx` | Icon/ Fill/ play.circle.fill | 4556:2193 |
| `fill/AppleLogoFillIcon.tsx` | Icon/ Fill/ apple.logo | 4556:2196 |
| `fill/BellFillIcon.tsx` | Icon/ Fill/ bell.fill | 4556:2198 |
| `fill/DocPlaintextFillIcon.tsx` | Icon/ Fill/ doc.plaintext.fill | 4556:2200 |
| `fill/MoonFillIcon.tsx` | Icon/ Fill/ moon.fill | 4556:2202 |
| `fill/CheckmarkCircleFillIcon.tsx` | Icon/ Fill/ checkmark.circle.fill | 4556:2204 |
| `fill/DirectionRightFillIcon.tsx` | Icon/ Fill/ Direction right | 4556:2206 |
| `fill/PhoneCallRingingFillIcon.tsx` | Icon/ Fill/ Phone Call Ringing | 4556:2208 |
| `fill/StarFillIcon.tsx` | Icon/ Fill/ Star | 4556:2210 |
| `fill/UsersFillIcon.tsx` | Icon/ Fill/ users | 4556:2212 |
| `fill/PendingClockDashFillIcon.tsx` | Icon/ Fill/ Pending Clock dash | 4556:2218 |
| `fill/SendMessageFillIcon.tsx` | Icon/ Fill/ Send message | 4556:2228 |
| `fill/ClipboardCheckFillIcon.tsx` | Icon/ Fill/ Clipboard check | 4556:2231 |
| `fill/InfoCircleFillIcon.tsx` | Icon/ Fill/ info circle | 4633:9238 |
| `fill/GoldFillIcon.tsx` | Icon/ Fill/ Gold | 4633:9241 |
| `fill/SilverFillIcon.tsx` | Icon/ Fill/ Silver | 4633:9239 |
| `fill/BronzeFillIcon.tsx` | Icon/ Fill/ Bronze | 4633:9240 |
| `line/XmarkCloseIcon.tsx` | Icon/ Line/ xmark close | 4556:2237 |
| `line/ArrowLeftIcon.tsx` | Icon/ Line/ arrow.left | 4556:2239 |
| `line/ArrowRightIcon.tsx` | Icon/ Line/ arrow.right | 4556:2245 |
| `line/ArrowDownIcon.tsx` | Icon/ Line/ arrow.down | 4556:2251 |
| `line/ArrowUpIcon.tsx` | Icon/ Line/ arrow.up | 4556:2257 |
| `line/ChevronLeftIcon.tsx` | Icon/ Line/ chevron.left | 4556:2263 |
| `line/ChevronRightIcon.tsx` | Icon/ Line/ chevron.right | 4556:2265 |
| `line/ChevronDownIcon.tsx` | Icon/ Line/ chevron.down | 4556:2267 |
| `line/ChevronUpIcon.tsx` | Icon/ Line/ chevron.up | 4556:2269 |
| `line/PlusIcon.tsx` | Icon/ Line/ plus | 4556:2272 |
| `line/MinusIcon.tsx` | Icon/ Line/ minus | 4556:2274 |
| `line/CheckmarkIcon.tsx` | Icon/ Line/ checkmark | 4556:2276 |
| `line/MoreIcon.tsx` | Icon/ Line/ more | 4556:2278 |
| `line/PencilIcon.tsx` | Icon/ Line/ pencil | 4556:2283 |
| `line/ClockCircleIcon.tsx` | Icon/ Line/ clock.circle | 4556:2285 |
| `line/TimerIcon.tsx` | Icon/ Line/ timer | 4556:2289 |
| `line/SliderHorizontal3Icon.tsx` | Icon/ Line/ slider.horizontal.3 | 4556:2293 |
| `line/TargetIcon.tsx` | Icon/ Line/ target | 4556:2295 |
| `line/TargetGoalIcon.tsx` | Icon/ Line/ target, goal | 4556:2301 |
| `line/PauseIcon.tsx` | Icon/ Line/ pause | 4556:2303 |
| `line/ArrowUpAndDownAndArrowLeftAndRightIcon.tsx` | Icon/ Line/ arrow.up.and.down.and.arrow.left.and.right | 4556:2305 |
| `line/StopwatchIcon.tsx` | Icon/ Line/ stopwatch | 4556:2307 |
| `line/EraserIcon.tsx` | Icon/ Line/ Eraser | 4556:2311 |
| `line/WorldWebsiteIcon.tsx` | Icon/ Line/ World website | 4556:2315 |
| `line/StarIcon.tsx` | Icon/ Line/ Star | 4556:2320 |
| `line/RefreshResetIcon.tsx` | Icon/ Line/ Refresh- reset | 4556:2322 |
| `line/DashboardIcon.tsx` | Icon/ Line/ Dashboard | 4556:2324 |
| `line/UsersIcon.tsx` | Icon/ Line/ users | 4556:2332 |
| `line/ReportDocumentChartsIcon.tsx` | Icon/ Line/ Report Document charts | 4556:2338 |
| `line/SettingIcon.tsx` | Icon/ Line/ Setting | 4556:2346 |
| `line/SendMessageUpRightIcon.tsx` | Icon/ Line/ Send message up right | 4556:2350 |
| `line/ClockDashIcon.tsx` | Icon/ Line/ Clock dash | 4556:2354 |
| `line/UserPersonrIcon.tsx` | Icon/ Line/ User personr | 4556:2363 |
| `line/EmailIcon.tsx` | Icon/ Line/ email | 4556:2367 |
| `line/CalendarBlankIcon.tsx` | Icon/ Line/ Calendar blank | 4556:2371 |
| `line/LampIcon.tsx` | Icon/ Line/ Lamp | 4589:15328 |
| `line/PrinterIcon.tsx` | Icon/ Line/ Printer | 4556:2378 |
| `line/ExportDownloadIcon.tsx` | Icon/ Line/ Export - Download | 4556:2387 |
| `line/ReprocessRefreshIcon.tsx` | Icon/ Line/ Reprocess - Refresh | 4565:4133 |
| `line/WarningErrorIcon.tsx` | Icon/ Line/ Warning, error | 4565:4138 |
| `line/DeleteIcon.tsx` | Icon/ Line/ Delete | 4565:4140 |
| `line/AiBookmarkIcon.tsx` | Icon/ Line/ Ai bookmark | 4589:15246 |
| `line/TextAiIcon.tsx` | Icon/ Line/ text ai | 4589:15253 |
| `line/DocStickyAiIcon.tsx` | Icon/ Line/ doc sticky ai | 4589:15261 |
| `line/SettingAiIcon.tsx` | Icon/ Line/ Setting ai | 4589:15267 |
| `line/AiChatAssistantIcon.tsx` | Icon/ Line/ Ai chat, assistant | 4589:15898 |
| `line/Dollar2Icon.tsx` | Icon/ Line/ Dollar 2 | 4589:15402 |
| `line/BulletedListIcon.tsx` | Icon/ Line/ Bulleted list | 4589:16013 |
| `line/SearchIcon.tsx` | Icon/ Line/ Search | 4589:16403 |
| `line/CollapseIcon.tsx` | Icon/ Line/ Collapse | 4589:16423 |
| `line/ExpandIcon.tsx` | Icon/ Line/ Expand | 4589:16422 |
| `line/CopyIcon.tsx` | Icon/ Line/ Copy | 4603:7410 |
| `line/FilterIcon.tsx` | Icon/ Line/ Filter | 4633:9311 |
| `line/EyeIcon.tsx` | Icon/ Line/ Eye | 4633:10769 |
| `line/EditIcon.tsx` | Icon/ Line/ Edit | 4640:11883 |
| `line/PinIcon.tsx` | Icon/ Line/ Pin | 4654:16014 |
| `line/PaperIcon.tsx` | Icon/ Line/Paper | 4665:19880 |
| `line/LinkIcon.tsx` | Icon/ Line/Link | 4665:19890 |
| `line/InfoCircleIcon.tsx` | Icon/ Line/info circle | 4870:26362 |
| `line/LinkAlternateIcon.tsx` | Icon/ Line/link | 5031:12375 |
| `line/DocsIcon.tsx` | Icon/ Line/Docs | 5092:19502 |
| `line/FolderFileIcon.tsx` | Icon/ Line/Folder File | 5092:19503 |
| `line/LayersIcon.tsx` | Icon/ Line/Layers | 5129:23599 |
| `line/UndoIcon.tsx` | Icon/ Line/ undo | 5471:13850 |
| `line/DocumentFileIcon.tsx` | Icon/ Line/ Document file | 5129:23641 |
| `line/CheckCircleIcon.tsx` | Icon/ Line/ Check circle | 5596:14250 |
