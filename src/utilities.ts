import type { Game } from './types.js';

function gamesForPlayer(playerId: string, games: Game[][]): Game[] {
  return games
    .flat()
    .filter((g) => g.whiteId === playerId || g.blackId === playerId);
}

export { gamesForPlayer };
