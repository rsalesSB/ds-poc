# Round 2 — predicted complexity ranking (pre-implementation)

Written and committed **before** any Round 2 component code exists, so the final comparison in the root `README.md` can be checked against this prediction without hindsight bias.

## Criteria

1. **Number of sub-parts/primitives involved** (Root, Trigger, Content, Portal, Item, etc.) — more moving parts generally means more files/props to wire up and retokenize on the ds-shadcn side, and more composition to get right by hand on the ds-reka side.
2. **Keyboard patterns required by the WAI-ARIA Authoring Practices Guide (APG)** — e.g. a Combobox or a Calendar has a much richer arrow-key/typeahead navigation model than a Checkbox.
3. **State management** — controlled vs. uncontrolled, single vs. multiple selection, date/range state, open/close state coordinated across sub-components.
4. **External dependencies required** — e.g. Calendar/DatePicker plausibly need `@internationalized/date` for locale-aware date math.

Score: 1 = simplest, 12 = most complex.

## Predicted ranking

| # | Component | Sub-parts | Keyboard pattern | State | External deps | Rationale |
|---|---|---|---|---|---|---|
| 1 | **Checkbox** | Root + Indicator (2) | Space only | boolean, optional indeterminate | none | Smallest possible surface: one toggleable control, one ARIA state (`aria-checked`), no focus management beyond the native input/button itself. |
| 2 | **RadioGroup** | Root + Item + Indicator (3) | Arrow keys move a roving tabindex between items; Space/click selects | single-select, one value shared across items | none | One step up from Checkbox: needs roving-tabindex logic across a group of items instead of a single standalone control. |
| 3 | **Tooltip** | Root + Trigger + Portal + Content + Arrow + Provider (6) | Escape dismisses; no roving tabindex | open/closed driven by hover/focus with a delay timer | none | More sub-parts than Checkbox/RadioGroup, but the interaction model is the simplest "overlay" pattern there is: no focus trap, no item list, just show/hide with a timing debounce. |
| 4 | **Tabs** | Root + List + Trigger + Content (4) | Arrow keys (respecting orientation) move a roving tabindex; automatic vs. manual activation mode | selected tab id, one value | none | Roving tabindex like RadioGroup, plus an orientation axis and an automatic/manual activation mode switch, plus swapping visible panel content. |
| 5 | **Accordion** | Root + Item + Header + Trigger + Content (5) | Arrow keys move between triggers; Home/End | single or multiple expanded items, each independently open/closed | none | Similar keyboard model to Tabs but state is a *set* of open items (single or multiple) rather than one selected value, plus expand/collapse animation concerns. |
| 6 | **Popover** | Root + Trigger + Portal + Anchor + Content + Arrow + Close (7) | Escape closes, focus trap when acting as a modal-ish overlay | open/closed, positioning relative to trigger | floating-ui (already a reka-ui dependency) | Structurally the same shape as Round 1's Dialog but usually non-modal by default — no full focus-trap requirement unless explicitly made modal, and no nested Title/Description requirement. |
| 7 | **DropdownMenu** | Root + Trigger + Portal + Content + Item + CheckboxItem + RadioItem + RadioGroup + Sub + SubTrigger + SubContent + Separator + Label + Arrow (13+) | Full WAI-ARIA menu pattern: arrow keys, typeahead, Home/End, submenu open on ArrowRight/Enter | open/closed, optional checkbox/radio item state, submenu open state | none | Substantially more sub-parts than Popover, and the keyboard model is a full menu (typeahead + submenus) rather than a single overlay. |
| 8 | **Select** | Root + Trigger + Value + Icon + Portal + Content + Viewport + Item + ItemText + ItemIndicator + Group + Label + Separator + ScrollUp/DownButton + Arrow (15+) | WAI-ARIA listbox pattern: arrow keys, typeahead, Home/End, Enter/Space to select | controlled/uncontrolled single value, open/closed | none | More sub-parts than DropdownMenu (scroll buttons, item text/indicator split) and adds a bound *value* (not just an action), which is a qualitatively different state-management problem than a menu of actions. |
| 9 | **Combobox** | Everything Select has, plus Anchor + Input + Empty + Group + Virtualizer (18+) | Everything Select has, plus free-text filtering, live-filtered item list, Escape-to-clear vs. Escape-to-close distinction | filterable text state *and* selected value state, open/closed, empty-results state | none extra (virtualizer ships in reka-ui) | Strictly a superset of Select's complexity: same listbox keyboard model plus a synchronized text input and filtered/virtualized item list. |
| 10 | **Calendar** | Root + Header + Heading + Grid + GridHead + GridBody + GridRow + HeadCell + Cell + CellTrigger + Prev + Next (12) | 2D grid navigation: Up/Down/Left/Right move by day/week, Home/End/PageUp/PageDown jump week/month/year | selected date or date range, visible month/year, locale-aware formatting | `@internationalized/date` (already a reka-ui dependency) | The first component whose keyboard model is genuinely two-dimensional (a grid, not a list) — arrow keys move in 4 directions across rows, not just next/previous. |
| 11 | **DatePicker** | Calendar's entire subtree, plus Field + Trigger + Content + Anchor + Close (Calendar's 12 + ~6) | Calendar's full grid navigation, *plus* a segmented text field (day/month/year segments individually navigable by arrow keys), *plus* Popover-style open/close coordination between field and calendar | everything Calendar has, plus parsed/formatted text-field state kept in sync with the calendar's date state, plus popover open/closed state | `@internationalized/date` | Superset of Calendar: all of its 2D-grid complexity, plus a second, independently-navigable input surface (the segmented field) that has to stay in sync with it. |
| 12 | **Form** | *(see note below — not scored on this axis)* | — | — | `vee-validate` + `@vee-validate/zod` + `zod` | Placed last by volume of integration surface (schema validation, field-level error state, submit handling across multiple already-built components), **not** because it is the most complex accessibility composition — see below. |

## Note on Form

Unlike the other 11, **Form is not a reka-ui behavioral primitive** — reka-ui has no `Form*` component family at all. What ds-shadcn's `form` registry item (and what we'll hand-build for ds-reka) actually provides is a **glue-code layer**: `vee-validate`'s `useForm`/`Field` wired to a `zod` schema, plus presentational wrappers (shadcn's `FormField`/`FormItem`/`FormMessage` equivalents) around already-implemented primitives (`Input`, `Checkbox`, `Button`).

So position 12 does **not** mean "hardest accessibility composition in the set" — Combobox/DatePicker are harder in that sense. It means "most integration/validation boilerplate volume." The hypothesis this component actually tests is **"does a ready-made validation-wiring pattern save more time than a ready-made accessible-primitive composition?"** — a different question from the one the other 11 components test. The Round 2 synthesis in the root `README.md` keeps Form's numbers out of the complexity-vs-shadcn-advantage correlation computed over the other 11, and discusses it in its own dedicated section.

## Suggested implementation order

The order suggested by the user for Round 2 matches this prediction exactly: Checkbox → RadioGroup → Tooltip → Tabs → Accordion → Popover → DropdownMenu → Select → Combobox → Calendar → DatePicker → Form. We follow it as-is.
