import type { Game } from './types.js';

function playerResult(playerId: string, round: Game[]): number {
  for (const g of round) {
    if (g.white === playerId) {
      return g.result;
    }
    if (g.black === playerId) {
      return 1 - g.result;
    }
  }
  return 0;
}

function progressive(playerId: string, games: Game[][]): number {
  let cumulative = 0;
  let total = 0;
  for (const round of games) {
    cumulative += playerResult(playerId, round);
    total += cumulative;
  }
  return total;
}

function progressiveCut1(playerId: string, games: Game[][]): number {
  let cumulative = 0;
  let total = 0;
  for (const round of games.slice(1)) {
    cumulative += playerResult(playerId, round);
    total += cumulative;
  }
  return total;
}

export { progressive, progressiveCut1 };

export type { Game, Player, Result } from './types.js';
