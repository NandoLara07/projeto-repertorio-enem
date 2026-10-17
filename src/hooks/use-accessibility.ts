import { useSyncExternalStore } from "react";
import {
  ACCESSIBILITY_CLASS,
  ACCESSIBILITY_KEY,
  ZOOM_KEY,
  ZOOM_STEPS,
  type ZoomStep,
} from "@/lib/accessibility";

interface AccessibilityState {
  enabled: boolean;
  zoom: ZoomStep;
}

const DEFAULT_STATE: AccessibilityState = { enabled: false, zoom: 100 };

const listeners = new Set<() => void>();
let current: AccessibilityState | null = null;

function isZoomStep(value: number): value is ZoomStep {
  return (ZOOM_STEPS as readonly number[]).includes(value);
}

function readStorage(): AccessibilityState {
  try {
    if (localStorage.getItem(ACCESSIBILITY_KEY) !== "1") return DEFAULT_STATE;
    const zoom = Number(localStorage.getItem(ZOOM_KEY));
    return { enabled: true, zoom: isZoomStep(zoom) ? zoom : 100 };
  } catch {
    return DEFAULT_STATE;
  }
}

function applyToDocument({ enabled, zoom }: AccessibilityState) {
  const root = document.documentElement;
  root.classList.toggle(ACCESSIBILITY_CLASS, enabled);
  // rem-based sizes (text, spacing, header) all scale with the root font size.
  root.style.fontSize = enabled && zoom !== 100 ? `${zoom}%` : "";
}

function update(next: AccessibilityState) {
  current = next;
  try {
    if (next.enabled) {
      localStorage.setItem(ACCESSIBILITY_KEY, "1");
      localStorage.setItem(ZOOM_KEY, String(next.zoom));
    } else {
      localStorage.removeItem(ACCESSIBILITY_KEY);
      localStorage.removeItem(ZOOM_KEY);
    }
  } catch {
    // Storage can be unavailable (private mode); the mode still works for this page.
  }
  applyToDocument(next);
  listeners.forEach((listener) => listener());
}

function getSnapshot() {
  current ??= readStorage();
  return current;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Keeps other open tabs in sync.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== ACCESSIBILITY_KEY && event.key !== ZOOM_KEY) return;
    current = readStorage();
    applyToDocument(current);
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useAccessibility() {
  // Off on the server and during hydration, so markup never mismatches.
  return useSyncExternalStore(subscribe, getSnapshot, () => DEFAULT_STATE);
}

// Entering the mode always starts at the normal text size.
export function enableAccessibility() {
  update({ enabled: true, zoom: 100 });
}

// Leaving the mode drops the zoom; the light/dark choice underneath is untouched.
export function disableAccessibility() {
  update(DEFAULT_STATE);
}

export function setZoom(zoom: ZoomStep) {
  if (getSnapshot().enabled) update({ enabled: true, zoom });
}
