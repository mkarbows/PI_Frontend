import { Action } from '@ngrx/store';

export enum ToolbarActionTypes {
  DarkModeChange = '[Dark Mode] change'
}

export class DarkModeChange implements Action {
  readonly type = ToolbarActionTypes.DarkModeChange;
  constructor(public payload: { darkMode: boolean }) {}
}

export type ToolbarActionsUnion =
| DarkModeChange;
