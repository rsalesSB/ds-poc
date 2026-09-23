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

// vitest-axe's own `toHaveNoViolations` matcher targets an older Vi.Assertion
// shape that doesn't type-check against vitest 5's Assertion<T, R>, so
// a11y checks assert directly on `axe(container).violations` (see
// vitest-axe usage in each *.test.ts) instead of extending `expect`.
