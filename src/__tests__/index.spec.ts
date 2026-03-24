import { describe, expect, it } from 'vitest';

import { progressiveCut1 } from '../progressive-cut1.js';
import { progressive } from '../progressive.js';

import type { Game } from '../types.js';

// 4 players, 3 rounds:
// Round 1: A(W) 1-0 B, C(W) 0-1 D
// Round 2: A(W) 0.5-0.5 D, C(W) 0-1 B
// Round 3: A(W) 1-0 C, D(W) 1-0 B
// Scores: A=2.5, D=2.5, B=1, C=0

const GAMES: Game[][] = [
  [
    { black: 'B', result: 1, white: 'A' },
    { black: 'D', result: 0, white: 'C' },
  ],
  [
    { black: 'D', result: 0.5, white: 'A' },
    { black: 'B', result: 0, white: 'C' },
  ],
  [
    { black: 'C', result: 1, white: 'A' },
    { black: 'B', result: 1, white: 'D' },
  ],
];

describe('progressive', () => {
  it('returns sum of cumulative scores after each round', () => {
    // A: R1=1 (cum=1), R2=0.5 (cum=1.5), R3=1 (cum=2.5)
    // sum = 1 + 1.5 + 2.5 = 5
    expect(progressive('A', GAMES)).toBe(5);
  });

  it('handles player with no games', () => {
    expect(progressive('A', [])).toBe(0);
  });
});

describe('progressiveCut1', () => {
  it('sums cumulative scores from round 2 onwards', () => {
    // A from round 2: running sum starting after R1:
    // After R1: cum=1; R2: cum=1.5 → add 1.5; R3: cum=2.5 → add 2.5 → total=4
    // BUT per spec: recalculate from round 2:
    // cum starts at 0 from R2: R2=0.5(cum=0.5), R3=1(cum=1.5) → sum=0.5+1.5=2
    expect(progressiveCut1('A', GAMES)).toBe(2);
  });

  it('handles player with no games', () => {
    expect(progressiveCut1('A', [])).toBe(0);
  });
});
