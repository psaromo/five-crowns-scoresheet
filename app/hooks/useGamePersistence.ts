'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { GameFormValues } from 'types/Players';

const STORAGE_KEY = 'fiveCrownsGame';

interface SortedPlayer {
  name: string | null;
  totalScore: number;
}

interface PersistedState {
  players: GameFormValues['players'];
  formStep: number;
  sortedPlayers: SortedPlayer[];
}

export function useGamePersistence(
  methods: UseFormReturn<GameFormValues>,
  formStep: number,
  sortedPlayers: SortedPlayer[],
  setFormStep: (step: number) => void,
  setSortedPlayers: (players: SortedPlayer[]) => void,
) {
  // Tracks whether the restore-from-localStorage has finished.
  // Used to prevent saving stale initial React state over persisted data.
  const [isHydrated, setIsHydrated] = useState(false);

  // Skips the very first run of the formStep/sortedPlayers persist effect.
  // Without this, the effect fires on mount with formStep=0 (React's initial
  // state) and overwrites the saved step before the restore has been applied.
  const skipFirstPersistRef = useRef(true);

  // ── 1. Restore from localStorage on mount ──────────────────────────────
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: PersistedState = JSON.parse(saved);
        const { players, formStep: savedStep, sortedPlayers: savedSorted } = parsed;

        if (Array.isArray(players) && players.length) {
          methods.reset({ players });
        }
        if (typeof savedStep === 'number') {
          setFormStep(savedStep);
        }
        if (Array.isArray(savedSorted) && savedSorted.length) {
          setSortedPlayers(savedSorted);
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }

    setIsHydrated(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── 2. Persist form values whenever they change ─────────────────────────
  // Only runs after hydration so the reset() call inside the restore effect
  // above doesn't trigger a premature save.
  useEffect(() => {
    const subscription = methods.watch((values) => {
      if (!isHydrated) return;
      try {
        const existing: Partial<PersistedState> = JSON.parse(
          localStorage.getItem(STORAGE_KEY) || '{}',
        );
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ ...existing, players: values.players }),
        );
      } catch {}
    });
    return () => subscription.unsubscribe();
  }, [methods, isHydrated]);

  // ── 3. Persist formStep + sortedPlayers whenever they change ────────────
  // Skips the initial mount so we never clobber the persisted step with the
  // default React state value of 0.
  useEffect(() => {
    if (skipFirstPersistRef.current) {
      skipFirstPersistRef.current = false;
      return;
    }
    try {
      const existing: Partial<PersistedState> = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || '{}',
      );
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...existing, formStep, sortedPlayers }),
      );
    } catch {}
  }, [formStep, sortedPlayers]);

  const clearPersistedState = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  return { clearPersistedState, isHydrated };
}
