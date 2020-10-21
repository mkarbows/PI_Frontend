import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ExceptionService } from './exception.service';
import { DrawingThumbnails } from 'src/app/shared/models/itemthumbnails.model';
import { MediaItem, DrawingItem, CaItem, SpecificationItem } from 'src/app/shared/models/item.model';
import { Level } from 'src/app/shared/models/level.model';
import {
  MediaTypeFilters,
  DrawingTypeFilters,
  DrawingSheetTypeFilters,
  CaTypeFilters,
  CaStatusFilters,
  MediaTerminalFilters,
  MediaPhaseFilters,
  MediaDisciplineFilters,
  MediaSegmentFilters,
  SpecificationDivisionFilters
} from 'src/app/shared/models/filter.model';

import { ConfigurationService } from '../core/configuration.service';
import { PiConfig, GeoDataTypes } from '../core/app-config';

@Injectable()
export class NoCacheHeadersInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authReq = req.clone({
            setHeaders: {
                'Cache-Control': 'no-cache',
                 Pragma: 'no-cache'
            }
        });
        return next.handle(authReq);
    }
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  config: PiConfig = this.configService.getConfig();
  apiRoot: string = this.config.apiRoot;
  geoDataTypes: GeoDataTypes = this.config.geoDataTypes;
  constructor(
    private configService: ConfigurationService,
    private http: HttpClient,
    private exceptionService: ExceptionService
  ) { }

  getMediaItems(mediaItemsQuery: string): Observable<any> {
    return this.http.get<any>(`${this.apiRoot}/mediafiles/?viewer=item_list_data&${mediaItemsQuery}`);
  }

  getMediaFileMetadata(urlEndpoint: string): Observable<MediaItem> {
    return this.http.get<any>(`${this.apiRoot}/mediafiles/${urlEndpoint}/?viewer=metadata`);
  }

  getDrawingItems(drawingItemsQuery: string): Observable<DrawingThumbnails> {
    return this.http.get<any>(`${this.apiRoot}/drawingfiles/?viewer=item_list_data&${drawingItemsQuery}`);
  }

  getDrawingFileMetadata(urlEndpoint: string): Observable<DrawingItem> {
    return this.http.get<any>(`${this.apiRoot}/drawingfiles/${urlEndpoint}/?viewer=metadata`);
  }

  getSpecificationItems(specItemsQuery: string): Observable<any> {
    return this.http.get<any>(`${this.apiRoot}/specifications/?${specItemsQuery}`);
  }

  getSpecificationFileMetadata(urlEndpoint: string): Observable<SpecificationItem> {
    return this.http.get<any>(`${this.apiRoot}/specifications/${urlEndpoint}/?viewer=metadata`);
  }

  getCaItems(caItemsQuery: string): Observable<any> {
    return this.http.get<any>(`${this.apiRoot}/caitems/?viewer=item_list_data&${caItemsQuery}`);
  }

  getCaItemMetadata(urlEndpoint: string): Observable<CaItem> {
    return this.http.get<any>(`${this.apiRoot}/caitems/${urlEndpoint}/`);
  }

  /**
   * Returns a list of valid type filters for media from the API
   */
  getMediaTypeFilters(): Observable<MediaTypeFilters> {
    return this.http.get<any>(`${this.apiRoot}/filters/?nav=medias&filter=type`);
  }

  /**
   * Returns a list of valid type filters for drawings from the API
   */
  getDrawingTypeFilters(): Observable<DrawingTypeFilters> {
    return this.http.get<any>(`${this.apiRoot}/filters/?nav=drawings&filter=type`);
  }

  /**
   * Returns a list of valid sheet type filters for drawings from the API
   */
  getDrawingSheetTypeFilters(): Observable<DrawingSheetTypeFilters> {
    return this.http.get<any>(`${this.apiRoot}/filters/?nav=drawings&filter=sheet_type`);
  }

  getSpecificationDivisionFilters(): Observable<SpecificationDivisionFilters> {
    return this.http.get<any>(`${this.apiRoot}/filters/?nav=specification&filter=division`);
  }

  /**
   * Returns a list of valid type filters for CA from the API
   */
  getCaTypeFilters(): Observable<CaTypeFilters> {
    return this.http.get<any>(`${this.apiRoot}/filters/?nav=ca&filter=type`);
  }

  /**
   * Returns a list of valid status filters for CA from the API
   */
  getCaStatusFilters(): Observable<CaStatusFilters> {
    return this.http.get<any>(`${this.apiRoot}/filters/?nav=ca&filter=status`);
  }

  /**
   * Returns a list of valid terminal filters from the API
   */
  getTerminalFilters(): Observable<MediaTerminalFilters> {
    return this.http.get<any>(`${this.apiRoot}/filters/?nav=medias&filter=${this.geoDataTypes.geoData1}`);
  }

  /**
   * Returns a list of valid phase filters from the API
   */
  getPhaseFilters(): Observable<MediaPhaseFilters> {
    return this.http.get<any>(`${this.apiRoot}/filters/?nav=medias&filter=phase`);
  }

  /**
   * Returns a list of valid discipline filters from the API
   */
  getDisciplineFilters(): Observable<MediaDisciplineFilters> {
    return this.http.get<any>(`${this.apiRoot}/filters/?nav=medias&filter=discipline`);
  }

  /**
   * Returns a list of valid level filters from the API
   */
  getLevels(): Observable<Level[]> {
    return this.http.get<any>(`${this.apiRoot}/levels/`);
  }

  getGrid(): Observable<any> {
    return this.http.get<any>(`${this.apiRoot}/geo/${this.geoDataTypes.geoData2}/`);
  }

  /**
   * Returns a list of valid segment filters from the API
   */
  getSegmentFilters(): Observable<MediaSegmentFilters> {
    return this.http.get<any>(`${this.apiRoot}/filters/?nav=medias&filter=${this.geoDataTypes.geoData2}`);
  }

  deleteMarkup(markupUrl: string): Observable<any> {
    return this.http.delete<any>(`${this.apiRoot}/markupfiles/${markupUrl}/`);
  }

  getMapData(mapDataQuery: string): Observable<any> {
    return this.http.get<any>(`${this.apiRoot}/mediafiles/?viewer=map&${mapDataQuery}`)
      .pipe(catchError(this.exceptionService.catchBadResponse));
  }

}
