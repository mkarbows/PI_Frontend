export interface Item {
  url_endpoint: string;
}

export interface MediaThumbnailItem extends Item {
  title: string;
  type: string;
  geodata: any;
}

export interface MediaItem extends MediaThumbnailItem {
  id: number;
  taken_by: string;
  time: Date;
  lat: number;
  lon: number;
  altitude: number;
  bearing_simple: string;
  dhash: string;
  level_name: string;
  level_number: string;
  discipline: string[];
  folder: string[];
  file_name: string[];
  file_path: string[];
  download: string;
  stream: string;
}

export interface DrawingAssociatedItem extends Item {
  sheet_type: string;
  sheet_type_id: string;
  drawing_number: string;
  title: string;
  type: string;
  url_endpoint: string;
}

export interface DrawingThumbnailItem extends DrawingAssociatedItem {
  level_number: string;
  phase: string;
  discipline: string[];
  time: Date;
  markups: MarkupItem[];
  geodata: any;
}

export interface DrawingItem extends DrawingThumbnailItem {
  id: number;
  file_name: string;
  level_name: string;
  sheet_number: string;
  plan_type: string;
  folder: string;
  file_path: string;
  path: string;
  markups: MarkupItem[];
  associated_caitems: CaAssociatedItem[];
  download: string;
  stream: string;
}

export interface SpecificationAssociatedItem extends Item {
  spec_number: string;
  spec_title: string;
  division: string;
  url_endpoint: string;
  phase_group: string;
  type: string;
}

export interface SpecificationThumbnailItem extends SpecificationAssociatedItem {
  id: number;
  phase: string[];
  discipline: string[];
  time: string;
}

export interface SpecificationItem extends SpecificationThumbnailItem {
  associated_caitems: CaAssociatedItem[];
  download: string;
  stream: string;
}

export interface CaAssociatedItem extends Item {
  ca_number: string;
  title: string;
  type: string;
}

export interface CaThumbnailItem extends CaAssociatedItem {
  discipline: string[];
  level_name: string[];
  level_number: string[];
  phase: string;
  status: string;
  time: Date;
  return_date: Date;
  geodata: any;
}

export interface CaItem extends CaThumbnailItem {
  cafiles: CaItemFile[];
  associated_drawings: DrawingAssociatedItem[];
  pmtk_url: string;
  create_date: Date;
  update_date: Date;
  issue_date: Date;
  receive_date: Date;
  due_date: Date;
  return_date: Date;
  administrator: string;
  return_company: string;
  responsible_firm: string;
  grid: string;
  description: string;
  specifications: SpecificationAssociatedItem[];
}

export interface CaItemFile {
  file_path: string;
  file_name: string;
  download: string;
  stream: string;
}

export interface MapItem extends Item {
  id: number;
  type: string;
  bearing: number;
}

export interface MarkupItem extends Item {
  username: string;
  comments: string;
  time: Date;
  title: string;
}
