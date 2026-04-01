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
  duration = 300,
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

    const rect = container.getBoundingClientRect();
    const toDims: Dimensions = { width: rect.width, height: rect.height };

    if (animatingRef.current) return;

    const fromDims = dimsBeforeRef.current;

    if (!fromDims) {
      dimsBeforeRef.current = toDims;
      return;
    }

    const heightChanged =
      animatesHeight &&
      Math.round(fromDims.height) !== Math.round(toDims.height);
    const widthChanged =
      animatesWidth && Math.round(fromDims.width) !== Math.round(toDims.width);

    if (!heightChanged && !widthChanged) {
      dimsBeforeRef.current = toDims;
      return;
    }

    dimsBeforeRef.current = toDims;

    const tick = ++animTickRef.current;
    animatingRef.current = true;

    container.style.transition = "";
    container.style.overflow = "hidden";
    container.style.boxSizing = "border-box";
    if (widthChanged) container.style.width = `${fromDims.width}px`;
    if (heightChanged) container.style.height = `${fromDims.height}px`;

    requestAnimationFrame(() => {
      const transitions: string[] = [];
      if (widthChanged) transitions.push(`width ${duration}ms ${easingCurve}`);
      if (heightChanged)
        transitions.push(`height ${duration}ms ${easingCurve}`);

      container.style.transition = transitions.join(", ");
      if (widthChanged) container.style.width = `${toDims.width}px`;
      if (heightChanged) container.style.height = `${toDims.height}px`;

      container.addEventListener(
        "transitionend",
        () => {
          if (animTickRef.current !== tick) return;
          container.style.overflow = "";
          container.style.boxSizing = "";
          container.style.transition = "";
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
