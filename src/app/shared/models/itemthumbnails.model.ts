import { Item, MediaThumbnailItem, DrawingThumbnailItem, SpecificationThumbnailItem, CaThumbnailItem } from './item.model';

export interface ItemThumbnails {
  photo: Thumbnails;
  pano: Thumbnails;
  video: Thumbnails;
  drawing: Thumbnails;
}

export interface Thumbnails {
  data: Item[];
  total_files: number;
  page_count: number;
}

export interface MediaThumbnails {
  data: MediaThumbnailItem[];
  total_files: number;
  page_count: number;
}

export interface DrawingThumbnails {
  data: DrawingThumbnailItem[];
  total_files: number;
  page_count: number;
}

export interface SpecificationThumbnails {
  data: SpecificationThumbnailItem[];
  total_files: number;
  page_count: number;
}

export interface CaThumbnails {
  data: CaThumbnailItem[];
  total_files: number;
  page_count: number;
}
