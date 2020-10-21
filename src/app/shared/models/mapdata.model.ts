import { MapItem } from './item.model';

export interface MapData {
  type: string;
  features: MapFeature[];
}

export interface MapFeature {
  type: string;
  geometry: MapGeometry;
  properties: MapItem;
}

export interface MapGeometry {
  type: string;
  coordinates: number[];
}
