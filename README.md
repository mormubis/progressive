# Progressive

[![npm](https://img.shields.io/npm/v/@echecs/progressive)](https://www.npmjs.com/package/@echecs/progressive)
[![Coverage](https://codecov.io/gh/mormubis/progressive/branch/main/graph/badge.svg)](https://codecov.io/gh/mormubis/progressive)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Progressive** is a TypeScript library implementing the Progressive Score
tiebreak for chess tournaments, following the
[FIDE Tiebreak Regulations](https://handbook.fide.com/chapter/TieBreakRegulations032026)
(section 7.5). Zero runtime dependencies.

## Installation

```bash
npm install @echecs/progressive
```

## Quick Start

```typescript
import { progressive } from '@echecs/progressive';
import type { Game, GameKind } from '@echecs/progressive';

// games[n] = round n+1; Game has no `round` field
const games: Game[][] = [
  [{ black: 'B', result: 1, white: 'A' }], // round 1 → running: 1
  [{ black: 'C', result: 0.5, white: 'A' }], // round 2 → running: 1.5
  [{ black: 'A', result: 0, white: 'D' }], // round 3 → running: 1.5
  // Unplayed rounds use kind to classify the bye type
  [{ black: '', kind: 'half-bye', result: 0.5, white: 'A' }], // round 4 → running: 2
];

const score = progressive('A', games);
// 1 + 1.5 + 1.5 + 2 = 6
```

## API

All functions accept `(player: string, games: Game[][])` and return `number`.
Round is determined by array position: `games[0]` = round 1, `games[1]` = round
2, etc. The `Game` type has no `round` field. The optional `kind?: GameKind`
field on `Game` identifies unplayed rounds (byes score their awarded points for
the running total).

### `progressive(player, games)`

**FIDE section 7.5** — Progressive score. Accumulates the player's running score
after each round, then sums all those running totals. Rounds are processed in
array order (`games[0]` = round 1). A player who scores 1, 0.5, 1 across three
rounds produces a progressive score of `1 + 1.5 + 2.5 = 5`.

Also exported as `tiebreak` from `@echecs/progressive`.

### `progressiveCut1(player, games)`

**FIDE section 7.5 + modifier 14.1 Cut-1 (PS-C1)** — Progressive score excluding
the first round. Round 1 (`games[0]`) is dropped entirely: the running total
resets to 0 at round 2 and accumulates from there. The cumulative totals from
rounds 2, 3, … are then summed.

For example, a player who scores 1, 0.5, 1 across three rounds:

- `progressive` running totals: 1, 1.5, 2.5 → sum = **5**
- `progressiveCut1` running totals (round 1 dropped): 0.5, 1.5 → sum = **2**

Returns `0` when fewer than two rounds have been played.

Import from the `/cut1` subpath:

```typescript
import { progressiveCut1, tiebreak } from '@echecs/progressive/cut1';
```

Also exported as `tiebreak` from `@echecs/progressive/cut1`.

## Exports

### `@echecs/progressive`

| Export        | Kind     | Description                                    |
| ------------- | -------- | ---------------------------------------------- |
| `progressive` | function | Progressive score (FIDE 7.5)                   |
| `tiebreak`    | function | Alias for `progressive`                        |
| `Game`        | type     | A single chess game with result and players    |
| `GameKind`    | type     | Unplayed-round classifier (`'half-bye'`, etc.) |
| `Player`      | type     | Player shape (`{ id: string }`)                |
| `Result`      | type     | Score value (`0 \| 0.5 \| 1`)                  |

### `@echecs/progressive/cut1`

| Export            | Kind     | Description                                    |
| ----------------- | -------- | ---------------------------------------------- |
| `progressiveCut1` | function | Progressive score excluding round 1 (PS-C1)    |
| `tiebreak`        | function | Alias for `progressiveCut1`                    |
| `Game`            | type     | A single chess game with result and players    |
| `GameKind`        | type     | Unplayed-round classifier (`'half-bye'`, etc.) |
| `Player`          | type     | Player shape (`{ id: string }`)                |
| `Result`          | type     | Score value (`0 \| 0.5 \| 1`)                  |

## Contributing

Contributions are welcome. Please open an issue at
[github.com/mormubis/progressive/issues](https://github.com/mormubis/progressive/issues).
