import { Level } from 'src/app/shared/models/level.model';
import { Filter } from 'src/app/shared/models/filter.model';

import {
  DataApiActions,
  ToolbarActions
} from '../actions';

export const filtersFeatureKey = 'filters';

export interface State {
  caTypeFilters: Filter[];
  caStatusFilters: Filter[];
  darkMode: boolean;
  disciplineFilters: Filter[];
  drawingTypeFilters: Filter[];
  drawingSheetTypeFilters: Filter[];
  specificationDivisionFilters: Filter[];
  levels: Level[];
  mediaTypeFilters: Filter[];
  phaseFilters: Filter[];
  terminalFilters: Filter[];
  segmentFilters: Filter[];
}

export const initialState: State = {
  caTypeFilters: [],
  caStatusFilters: [],
  darkMode: false,
  disciplineFilters: [],
  drawingTypeFilters: [],
  drawingSheetTypeFilters: [],
  specificationDivisionFilters: [],
  levels: [],
  mediaTypeFilters: [],
  phaseFilters: [],
  terminalFilters: [],
  segmentFilters: []
};

export function reducer(
  state = initialState,
  action:
    | DataApiActions.DataApiActionsUnion
    | ToolbarActions.ToolbarActionsUnion
): State {
  switch (action.type) {
    case DataApiActions.DataApiActionTypes.GetLevelsSuccess: {
      return {
        ...state,
        levels: [{
          level_name: 'Select All',
          level_number: 'SELECT ALL',
          filter: '',
        }].concat(action.payload)
      };
    }
    case DataApiActions.DataApiActionTypes.GetMediaTypeFiltersSuccess: {
      return {
        ...state,
        mediaTypeFilters: action.payload.mediaTypeFilters
      };
    }
    case DataApiActions.DataApiActionTypes.GetDrawingTypeFiltersSuccess: {
      return {
        ...state,
        drawingTypeFilters: action.payload.drawingTypeFilters
      };
    }
    case DataApiActions.DataApiActionTypes.GetDrawingSheetTypeFiltersSuccess: {
      return {
        ...state,
        drawingSheetTypeFilters: [{
          title: 'Select All',
          filter: ''
        }].concat(action.payload.drawingSheetTypeFilters)
      };
    }
    case DataApiActions.DataApiActionTypes.GetSpecificationDivisionFiltersSuccess: {
      return {
        ...state,
        specificationDivisionFilters: [{
          title: 'Select All',
          filter: ''
        }].concat(action.payload.specificationDivisionFilters)
      };
    }
    case DataApiActions.DataApiActionTypes.GetCaTypeFiltersSuccess: {
      return {
        ...state,
        caTypeFilters: action.payload.caTypeFilters
      };
    }
    case DataApiActions.DataApiActionTypes.GetCaStatusFiltersSuccess: {
      return {
        ...state,
        caStatusFilters: [{
          title: 'Select All',
          filter: ''
        }].concat(action.payload.caStatusFilters)
      };
    }
    case DataApiActions.DataApiActionTypes.GetTerminalFiltersSuccess: {
      return {
        ...state,
        terminalFilters: [{
          title: 'Select All',
          filter: ''
        }].concat(action.payload.terminalFilters)
      };
    }
    case DataApiActions.DataApiActionTypes.GetPhaseFiltersSuccess: {
      return {
        ...state,
        phaseFilters: [{
          title: 'Select All',
          filter: ''
        }].concat(action.payload.phaseFilters)
      };
    }
    case DataApiActions.DataApiActionTypes.GetDisciplineFiltersSuccess: {
      return {
        ...state,
        disciplineFilters: [{
          title: 'Select All',
          filter: ''
        }].concat(action.payload.disciplineFilters)
      };
    }
    case DataApiActions.DataApiActionTypes.GetSegmentFiltersSuccess: {
      return {
        ...state,
        segmentFilters: [{
          title: 'Select All',
          filter: ''
        }].concat(action.payload.segmentFilters).concat([{
          title: 'Outside Segment Grid',
          filter: 'null'
        }])
      };
    }
    case ToolbarActions.ToolbarActionTypes.DarkModeChange: {
      return {
        ...state,
        darkMode: action.payload.darkMode,
      };
    }
    default:
      return state;
  }
}

export const getCaTypeFilters = (state: State) => state.caTypeFilters;
export const getCaStatusFilters = (state: State) => state.caStatusFilters;
export const getDarkMode = (state: State) => state.darkMode;
export const getDisciplineFilters = (state: State) => state.disciplineFilters;
export const getSegmentFilters = (state: State) => state.segmentFilters;
export const getDrawingSheetTypeFilters = (state: State) => state.drawingSheetTypeFilters;
export const getDrawingTypeFilters = (state: State) => state.drawingTypeFilters;
export const getSpecificationDivisionFilters = (state: State) => state.specificationDivisionFilters;
export const getLevels = (state: State) => state.levels;
export const getMediaTypeFilters = (state: State) => state.mediaTypeFilters;
export const getPhaseFilters = (state: State) => state.phaseFilters;
export const getTerminalFilters = (state: State) => state.terminalFilters;
