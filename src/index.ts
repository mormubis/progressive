import { playerResult } from './utilities.js';

import type { Game } from '@echecs/tournament';

function progressive(player: string, games: Game[][]): number {
  let cumulative = 0;
  let total = 0;
  for (const round of games) {
    cumulative += playerResult(player, round);
    total += cumulative;
  }
  return total;
}

export { progressive, progressive as tiebreak };

export type { Game, GameKind, Player, Result } from '@echecs/tournament';
