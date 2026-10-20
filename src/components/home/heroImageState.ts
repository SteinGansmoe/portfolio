export type HeroImageState = {
  base: string;
  incoming: string | null;
  queued: string | null;
};

type Action =
  | { type: "ready"; src: string; reducedMotion: boolean }
  | { type: "finished"; requested: string }
  | { type: "reduce-motion"; requested: string };

export function initialHeroImage(src: string): HeroImageState {
  return { base: src, incoming: null, queued: null };
}

export function heroImageReducer(state: HeroImageState, action: Action): HeroImageState {
  if (action.type === "ready") {
    if (action.reducedMotion) return initialHeroImage(action.src);
    if (state.incoming) {
      return { ...state, queued: action.src === state.incoming ? null : action.src };
    }
    return action.src === state.base ? state : { ...state, incoming: action.src };
  }

  const next = state.queued === action.requested ? state.queued : null;
  if (action.type === "reduce-motion") {
    return initialHeroImage(next ?? state.incoming ?? state.base);
  }
  if (!state.incoming) return state;
  // Finish the visible blend before starting only the latest decoded destination.
  return { base: state.incoming, incoming: next, queued: null };
}
