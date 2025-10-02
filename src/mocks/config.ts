const rawEnv =
  (typeof import.meta !== 'undefined' && import.meta.env) ||
  (typeof process !== 'undefined' && process.env) ||
  {};

const toBoolean = (value: unknown, fallback = false): boolean => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (['1', 'true', 'yes', 'on'].includes(normalized)) return true;
    if (['0', 'false', 'no', 'off'].includes(normalized)) return false;
  }
  return fallback;
};

const toNumber = (value: unknown, fallback: number): number => {
  const numberValue = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(numberValue) ? numberValue : fallback;
};

export const USE_MOCKS = toBoolean(rawEnv.VITE_USE_MOCKS, true);
export const MOCK_DELAY = toNumber(rawEnv.VITE_MOCK_DELAY, 300);
export const MOCK_DEBUG = toBoolean(rawEnv.VITE_MOCK_DEBUG, false);

export const mockAsync = async <T>(payload: T, delay = MOCK_DELAY): Promise<T> => {
  if (!USE_MOCKS) {
    return payload;
  }

  if (MOCK_DEBUG) {
    console.debug('[mockAsync]', { delay, payload });
  }

  await new Promise((resolve) => setTimeout(resolve, delay));
  return payload;
};
