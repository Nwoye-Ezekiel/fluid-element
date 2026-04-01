# FluidElement

A React component that animates height, width, or both when its content changes — with no dependencies and no configuration.

Wherever a div would snap to a new size, it morphs instead.

## Usage

```tsx
import FluidElement from "./FluidElement";

<FluidElement watch={activeTab}>
  {activeTab === "a" ? <ShortContent /> : <TallContent />}
</FluidElement>
```

Pass any value to `watch` — when it changes, the container animates to fit the new content.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `watch` | `unknown \| unknown[]` | — | Trigger value. When it changes, the animation runs. |
| `animate` | `"height" \| "width" \| "both"` | `"height"` | Which dimension(s) to animate. |
| `duration` | `number` | `300` | Animation duration in milliseconds. |
| `easing` | `EasingType` | `"smooth"` | Easing curve. |
| `as` | `React.ElementType` | `"div"` | Render as any HTML element or component. |

### Easing options

| Value | Curve |
|-------|-------|
| `smooth` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `snappy` | `cubic-bezier(0.25, 0, 0, 1)` |
| `spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| `ease-in-out` | `ease-in-out` |
| `linear` | `linear` |
| `ease` | `ease` |
| `ease-in` | `ease-in` |
| `ease-out` | `ease-out` |

## Examples

### Animate height

```tsx
const [tab, setTab] = useState("overview");

<FluidElement watch={tab} animate="height" easing="spring">
  {tab === "overview" ? <Overview /> : <Details />}
</FluidElement>
```

### Animate width

```tsx
<FluidElement
  watch={step}
  animate="width"
  className={step === "compact" ? "w-40" : "w-96"}
>
  <StatusBar step={step} />
</FluidElement>
```

### Animate both

```tsx
<FluidElement
  watch={plan}
  animate="both"
  className={plan === "starter" ? "w-52" : "w-80"}
>
  <PricingCard plan={plan} />
</FluidElement>
```

### Polymorphic usage

```tsx
<FluidElement as="section" watch={isOpen}>
  {isOpen && <ExpandedContent />}
</FluidElement>
```

### Multiple watch values

Pass an array to watch multiple dependencies:

```tsx
<FluidElement watch={[tab, easing]} animate="height" easing={easing}>
  <TabContent tab={tab} />
</FluidElement>
```

## How it works

`FluidElement` uses `useLayoutEffect` (without a deps array) to snapshot the container's dimensions before every render. When `watch` changes, it reads the new dimensions from the DOM, then CSS-transitions from the previous size to the new one. No layout proxies, no ResizeObserver, no FLIP.

- Dimensions are measured with `getBoundingClientRect()` for sub-pixel accuracy
- `box-sizing: border-box` is applied during animation to avoid padding flash
- `removeProperty` (not `style.width = "auto"`) is used on cleanup so CSS classes retake control
- A tick counter cancels stale `transitionend` handlers when animations chain

## Why not Framer Motion?

Framer Motion is a full animation library (~100kb). FluidElement is a single file (~2kb) that does one thing. No setup, no `AnimatePresence`, no layout proxies — just wrap your content and pass `watch`.

---

By [Ezekiel Nwoye](https://github.com/Nwoye-Ezekiel)
