# Progressive

[![npm](https://img.shields.io/npm/v/@echecs/progressive)](https://www.npmjs.com/package/@echecs/progressive)
[![Test](https://github.com/mormubis/progressive/actions/workflows/test.yml/badge.svg)](https://github.com/mormubis/progressive/actions/workflows/test.yml)
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

// games[n] = round n+1; Game has no `round` field
const games = [
  [{ black: 'B', result: 1, white: 'A' }], // round 1 → running: 1
  [{ black: 'C', result: 0.5, white: 'A' }], // round 2 → running: 1.5
  [{ black: 'A', result: 0, white: 'D' }], // round 3 → running: 1.5
];

const score = progressive('A', games);
// 1 + 1.5 + 1.5 = 4
```

## API

All functions accept `(playerId: string, games: Game[][], players?: Player[])`
and return `number`. Round is determined by array position: `games[0]` = round
1, `games[1]` = round 2, etc. The `Game` type has no `round` field.

### `progressive(playerId, games, players?)`

**FIDE section 7.5** — Progressive score. Accumulates the player's running score
after each round, then sums all those running totals. Rounds are processed in
array order (`games[0]` = round 1). A player who scores 1, 0.5, 1 across three
rounds produces a progressive score of `1 + 1.5 + 2.5 = 5`.

### `progressiveCut1(playerId, games, players?)`

**FIDE section 7.5** — Progressive score excluding the first round. Computes the
progressive score starting from round 2 (`games[1]`), skipping the first round's
result entirely. Returns `0` when no games have been played.

## Contributing

Contributions are welcome. Please open an issue at
[github.com/mormubis/progressive/issues](https://github.com/mormubis/progressive/issues).
