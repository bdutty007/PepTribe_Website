// PepTribe PepCard image viewer modal.
//
// Replaces the old text-summary compound modal. When a user clicks any
// compound in the Atlas, this opens the compound's official front-page
// PepCard image (exact URL from the centralized pepCards.ts map).
//
// Features: zoom (buttons / wheel / pinch), pan (drag), prev/next browsing,
// keyboard nav, ESC / outside-click close, body-scroll lock, focus trap,
// loading + error states, lazy per-click loading with prev/next preloading.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  X,
  ZoomIn,
  ZoomOut,
  Maximize,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

export interface NavTarget {
  name: string;
  imageUrl: string | null;
}

interface Props {
  compoundName: string;
  imageUrl: string | null;
  previousCompound: NavTarget | null;
  nextCompound: NavTarget | null;
  onClose: () => void;
  onNavigate: (target: NavTarget) => void;
}

const MIN_SCALE = 1; // fit-to-screen
const MAX_SCALE = 4; // 400%

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

export const PepCardViewerModal = ({
  compoundName,
  imageUrl,
  previousCompound,
  nextCompound,
  onClose,
  onNavigate,
}: Props) => {
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [dragging, setDragging] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<Element | null>(null);

  // Multi-pointer tracking for mouse-pan, touch-pan, and pinch-zoom.
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const panStart = useRef<{
    px: number;
    py: number;
    tx: number;
    ty: number;
  } | null>(null);
  const pinch = useRef<{ dist: number; scale: number } | null>(null);
  const swipe = useRef<{ x: number; y: number; t: number } | null>(null);
  const lastTap = useRef<{ x: number; y: number; t: number } | null>(null);
  const reset = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  const zoomBy = useCallback((delta: number) => {
    setScale((s) => {
      const next = clamp(+(s + delta).toFixed(3), MIN_SCALE, MAX_SCALE);
      if (next === 1) setTranslate({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const setScaleClamped = useCallback((next: number) => {
    const v = clamp(+next.toFixed(3), MIN_SCALE, MAX_SCALE);
    setScale(v);
    if (v === 1) setTranslate({ x: 0, y: 0 });
  }, []);

  const toggleZoom = useCallback(() => {
    setScale((s) => {
      const v = s > 1 ? 1 : 2.5;
      if (v === 1) setTranslate({ x: 0, y: 0 });
      return v;
    });
  }, []);

  // Mount: fade/scale in, lock body scroll, focus close, remember trigger.
  useEffect(() => {
    triggerRef.current = document.activeElement;
    requestAnimationFrame(() => setMounted(true));
    closeBtnRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      (triggerRef.current as HTMLElement | null)?.focus?.();
    };
  }, []);

  // Reset view whenever the displayed compound changes.
  useEffect(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
    setLoaded(false);
    setError(false);
  }, [imageUrl, compoundName]);

  // Preload only the previous and next card images.
  useEffect(() => {
    const urls = [previousCompound?.imageUrl, nextCompound?.imageUrl].filter(
      Boolean,
    ) as string[];
    urls.forEach((u) => {
      const img = new Image();
      img.src = u;
    });
  }, [previousCompound, nextCompound]);

  // Native, non-passive wheel listener so preventDefault reliably stops
  // background scroll while zooming on desktop.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
      setScale((s) => {
        const v = clamp(+(s * factor).toFixed(3), MIN_SCALE, MAX_SCALE);
        if (v === 1) setTranslate({ x: 0, y: 0 });
        return v;
      });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Keyboard: ESC, arrows, +/-, 0.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft" && previousCompound) {
        e.preventDefault();
        onNavigate(previousCompound);
      } else if (e.key === "ArrowRight" && nextCompound) {
        e.preventDefault();
        onNavigate(nextCompound);
      } else if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        zoomBy(0.25);
      } else if (e.key === "-" || e.key === "_") {
        e.preventDefault();
        zoomBy(-0.25);
      } else if (e.key === "0") {
        e.preventDefault();
        reset();
      } else if (e.key === "Tab") {
        // Simple focus trap within the dialog.
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, a, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) return;
        const list = Array.from(focusables);
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [previousCompound, nextCompound, onClose, onNavigate, zoomBy, reset]);

  // Clamp pan so the image can't be dragged entirely off-screen.
  const clampPan = useCallback((tx: number, ty: number, s: number) => {
    const el = stageRef.current;
    if (!el) return { x: tx, y: ty };
    const cw = el.clientWidth;
    const ch = el.clientHeight;
    const extraX = ((s - 1) * cw) / 2;
    const extraY = ((s - 1) * ch) / 2;
    return {
      x: clamp(tx, -extraX, extraX),
      y: clamp(ty, -extraY, extraY),
    };
  }, []);

  // ── Pointer handlers (mouse drag-pan + touch pan/pinch/swipe) ──
  const onPointerDown = (e: React.PointerEvent) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2) {
      // Begin pinch.
      const [a, b] = Array.from(pointers.current.values());
      pinch.current = {
        dist: Math.hypot(a.x - b.x, a.y - b.y),
        scale: scale,
      };
      panStart.current = null;
      swipe.current = null;
      return;
    }

    if (pointers.current.size === 1) {
      if (scale > 1) {
        panStart.current = {
          px: e.clientX,
          py: e.clientY,
          tx: translate.x,
          ty: translate.y,
        };
        setDragging(true);
      } else if (e.pointerType === "touch") {
        swipe.current = { x: e.clientX, y: e.clientY, t: Date.now() };
      }
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    // Pinch zoom.
    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = Array.from(pointers.current.values());
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const ratio = dist / (pinch.current.dist || 1);
      setScaleClamped(pinch.current.scale * ratio);
      return;
    }

    // Pan.
    if (panStart.current && pointers.current.size === 1) {
      const dx = e.clientX - panStart.current.px;
      const dy = e.clientY - panStart.current.py;
      setTranslate(
        clampPan(panStart.current.tx + dx, panStart.current.ty + dy, scale),
      );
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);

    if (pointers.current.size < 2) pinch.current = null;

    if (panStart.current && pointers.current.size === 0) {
      panStart.current = null;
      setDragging(false);
    }

    // Swipe navigation (only at fit / default zoom, touch only).
    if (swipe.current && pointers.current.size === 0 && scale === 1) {
      const dx = e.clientX - swipe.current.x;
      const dy = e.clientY - swipe.current.y;
      const dt = Date.now() - swipe.current.t;
      swipe.current = null;
      if (dt < 800 && Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.6) {
        if (dx > 0 && previousCompound) onNavigate(previousCompound);
        else if (dx < 0 && nextCompound) onNavigate(nextCompound);
        return;
      }
      // Double-tap detection.
      const now = { x: e.clientX, y: e.clientY, t: Date.now() };
      if (
        lastTap.current &&
        now.t - lastTap.current.t < 320 &&
        Math.hypot(now.x - lastTap.current.x, now.y - lastTap.current.y) < 40
      ) {
        lastTap.current = null;
        toggleZoom();
      } else {
        lastTap.current = now;
      }
    }
  };

  const onDoubleClick = () => toggleZoom();

  // Double-click on desktop; ignore on touch (handled via double-tap).
  const stageStyle = useMemo<React.CSSProperties>(
    () => ({
      cursor: scale > 1 ? (dragging ? "grabbing" : "grab") : "default",
    }),
    [scale, dragging],
  );

  const zoomPct = Math.round(scale * 100);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${compoundName} PepTribe PepCard`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-200 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => {
          if (!dragging) onClose();
        }}
      />

      {/* Viewer shell */}
      <div
        ref={dialogRef}
        className={`relative flex flex-col w-[96vw] sm:w-[92vw] max-w-[1100px] h-[94vh] sm:h-[92vh] rounded-2xl overflow-hidden transition-all duration-200 ease-out ${
          mounted ? "opacity-100 scale-100" : "opacity-0 scale-[0.96]"
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{
          background:
            "linear-gradient(135deg, rgba(56,189,248,0.25), rgba(168,85,247,0.18), rgba(217,42,138,0.22))",
          padding: "2px",
          boxShadow:
            "0 0 40px rgba(56,189,248,0.18), 0 0 60px rgba(168,85,247,0.12)",
        }}
      >
        {/* Inner panel */}
        <div className="flex flex-col w-full h-full rounded-2xl bg-background/95 backdrop-blur-xl overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 border-b border-white/10 bg-background/80 shrink-0">
            <h2 className="text-sm sm:text-base font-extrabold text-foreground truncate flex-1 min-w-0">
              {compoundName}
            </h2>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => zoomBy(-0.25)}
                disabled={scale <= MIN_SCALE}
                aria-label="Zoom out"
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <ZoomOut size={16} />
              </button>
              <span className="text-xs font-mono text-muted-foreground w-12 text-center select-none">
                {zoomPct}%
              </span>
              <button
                onClick={() => zoomBy(0.25)}
                disabled={scale >= MAX_SCALE}
                aria-label="Zoom in"
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <ZoomIn size={16} />
              </button>
              <button
                onClick={reset}
                aria-label="Fit to screen"
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <Maximize size={16} />
              </button>
              {imageUrl && (
                <a
                  href={imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open full-size image"
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <ExternalLink size={16} />
                </a>
              )}
              <button
                ref={closeBtnRef}
                onClick={onClose}
                aria-label="Close PepCard viewer"
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Image stage */}
          <div
            ref={stageRef}
            className="relative flex-1 overflow-hidden touch-none select-none"
            style={stageStyle}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onDoubleClick={onDoubleClick}
          >
            {/* Loading */}
            {!loaded && !error && imageUrl && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 size={28} className="animate-spin text-cyan-400/70" />
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <p className="text-sm text-muted-foreground">
                  PepCard image could not be loaded.
                </p>
                <p className="text-xs text-muted-foreground/50 mt-1">
                  {compoundName}
                </p>
              </div>
            )}

            {/* No canonical card */}
            {!imageUrl && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <p className="text-sm text-muted-foreground">
                  No PepCard is available for this compound.
                </p>
                <p className="text-xs text-muted-foreground/50 mt-1">
                  {compoundName}
                </p>
              </div>
            )}

            {/* Image */}
            {imageUrl && !error && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
                  transformOrigin: "center center",
                  transition: dragging ? "none" : "transform 0.08s ease-out",
                  willChange: "transform",
                }}
              >
                <img
                  src={imageUrl}
                  alt={`${compoundName} PepTribe PepCard`}
                  draggable={false}
                  loading="lazy"
                  onLoad={() => setLoaded(true)}
                  onError={() => {
                    setError(true);
                    // eslint-disable-next-line no-console
                    console.warn(
                      `[PepCardViewer] Failed to load image for "${compoundName}"`,
                    );
                  }}
                  className="max-w-full max-h-full object-contain"
                  style={{ pointerEvents: "none" }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Prev / Next controls */}
        {previousCompound && (
          <button
            onClick={() => onNavigate(previousCompound)}
            aria-label={`Previous PepCard: ${previousCompound.name}`}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/70 border border-white/10 text-foreground hover:bg-background hover:border-cyan-400/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <ChevronLeft size={20} />
          </button>
        )}
        {nextCompound && (
          <button
            onClick={() => onNavigate(nextCompound)}
            aria-label={`Next PepCard: ${nextCompound.name}`}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/70 border border-white/10 text-foreground hover:bg-background hover:border-cyan-400/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};
