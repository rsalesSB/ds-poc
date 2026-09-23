#!/usr/bin/env node
// Reads every metrics/<component>.json and emits the Round 2 comparison
// table + the complexity-vs-removido_pct correlation as Markdown, so the
// README's numbers are always regenerated from the raw data instead of
// hand-transcribed (and drifting from it over time).
import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))

const files = readdirSync(here)
  .filter(f => f.endsWith('.json'))
  .sort()

const components = files.map(f => JSON.parse(readFileSync(join(here, f), 'utf8')))

function pct(component) {
  const raw = component.ds_shadcn.codigo_removido_pct
  if (!raw)
    return null
  const m = raw.match(/([\d.]+)%/)
  return m ? Number.parseFloat(m[1]) : null
}

function pearson(pairs) {
  const n = pairs.length
  const mx = pairs.reduce((s, [x]) => s + x, 0) / n
  const my = pairs.reduce((s, [, y]) => s + y, 0) / n
  let sxy = 0
  let sxx = 0
  let syy = 0
  for (const [x, y] of pairs) {
    const dx = x - mx
    const dy = y - my
    sxy += dx * dy
    sxx += dx * dx
    syy += dy * dy
  }
  return sxy / Math.sqrt(sxx * syy)
}

console.log('## Round 2 — raw data table\n')
console.log('| Component | Predicted rank | ds-reka LOC | ds-shadcn LOC generated | ds-shadcn LOC final | ds-shadcn removed % | ds-shadcn custom LOC | ds-reka tests needed a fix | ds-shadcn tests needed a fix | axe violations (both) |')
console.log('|---|---|---|---|---|---|---|---|---|---|')

for (const c of components) {
  const r = c.ds_reka
  const s = c.ds_shadcn
  console.log(`| ${c.componente} | ${c.complexidade_prevista} | ${r.loc} | ${s.loc_gerado ?? 'n/a'} | ${s.loc_final} | ${pct(c) ?? 'n/a'} | ${s.codigo_customizado_loc ?? 'n/a'} | ${r.testes.passaram_sem_ajuste ? 'no' : 'yes'} | ${s.testes.passaram_sem_ajuste ? 'no' : 'yes'} | reka: ${r.acessibilidade.axe_violations}, shadcn: ${s.acessibilidade.axe_violations} |`)
}

const pairs = components
  .filter(c => c.componente !== 'form' && pct(c) !== null)
  .map(c => [c.complexidade_prevista, pct(c)])

console.log(`\n## Correlation (excluding date-picker [no CLI baseline] and form [different axis])\n`)
console.log(`n = ${pairs.length}, r = ${pearson(pairs).toFixed(3)}`)
console.log('\nPairs (predicted complexity, ds-shadcn removed %):')
for (const [x, y] of pairs) console.log(`  ${x} -> ${y}%`)

// ASCII scatter: X = predicted complexity (1-11), Y = removed % bucketed
console.log('\n## ASCII scatter (X = predicted complexity, Y = ds-shadcn removed %)\n')
console.log('```')
const yBuckets = [35, 30, 25, 20, 15, 10, 5, 0]
const grid = yBuckets.map(() => Array.from({ length: 11 }).fill(' '))
for (const [x, y] of pairs) {
  const col = x - 1
  const row = yBuckets.findIndex(b => y >= b)
  grid[row][col] = '*'
}
grid.forEach((row, i) => {
  console.log(`${String(yBuckets[i]).padStart(3)}% | ${row.join('  ')}`)
})
console.log(`     +${'---'.repeat(11)}`)
console.log(`       ${Array.from({ length: 11 }, (_, i) => i + 1).map(n => String(n).padStart(2)).join(' ')}`)
console.log('        (predicted complexity rank, 1=simplest .. 11=most complex, form excluded)')
console.log('```')
