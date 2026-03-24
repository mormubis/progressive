import { playerResult } from './utilities.js';

import type { Game } from './types.js';

function progressiveCut1(player: string, games: Game[][]): number {
  let cumulative = 0;
  let total = 0;
  for (const round of games.slice(1)) {
    cumulative += playerResult(player, round);
    total += cumulative;
  }
  return total;
}

export { progressiveCut1 };
