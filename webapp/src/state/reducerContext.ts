import React from 'react';

type ContextType<State, Action> = [State, React.Dispatch<Action>];

export function makeReducerContext<State, Action>(): React.Context<
  ContextType<State, Action>
> {
  return React.createContext<ContextType<State, Action>>(
    // This default value should never be used, it's just there to appease TS
    {} as ContextType<State, Action>
  );
}
