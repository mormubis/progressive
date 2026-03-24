import type { Game } from './types.js';

function playerResult(player: string, round: Game[]): number {
  for (const g of round) {
    if (g.white === player) {
      return g.result;
    }
    if (g.black === player) {
      return 1 - g.result;
    }
  }
  return 0;
}

function progressive(player: string, games: Game[][]): number {
  let cumulative = 0;
  let total = 0;
  for (const round of games) {
    cumulative += playerResult(player, round);
    total += cumulative;
  }
  return total;
}

function progressiveCut1(player: string, games: Game[][]): number {
  let cumulative = 0;
  let total = 0;
  for (const round of games.slice(1)) {
    cumulative += playerResult(player, round);
    total += cumulative;
  }
  return total;
}

export { progressive, progressiveCut1 };
