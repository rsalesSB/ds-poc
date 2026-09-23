import '@testing-library/jest-dom/vitest'

// vitest-axe's own `toHaveNoViolations` matcher targets an older Vi.Assertion
// shape that doesn't type-check against vitest 5's Assertion<T, R>, so
// a11y checks assert directly on `axe(container).violations` (see
// vitest-axe usage in each *.test.ts) instead of extending `expect`.
