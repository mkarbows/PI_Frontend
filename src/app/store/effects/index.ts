import { MediaEffects } from './media.effects';
import { DrawingEffects } from './drawing.effects';
import { SpecificationEffects } from './specification.effects';
import { CaEffects } from './ca.effects';
import { MapEffects } from './map.effects';
import { RightPanelEffects } from './right-panel.effects';
import { HeaderFilterEffects } from './header-filter.effects';
import { RouterEffects } from './router.effects';


export const effects: any[] = [
  MediaEffects,
  DrawingEffects,
  SpecificationEffects,
  CaEffects,
  MapEffects,
  RightPanelEffects,
  HeaderFilterEffects,
  RouterEffects
];

export * from './media.effects';
export * from './drawing.effects';
export * from './specification.effects';
export * from './ca.effects';
export * from './map.effects';
export * from './right-panel.effects';
export * from './header-filter.effects';
