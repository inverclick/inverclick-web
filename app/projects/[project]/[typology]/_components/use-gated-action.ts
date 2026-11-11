"use client";

import { usePreRegistration } from "@/contexts/pre-registration-context";
import { useCallback, useEffect, useRef } from "react";

/**
 * Anyone can read a project's description; everything else (other tabs, the
 * credit simulator, contacting the builder) needs a session.
 *
 * `runGated(action)` runs the action for signed-in users. For everyone else it
 * opens the sign-up / sign-in dialog and remembers the action, then runs it as
 * soon as the session exists, so the person lands where they were going.
 * Closing the dialog without signing in drops it.
 *
 * `bypass` (the builders' preview) never asks for a session.
 */
export function useGatedAction({ bypass = false }: { bypass?: boolean } = {}) {
  const {
    canInteractWithFeatures,
    isPreRegistrationOpen,
    setIsPreRegistrationOpen,
    welcomeDialogOpen,
  } = usePreRegistration();
  const allowed = bypass || canInteractWithFeatures;
  const pending = useRef<(() => void) | null>(null);

  const runGated = useCallback(
    (action: () => void) => {
      if (allowed) {
        action();
        return;
      }
      pending.current = action;
      setIsPreRegistrationOpen(true);
    },
    [allowed, setIsPreRegistrationOpen]
  );

  // Signing in ends with a router refresh that keeps this component mounted:
  // run what the person asked for once the session shows up.
  useEffect(() => {
    if (!allowed || !pending.current) return;
    const action = pending.current;
    pending.current = null;
    action();
  }, [allowed]);

  // Dialog dismissed without signing in: forget the request. A successful
  // sign-in also closes it, but opens the welcome dialog at the same time and
  // the session arrives a moment later, so keep the action then.
  useEffect(() => {
    if (!isPreRegistrationOpen && !welcomeDialogOpen && !allowed) {
      pending.current = null;
    }
  }, [isPreRegistrationOpen, welcomeDialogOpen, allowed]);

  return { allowed, runGated };
}
