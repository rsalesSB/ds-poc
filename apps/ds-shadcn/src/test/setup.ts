import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/vue'
import { afterEach } from 'vitest'

// `test.globals` is off, so @testing-library/vue's automatic afterEach-based
// cleanup (which only registers itself when it finds jest/vitest globals on
// globalThis) never runs on its own — without this, every test in a file
// keeps rendering into a fresh <div> appended to the same document.body,
// so later `screen`/`getByRole` queries see leftover elements from earlier
// tests. Registered explicitly instead of turning on `globals`.
afterEach(() => cleanup())

// jsdom implements neither ResizeObserver nor the Pointer Capture methods.
// reka-ui's size tracking (used by Tooltip/Popover/Select/etc. for
// positioning) calls `new ResizeObserver(...)` on mount and floating-ui-based
// components call `hasPointerCapture`/`setPointerCapture` during pointer
// interactions — both throw ReferenceError/TypeError in jsdom without these
// stubs, which was corrupting later tests in the same file once the first
// one threw. Minimal no-op stubs, first needed by Tooltip.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver ??= ResizeObserverStub as unknown as typeof ResizeObserver

if (!Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = () => false
}
if (!Element.prototype.setPointerCapture) {
  Element.prototype.setPointerCapture = () => {}
}
if (!Element.prototype.releasePointerCapture) {
  Element.prototype.releasePointerCapture = () => {}
}
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {}
}

// vitest-axe's own `toHaveNoViolations` matcher targets an older Vi.Assertion
// shape that doesn't type-check against vitest 5's Assertion<T, R>, so
// a11y checks assert directly on `axe(container).violations` (see
// vitest-axe usage in each *.test.ts) instead of extending `expect`.
