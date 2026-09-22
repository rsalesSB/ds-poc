# ds-poc

POC comparando duas formas de implementar o **mesmo** design system em Vue:

- **`apps/ds-reka`** — componentes escritos diretamente sobre os primitives do [`reka-ui`](https://reka-ui.com), estilizados com [`class-variance-authority`](https://cva.style) e Tailwind v4.
- **`apps/ds-shadcn`** — componentes gerados pelo CLI real do [`shadcn-vue`](https://shadcn-vue.com) (`init` + `add`), depois editados para consumir os mesmos tokens do design system.

Os dois apps consomem o **mesmo pacote de tokens** (`packages/tokens`, Style Dictionary v4, formato DTCG `$value`/`$type`), que gera CSS com prefixo `--ds-*`. Nenhum valor de cor/spacing/radius/tipografia é duplicado ou diverge entre as stacks — a única variável é a origem do código dos componentes.

## Estrutura

```
ds-poc/
├── packages/tokens/   # Style Dictionary — fonte única de verdade dos tokens
└── apps/
    ├── ds-reka/       # Stack A: reka-ui direto
    └── ds-shadcn/     # Stack B: shadcn-vue (CLI real) + retokenização
```

## Decisão técnica: Tailwind v4 e os tokens

Tailwind v4 é CSS-first (sem `tailwind.config.js`/`theme.extend`). Nos dois apps, o `src/style.css` importa `@ds-poc/tokens/css` (as variáveis `--ds-*`) e as remapeia para o namespace de tema do Tailwind dentro de um bloco `@theme`:

```css
@import "tailwindcss";
@import "@ds-poc/tokens/css";

@theme {
  --color-brand-600: var(--ds-color-brand-600);
  --radius-md: var(--ds-radius-md);
  /* ... */
}
```

Isso é o equivalente v4-nativo do `theme.extend` do Tailwind v3 e é **idêntico** nos dois apps.

## Sobre rodar o CLI do shadcn-vue "de verdade"

O CLI foi executado de verdade (`npx shadcn-vue ... init` e `add`), sem simular o resultado. Durante a execução, a versão `@latest` (2.8.2) apresentou um bug de rede real e reproduzível: as requisições concorrentes que o `init` faz contra `shadcn-vue.com/r/*` falham consistentemente *dentro* do processo do CLI (`Failed to fetch from registry: .../r/styles/index.json`), mesmo que a mesma chamada, isolada, funcione perfeitamente (testado via `curl`, via `node -e "fetch(...)"` e via uma chamada `ofetch` idêntica à usada internamente pelo CLI). Não é um problema de rede do ambiente — é uma regressão específica do fluxo de `init` da versão mais recente.

Diante disso, o `init`/`add` foram rodados com `shadcn-vue@2.6.2` (a última versão estável antes desse problema, mesma arquitetura reka-ui + CVA + `--base reka`). Comandos usados, dentro de `apps/ds-shadcn`:

```
npx shadcn-vue@2.6.2 init -y --base reka --style vega --icon-library lucide --font inter -b neutral --template vite --no-rtl
npx shadcn-vue@2.6.2 add button switch dialog -y
```

O output bruto desse comando foi commitado isoladamente (commit `c4a2325`, "raw CLI output") antes de qualquer edição manual, para permitir medir o esforço de edição real via `git diff --stat` contra o commit final (`8671713`).

## Comparação por componente

LOC = linhas do(s) arquivo(s) final(is) de cada stack. "Editado/removido em ds-shadcn" = `git diff --stat c4a2325 8671713 -- <arquivos>` (arquivos gerados pelo CLI; as `*.stories.ts`, que não existiam no output do CLI, não entram nessa coluna).

| Componente | LOC final ds-reka | LOC final ds-shadcn | Linhas editadas/removidas em ds-shadcn (vs. output cru do CLI) | Resíduos de convenção shadcn identificados e removidos |
|---|---|---|---|---|
| **Button** | 45 (`Button.vue` + `button.variants.ts`) | 62 (`Button.vue` + `index.ts`) | `index.ts`: 13 inserções / 17 remoções. `Button.vue`: **0 mudanças** (não referenciava nenhum token de cor). | 6 variants → 2 (`outline`/`ghost`/`destructive`/`link` removidos, sem tokens equivalentes no DS); 8 sizes → 2 (`xs`/`lg`/`icon*` removidos); todas as classes `bg-primary`/`text-primary-foreground`/etc. trocadas por `bg-brand-600`/`text-neutral-100`/etc. |
| **Switch** | 40 (`Switch.vue` + `switch.variants.ts`) | 42 (`Switch.vue` + `index.ts`, sem variants file) | `Switch.vue`: 10 inserções / 13 remoções. `index.ts`: **0 mudanças**. | Prop `size` (`sm`/`default`) removida — usava `data-[size=...]` amarrado a dimensões do tema shadcn sem tokens equivalentes no DS; slot `#thumb` customizável removido (fora do escopo do DS); classes `data-checked:bg-primary`/`data-unchecked:bg-input`/etc. trocadas por `data-[state=checked]:bg-brand-600`/etc. |
| **Dialog** | 59 (`Dialog.vue`, arquivo único) | 176 (8 arquivos realmente usados: `Dialog`, `DialogTrigger`, `DialogContent`, `DialogOverlay`, `DialogTitle`, `DialogDescription`, `DialogClose`, `index.ts` — a pasta gerada tem 280 linhas em 11 arquivos, incluindo `DialogFooter`/`DialogHeader`/`DialogScrollContent`, não usados nas stories) | 6 arquivos, 11 inserções / 14 remoções no total | `bg-popover`/`text-popover-foreground`/`ring-foreground/10` → `bg-neutral-100`/`text-neutral-900`/`border-neutral-300`; classes de animação `data-open:animate-in`/`fade-in-0`/`zoom-in-95` (dependiam de `tw-animate-css`, removido do `package.json` por ficar sem uso) removidas; `Button variant="outline"` no `DialogFooter` (variant que não existe mais) → `variant="secondary"`; `Button variant="ghost" size="icon-sm"` no botão de fechar (variant/size removidos) → substituído por um `DialogClose` estilizado diretamente, sem depender do `Button`; classe **`cn-font-heading`** no `DialogTitle` — não é uma utility Tailwind válida (resíduo/typo do preset de estilo "vega" apontando pra um token de fonte que não existe) → trocada por `text-heading font-bold text-neutral-900`. |

Resíduos adicionais, no nível do projeto (não por componente): import da fonte Inter via Google Fonts e todo o tema `oklch` (background/foreground/card/popover/muted/accent/destructive/ring/input/border + modo escuro `.dark` + tokens de `sidebar`/`chart-1..5`) gerados pelo `init` em `src/style.css` — nenhum tem equivalente nos tokens do DS, então o arquivo inteiro foi trocado pelo mesmo bloco `@theme` usado no ds-reka.

O helper `cn()` (`clsx` + `tailwind-merge`) foi **mantido** como o CLI gerou — os componentes `ui/*` seguem usando `cn()` pra mesclar variant classes (CVA) com overrides via prop `class`; a decisão está documentada em um comentário no topo de `src/lib/utils.ts`.

## Esforço: Button vs. Switch/Dialog

- **Button** (componente "burro", sem comportamento): esforço comparável nas duas stacks. No ds-reka, é CVA puro do zero. No ds-shadcn, o CLI já entrega uma base CVA correta — mas o `Button.vue` gerado não precisou de nenhuma edição, e o trabalho real ficou em podar variants/sizes que não existem no DS e retokenizar `index.ts`. No fim, ds-shadcn ficou com **mais linhas** (62 vs. 45) porque a estrutura gerada separa `Button.vue`/`index.ts` e mantém mais metadata (`data-slot`, `data-variant`, tipos via `PrimitiveProps`) do que a versão mínima escrita à mão.
- **Switch e Dialog** (com comportamento — focus trap, Escape, `v-model`, portal/overlay): aqui a vantagem inicial do ds-shadcn é real — `SwitchRoot`/`SwitchThumb` e todo o conjunto `Dialog*` (incluindo acessibilidade, `DialogTitle`/`DialogDescription` via `aria-labelledby`/`aria-describedby`, close-on-Escape, focus trap) saem prontos do `add`, sem precisar escrever nada disso à mão. O custo aparece depois: o Dialog do shadcn-vue é *modular* (11 arquivos/280 linhas na pasta `ui/dialog`, dos quais só 8/176 são usados nas stories deste DS) contra 1 arquivo/59 linhas no ds-reka — mais poder de composição (Header/Footer/ScrollContent prontos para outros casos), mas também mais arquivos pra revisar, reesqueletonizar tokens e manter. Para este DS mínimo (3 componentes, 5 cores, 3 radius), o ds-reka fica mais enxuto; para um DS maior com muitas variações de Dialog, a modularidade do shadcn-vue tende a compensar mais rápido.

Em resumo: o ganho de velocidade do shadcn-vue é proporcional à complexidade comportamental do componente, mas vem acoplado a uma pegada de arquivos e convenções (tokens oklch, `data-slot`, `cn()`, variants extras) que precisa ser podada/retokenizada — trabalho que o Button não tem, mas que aparece de forma completa no Dialog.

## Rodando os dois Storybooks lado a lado

```bash
pnpm install
pnpm build:tokens   # gera packages/tokens/dist/css/variables.css

pnpm --filter ds-reka storybook    # http://localhost:6006
pnpm --filter ds-shadcn storybook  # http://localhost:6007
```

(`predev`/`prebuild`/`prestorybook` de cada app já rodam o build dos tokens automaticamente antes do respectivo comando — o passo manual acima é só pra deixar o CSS gerado disponível na primeira execução.)

Cada app também roda isoladamente com `pnpm --filter ds-reka dev` / `pnpm --filter ds-shadcn dev` (Vite dev server, portas padrão do Vite).
