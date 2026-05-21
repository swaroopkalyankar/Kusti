// ===============================
// TYPES
// ===============================

export type MatchStatus = 'LIVE' | 'PAUSED' | 'FINISHED';

export type Wrestler = 'A' | 'B';

export type ActionType =
  | 'PUSHOUT'
  | 'TAKEDOWN'
  | 'THROW'
  | 'GRAND_AMPLITUDE'
  | 'REVERSAL'
  | 'PASSIVITY_WARNING'
  | 'PENALTY';

export type MatchLogEntry = {
  time: number;
  wrestler: Wrestler;
  action: ActionType;
  points: number;
};

export type MatchState = {
  scoreA: number;
  scoreB: number;
  warningsA: number;
  warningsB: number;

  status: MatchStatus;
  winner: Wrestler | null;

  log: MatchLogEntry[];

  period: number;
  maxPeriods: number;

  techFallDiff: number; // e.g. 10 point gap rule
};

// ===============================
// INITIAL STATE
// ===============================

export const initialMatchState: MatchState = {
  scoreA: 0,
  scoreB: 0,

  warningsA: 0,
  warningsB: 0,

  status: 'LIVE',
  winner: null,

  log: [],

  period: 1,
  maxPeriods: 2,

  techFallDiff: 10,
};

// ===============================
// RULE ENGINE CORE
// ===============================

const POINTS_MAP: Record<ActionType, number> = {
  PUSHOUT: 1,
  TAKEDOWN: 2,
  THROW: 4,
  GRAND_AMPLITUDE: 5,
  REVERSAL: 1,
  PASSIVITY_WARNING: 0,
  PENALTY: 1,
};

export function applyAction(
  state: MatchState,
  wrestler: Wrestler,
  action: ActionType
): MatchState {
  if (state.status === 'FINISHED') return state;

  const points = POINTS_MAP[action] ?? 0;

  let newState = { ...state };

  // ===============================
  // SCORE UPDATE
  // ===============================
  if (wrestler === 'A') newState.scoreA += points;
  else newState.scoreB += points;

  // ===============================
  // WARNING / PENALTY LOGIC
  // ===============================
  if (action === 'PASSIVITY_WARNING') {
    if (wrestler === 'A') newState.warningsA += 1;
    else newState.warningsB += 1;

    // 2 warnings = +1 penalty to opponent
    if (wrestler === 'A' && newState.warningsA >= 2) {
      newState.scoreB += 1;
    }
    if (wrestler === 'B' && newState.warningsB >= 2) {
      newState.scoreA += 1;
    }
  }

  // ===============================
  // LOG ENTRY
  // ===============================
  newState.log = [
    ...newState.log,
    {
      time: Date.now(),
      wrestler,
      action,
      points,
    },
  ];

  // ===============================
  // WIN CONDITIONS
  // ===============================

  const diff = Math.abs(newState.scoreA - newState.scoreB);

  // TECHNICAL SUPERIORITY (like 10-point gap)
  if (diff >= newState.techFallDiff) {
    newState.status = 'FINISHED';
    newState.winner = newState.scoreA > newState.scoreB ? 'A' : 'B';
    return newState;
  }

  // ===============================
  // RETURN STATE
  // ===============================
  return newState;
}

// ===============================
// MANUAL WIN CONTROL
// ===============================

export function declareWinner(
  state: MatchState,
  winner: Wrestler
): MatchState {
  return {
    ...state,
    winner,
    status: 'FINISHED',
  };
}

// ===============================
// RESET MATCH
// ===============================

export function resetMatch(): MatchState {
  return initialMatchState;
}