// lib/optional-sentry.ts
export function getOptionalSentry(): any | null {
  try {
    // Prevent bundlers from statically resolving the module id
    // eslint-disable-next-line no-new-func
    const req = (Function('return globalThis.require')?.() || Function('return require')?.());
    return req ? req('@sentry/nextjs') : null;
  } catch {
    return null;
  }
}
