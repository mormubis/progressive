# AGENTS.md

Agent guidance for the `@echecs/progressive` repository — a TypeScript library
implementing the Progressive Score tiebreak following FIDE Tiebreak Regulations
(section 7.5).

See the root `AGENTS.md` for workspace-wide conventions.

---

## Project Overview

Pure calculation library, no runtime dependencies. Exports two functions:

| Function          | Description                                             |
| ----------------- | ------------------------------------------------------- |
| `progressive`     | Sum of cumulative scores after each round               |
| `progressiveCut1` | Progressive score excluding the last round's cumulative |

All functions conform to the signature:

```ts
(playerId: string, games: Game[][], players?: Player[]) => number;
```

`Game[][]` is a round-indexed structure: `games[0]` contains round-1 games,
`games[1]` contains round-2 games, and so on. The `Game` type no longer has a
`round` field — round is determined by array position.

FIDE reference: https://handbook.fide.com/chapter/TieBreakRegulations032026
(section 7.5 — Progressive Score)

All source lives in `src/index.ts`; tests in `src/__tests__/index.spec.ts`.

---

## Commands

### Build

```bash
pnpm run build          # bundle TypeScript → dist/ via tsdown
```

### Test

```bash
pnpm run test                          # run all tests once
pnpm run test:watch                    # watch mode
pnpm run test:coverage                 # with coverage report

# Run a single test file
pnpm run test src/__tests__/index.spec.ts

# Run a single test by name (substring match)
pnpm run test -- --reporter=verbose -t "progressive"
```

### Lint & Format

```bash
pnpm run lint           # ESLint + tsc type-check (auto-fixes style issues)
pnpm run lint:ci        # strict — zero warnings allowed, no auto-fix
pnpm run lint:style     # ESLint only (auto-fixes)
pnpm run lint:types     # tsc --noEmit type-check only
pnpm run format         # Prettier (writes changes)
pnpm run format:ci      # Prettier check only (no writes)
```

### Full pre-PR check

```bash
pnpm lint && pnpm test && pnpm build
```

---

## Architecture Notes

- Progressive score is computed by summing the player's running score after each
  round. A player who scores 1, 0.5, 1 has a running sequence of 1, 1.5, 2.5, so
  the progressive score is `1 + 1.5 + 2.5 = 5`.
- Games are processed in round order by iterating `games[0]`, `games[1]`, …
  (round index = array index). The `Game` type has no `round` field; order is
  structural.
- `progressiveCut1` removes the final round's cumulative contribution before
  summing. This reduces the influence of the last round on the tiebreak.
- A `Game` with `black: ''` (empty string) represents a **bye**. Byes score as a
  full point for progressive purposes in accordance with FIDE rules.
- **No runtime dependencies** — keep it that way.
- **ESM-only** — the package ships only ESM. Do not add a CJS build.

---

## Validation

Input validation is provided by TypeScript's strict type system at compile time.
There is no runtime validation library. Do not add runtime type-checking guards
unless there is an explicit trust boundary (user-supplied strings, external
data).

---

## Error Handling

All functions are pure calculations and do not throw. An unplayed tournament
(zero games) returns `0` rather than throwing.
