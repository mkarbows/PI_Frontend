/**
 * Smallest units of filters
 */
export interface Filter {
  title: string;
  filter: string;
}

/**
 * Groups of type filters
 */
export interface TypeFilters {
  type: Filter[];
}

/**
 * Groups of status filters
 */
export interface StatusFilters {
  status: Filter[];
}

/**
 * Groups of sheet type filters
 */
export interface SheetTypeFilters {
  sheet_type: Filter[];
}

export interface DivisionFilters {
  division: Filter[];
}

/**
 * Top-level groups of media types
 */
export interface MediaTypeFilters {
    medias: TypeFilters;
}

/**
 * Top-level groups of drawing types
 */
export interface DrawingTypeFilters {
  drawings: TypeFilters;
}

/**
 * Top-level groups of drawing sheet types
 */
export interface DrawingSheetTypeFilters {
  drawings: SheetTypeFilters;
}

/**
 * Top-level groups of specification division types
 */
export interface SpecificationDivisionFilters {
  specification: DivisionFilters;
}

/**
 * Top-level groups of ca types
 */
export interface CaTypeFilters {
  ca: TypeFilters;
}

/**
 * Top-level groups of ca statuses
 */
export interface CaStatusFilters {
  ca: StatusFilters;
}

/**
 * Groups of terminal filters
 */
export interface TerminalFilters {
  terminal: Filter[];
}

/**
 * Top-level groups of media terminals
 */
export interface MediaTerminalFilters {
  medias: TerminalFilters;
}

/**
 * Groups of phase filters
 */
export interface PhaseFilters {
  phase: Filter[];
}

/**
 * Top-level groups of media phases
 */
export interface MediaPhaseFilters {
  medias: PhaseFilters;
}

/**
 * Groups of discipline filters
 */
export interface DisciplineFilters {
  discipline: Filter[];
}

/**
 * Top-level groups of media disciplines
 */
export interface MediaDisciplineFilters {
  medias: DisciplineFilters;
}

/**
 * Groups of segment filters
 */
export interface SegmentFilters {
  segment: Filter[];
}

/**
* Top-level groups of media segments
*/
export interface MediaSegmentFilters {
  medias: SegmentFilters;
}
