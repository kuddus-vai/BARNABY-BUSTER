/**
 * Safe LocalStorage Wrapper with in-memory fallback.
 * Prevents SecurityError, ReferenceError, and private-mode crashes.
 */

const memoryStore: Record<string, string> = {};

export const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && 'localStorage' in window && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      console.warn(`[storage] Could not read "${key}" from localStorage:`, e);
    }
    return memoryStore[key] ?? null;
  },

  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined' && 'localStorage' in window && window.localStorage) {
        window.localStorage.setItem(key, value);
        return;
      }
    } catch (e) {
      console.warn(`[storage] Could not write "${key}" to localStorage:`, e);
    }
    memoryStore[key] = value;
  },

  removeItem: (key: string): void => {
    try {
      if (typeof window !== 'undefined' && 'localStorage' in window && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch (e) {
      console.warn(`[storage] Could not remove "${key}" from localStorage:`, e);
    }
    delete memoryStore[key];
  },

  clearAll: (): void => {
    try {
      if (typeof window !== 'undefined' && 'localStorage' in window && window.localStorage) {
        window.localStorage.clear();
      }
    } catch (e) {
      console.warn('[storage] Could not clear localStorage:', e);
    }
    for (const k of Object.keys(memoryStore)) {
      delete memoryStore[k];
    }
  }
};
