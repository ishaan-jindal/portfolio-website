"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  layout,
  layoutWithLines,
  prepare,
  prepareWithSegments,
  type LayoutLine,
} from "@chenglou/pretext";

type Options = {
  font: string;
  lineHeight: number;
  manualLines?: boolean;
  whiteSpace?: "normal" | "pre-wrap";
};

type Measurement = {
  height: number;
  lineCount: number;
  lines: LayoutLine[];
};

const emptyMeasurement: Measurement = {
  height: 0,
  lineCount: 0,
  lines: [],
};

const waitForFonts = async () => {
  if (typeof document === "undefined" || !("fonts" in document)) return;
  await document.fonts.ready;
};

export function usePretextLayout<T extends HTMLElement = HTMLDivElement>(
  text: string,
  options: Options
) {
  const ref = useRef<T | null>(null);
  const [width, setWidth] = useState(0);
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    waitForFonts().then(() => {
      if (!cancelled) setFontsReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const updateWidth = () => {
      setWidth(Math.max(0, Math.floor(node.getBoundingClientRect().width)));
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const measurement = useMemo<Measurement>(() => {
    if (!fontsReady || typeof window === "undefined" || width <= 0 || text.length === 0) {
      return emptyMeasurement;
    }

    const prepareOptions = options.whiteSpace ? { whiteSpace: options.whiteSpace } : undefined;

    if (options.manualLines) {
      const prepared = prepareWithSegments(text, options.font, prepareOptions);
      return layoutWithLines(prepared, width, options.lineHeight);
    }

    const prepared = prepare(text, options.font, prepareOptions);
    return { ...layout(prepared, width, options.lineHeight), lines: [] };
  }, [fontsReady, options.font, options.lineHeight, options.manualLines, options.whiteSpace, text, width]);

  return { ref, ...measurement };
}
