import type { Game } from '@echecs/tournament';

function gamesForPlayer(player: string, games: Game[][]): Game[] {
  return games.flat().filter((g) => g.white === player || g.black === player);
}

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

export { gamesForPlayer, playerResult };
