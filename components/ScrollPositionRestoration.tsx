"use client";

import { useEffect } from "react";
import { stripUrlLocale } from "@/util/i18n";

const STORAGE_PREFIX = "asianhire-scroll-position:";
const LOCALE_SWITCH_KEY = "asianhire-locale-switch-at";
const LOCALE_SWITCH_WINDOW_MS = 10000;
const POLL_MS = 150;
const SETTLE_MS = 2000;
const GIVE_UP_MS = 15000;

function getStorageKey() {
  return `${STORAGE_PREFIX}${stripUrlLocale(window.location.pathname)}${window.location.search}`;
}

export function rememberScrollForLocaleSwitch() {
  sessionStorage.setItem(
    LOCALE_SWITCH_KEY,
    JSON.stringify({ y: window.scrollY, at: Date.now() }),
  );
}

export default function ScrollPositionRestoration() {
  useEffect(() => {
    const initialStorageKey = getStorageKey();
    let restoring = false;
    const save = () => {
      if (restoring) return;
      sessionStorage.setItem(getStorageKey(), String(window.scrollY));
    };

    window.addEventListener("scroll", save, { passive: true });
    window.addEventListener("pagehide", save);

    const cleanupSaving = () => {
      save();
      window.removeEventListener("scroll", save);
      window.removeEventListener("pagehide", save);
    };

    const navigation = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming | undefined;

    let savedPosition: string | null = null;
    const switchRaw = sessionStorage.getItem(LOCALE_SWITCH_KEY);
    if (switchRaw) {
      try {
        const { y, at } = JSON.parse(switchRaw) as { y: number; at: number };
        if (Date.now() - at < LOCALE_SWITCH_WINDOW_MS) {
          savedPosition = String(y);
        }
      } catch {
        savedPosition = null;
      }
    }
    if (savedPosition === null && navigation?.type === "reload") {
      savedPosition = sessionStorage.getItem(initialStorageKey);
    }

    if (savedPosition === null || window.location.hash) {
      return cleanupSaving;
    }

    const targetY = Number(savedPosition);
    if (!Number.isFinite(targetY) || targetY <= 0) {
      return cleanupSaving;
    }

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    restoring = true;

    let active = true;
    let settleTimer: number | undefined;

    const stopRestoring = () => {
      if (!active) return;
      active = false;
      restoring = false;
      window.clearInterval(pollTimer);
      window.clearTimeout(settleTimer);
      window.clearTimeout(giveUpTimer);
      mutationObserver.disconnect();
      resizeObserver.disconnect();
      window.history.scrollRestoration = previousScrollRestoration;
    };

    const applyTarget = () => {
      if (!active) return;
      if (getStorageKey() !== initialStorageKey) {
        stopRestoring();
        return;
      }

      const maxScrollY =
        document.documentElement.scrollHeight - window.innerHeight;
      if (maxScrollY >= targetY) {
        if (Math.abs(window.scrollY - targetY) > 1) {
          window.scrollTo(0, targetY);
          window.clearTimeout(settleTimer);
          settleTimer = window.setTimeout(stopRestoring, SETTLE_MS);
        } else if (settleTimer === undefined) {
          settleTimer = window.setTimeout(stopRestoring, SETTLE_MS);
        }
      }
    };

    const mutationObserver = new MutationObserver(applyTarget);
    const resizeObserver = new ResizeObserver(applyTarget);
    const cancelForUserInput = () => stopRestoring();
    window.addEventListener("wheel", cancelForUserInput, { passive: true });
    window.addEventListener("touchstart", cancelForUserInput, { passive: true });
    window.addEventListener("pointerdown", cancelForUserInput);
    window.addEventListener("keydown", cancelForUserInput);

    mutationObserver.observe(document.body, { childList: true, subtree: true });
    resizeObserver.observe(document.documentElement);
    window.addEventListener("load", applyTarget);
    document.addEventListener("load", applyTarget, true);
    const pollTimer = window.setInterval(applyTarget, POLL_MS);
    const giveUpTimer = window.setTimeout(stopRestoring, GIVE_UP_MS);

    applyTarget();

    return () => {
      cleanupSaving();
      stopRestoring();
      window.removeEventListener("load", applyTarget);
      document.removeEventListener("load", applyTarget, true);
      window.removeEventListener("wheel", cancelForUserInput);
      window.removeEventListener("touchstart", cancelForUserInput);
      window.removeEventListener("pointerdown", cancelForUserInput);
      window.removeEventListener("keydown", cancelForUserInput);
    };
  }, []);

  return null;
}
