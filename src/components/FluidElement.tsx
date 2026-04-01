import { useLayoutEffect, useRef } from "react";

const easingMap = {
  ease: "ease",
  linear: "linear",
  "ease-in": "ease-in",
  "ease-out": "ease-out",
  "ease-in-out": "ease-in-out",
  snappy: "cubic-bezier(0.25, 0, 0, 1)",
  smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
  spring: "cubic-bezier(0.34, 1.56, 0.6, 1)",
} as const;

type EasingType = keyof typeof easingMap;
type AnimateAxis = "height" | "width" | "both";
type AsProp<T extends React.ElementType> = { as?: T };
type Props<T extends React.ElementType = "div"> = AsProp<T> &
  Omit<React.ComponentPropsWithoutRef<T>, "as"> & {
    animate?: AnimateAxis;
    duration?: number;
    easing?: EasingType;
    children: React.ReactNode;
  };
type Dimensions = { width: number; height: number };

export default function FluidElement<T extends React.ElementType = "div">({
  as,
  children,
  className,
  duration = 400,
  easing = "spring",
  animate = "height",
  ...rest
}: Props<T>) {
  const Tag = (as ?? "div") as React.ElementType;
  const easingCurve = easingMap[easing];
  const animTickRef = useRef(0);
  const animatingRef = useRef(false);
  const containerRef = useRef<HTMLElement>(null);
  const dimsBeforeRef = useRef<Dimensions | null>(null);
  const animatesWidth = animate === "width" || animate === "both";
  const animatesHeight = animate === "height" || animate === "both";

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = (): Dimensions => {
      const { width, height } = container.getBoundingClientRect();
      return { width, height };
    };

    let fromDims: Dimensions;
    let toDims: Dimensions;

    if (animatingRef.current) {
      // Capture the current mid-animation position, release constraints,
      // then measure the new natural size. All pre-paint — no visual flash.
      fromDims = measure();
      container.style.transition = "";
      if (animatesWidth) container.style.removeProperty("width");
      if (animatesHeight) container.style.removeProperty("height");
      toDims = measure();
    } else {
      toDims = measure();
      if (!dimsBeforeRef.current) {
        dimsBeforeRef.current = toDims;
        return;
      }
      fromDims = dimsBeforeRef.current;
    }

    const heightChanged = animatesHeight && Math.round(fromDims.height) !== Math.round(toDims.height);
    const widthChanged = animatesWidth && Math.round(fromDims.width) !== Math.round(toDims.width);

    if (!heightChanged && !widthChanged) {
      container.style.overflow = container.style.boxSizing = "";
      animatingRef.current = false;
      dimsBeforeRef.current = toDims;
      return;
    }

    // Pin to fromDims and animate to toDims.
    container.style.overflow = "hidden";
    container.style.boxSizing = "border-box";
    if (heightChanged) container.style.height = `${fromDims.height}px`;
    if (widthChanged) container.style.width = `${fromDims.width}px`;

    dimsBeforeRef.current = toDims;
    animatingRef.current = true;
    const tick = ++animTickRef.current;

    requestAnimationFrame(() => {
      container.style.transition = [
        widthChanged && `width ${duration}ms ${easingCurve}`,
        heightChanged && `height ${duration}ms ${easingCurve}`,
      ].filter(Boolean).join(", ");
      if (widthChanged) container.style.width = `${toDims.width}px`;
      if (heightChanged) container.style.height = `${toDims.height}px`;

      container.addEventListener(
        "transitionend",
        () => {
          if (animTickRef.current !== tick) return;
          container.style.overflow = container.style.boxSizing = container.style.transition = "";
          if (widthChanged) container.style.removeProperty("width");
          if (heightChanged) container.style.removeProperty("height");
          animatingRef.current = false;
        },
        { once: true },
      );
    });
  });

  return (
    <Tag ref={containerRef} className={className} {...rest}>
      {children}
    </Tag>
  );
}
