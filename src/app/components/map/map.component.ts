import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  Injector,
  ApplicationRef,
  ComponentFactoryResolver
} from '@angular/core';
import { Router } from '@angular/router';
import { loadModules } from 'esri-loader';
import { loadCss } from 'esri-loader';
import esri = __esri;
import { MapItem, MediaItem } from 'src/app/shared/models/item.model';
import { MapData, MapFeature } from 'src/app/shared/models/mapdata.model';
import { OffgridButtonComponent } from '../offgrid-button/offgrid-button.component';
import { Level } from 'src/app/shared/models/level.model';
import { MapConfig } from 'src/app/core/app-config';
import { ZoomToSelectionBtnComponent } from '../zoom-to-selection-btn/zoom-to-selection-btn.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {
  constructor(
    public injector: Injector,
    public offgridButton: OffgridButtonComponent,
    public zoomToSelectionButton: ZoomToSelectionBtnComponent,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  @Input() mapConfig: MapConfig;
  @Input() segments: Array<any> = [];
  @Input() mapData: MapData;
  @Input() mediaItem: MediaItem;
  @Input() mediaItemHover: string;
  @Input() currentItemSegments: string[];
  @Input() hoveredItemSegments: string[];

  @Input() selectedNavType: string;
  @Input() selectedItemType: string;
  @Input() zoomToSelection: boolean;
  @Input() resetMapInitialState: boolean;
  @Input() levels: Level[];
  @Input() darkMode: boolean;
  @Input() filteredSegment: string;

  @Output() selectItem = new EventEmitter();
  @Output() mapLoaded = new EventEmitter<boolean>();
  @Output() mapSelectSegment = new EventEmitter();
  @Output() changePage = new EventEmitter();
  @Output() mapMarkerHover: EventEmitter<string> = new EventEmitter<string>();
  @Output() mapInitialState = new EventEmitter();
  @Output() setZoomToSelection = new EventEmitter();

  map: esri.Map;
  mapView: esri.MapView;
  lightBasemap: esri.Basemap;
  darkBasemap: esri.Basemap;
  satelliteBasemap: esri.Basemap;

  @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;

  private GraphicsLayer;
  private Point;
  private Graphic;
  private itemsLayer;
  private gridLayer;
  private itemSymbols = [];
  private itemGraphics = [];
  private segmentGraphics = {};
  private childNodes = [];
  private loaded: boolean;

  _zoom: number;
  _center: Array<number>;
  _basemap: string;

  private itemSymbol = {
    type: 'simple-marker',
    color: [66, 65, 117, 0.7],
    size: '9px',
    outline: {
      color: [66, 65, 117],
      width: 1
    }
  };
  private highlightItemSymbol = {
    type: 'simple-marker',
    color: [209, 43, 125, 0.7],
    size: '11px',
    outline: {
      color: [209, 43, 125],
      width: 1
    }
  };
  private segmentSymbol = {
    type: 'simple-fill',
    color: [110, 215, 216, 0.3],
    outline: {
      color: [110, 215, 216, 0.6],
      width: 0.5
    }
  };
  private highlightSegmentSymbol = {
    type: 'simple-fill',
    color: [143, 152, 229, 0.3],
    outline: {
      color: [143, 152, 229, 0.3],
      width: 1
    }
  };
  private currentMapMarkerHoverId = null;
  private segmentHoverId = null;
  private selectedItemId = null;
  private clickedSegmentId = null;
  private selectedGeom = null;

  async initializeMap() {
    try {
      loadCss('https://js.arcgis.com/4.10/esri/css/main.css');
      const [
        EsriMap,
        EsriMapView,
        Graphic,
        Polygon,
        GraphicsLayer,
        FeatureLayer,
        Point,
        Locate,
        Home,
        watchUtils,
        Basemap,
        VectorTileLayer,
        Compass,
        BasemapToggle,
        Track
      ] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/Graphic',
        'esri/geometry/Polygon',
        'esri/layers/GraphicsLayer',
        'esri/layers/FeatureLayer',
        'esri/geometry/Point',
        'esri/widgets/Locate',
        'esri/widgets/Home',
        'esri/core/watchUtils',
        'esri/Basemap',
        'esri/layers/VectorTileLayer',
        'esri/widgets/Compass',
        'esri/widgets/BasemapToggle',
        'esri/widgets/Track'
      ]);

      const self = this;

      this.GraphicsLayer = GraphicsLayer;
      this.Point = Point;
      this.Graphic = Graphic;

      // set light and dark basemaps to local variable
      this.lightBasemap = Basemap.fromId('gray-vector');
      this.satelliteBasemap = Basemap.fromId('satellite');
      // custom basemap at https://developers.arcgis.com/vector-tile-style-editor/cbb458803097438baf6b61eb1d4a1e6a
      this.darkBasemap = new Basemap({
        baseLayers: [
          new VectorTileLayer({
            portalItem: {
              id: 'cbb458803097438baf6b61eb1d4a1e6a'
            }
          })
        ]
      });

      this._basemap = this.mapConfig.basemap;
      this._center = this.mapConfig.center;
      this._zoom = this.mapConfig.zoom;
      const mapProperties: esri.MapProperties = { basemap: this._basemap };
      this.map = new EsriMap(mapProperties);

      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: this._center,
        zoom: this._zoom,
        map: this.map
      };
      this.mapView = new EsriMapView(mapViewProperties);

      const basemapToggle = new BasemapToggle({
        view: this.mapView,  // The view that provides access to the map's "streets" basemap
        nextBasemap: 'satellite'
      });

      this.mapView.ui.add(basemapToggle, 'top-right');

      const homeWidget = new Home({
        view: this.mapView
      });
      this.mapView.ui.add(homeWidget, 'top-left');

      const zoomToSlctnBtn = this.createCustomMapComponent({
        component: ZoomToSelectionBtnComponent,
        nodeId: 'zoom-to-selection-btn-component',
        inputs: {},
        outputs: {
          setZoomToSelection: function(zoomToSelection: boolean) {
            self.emitSetZoomToSelection(zoomToSelection);
          }
        }
      });
      this.mapView.ui.add(zoomToSlctnBtn, 'top-left');

      const track = new Track({
        view: this.mapView
      });
      this.mapView.ui.add(track, 'top-left');

      const compass = new Compass({
        view: this.mapView
      });

      this.mapView.ui.add(compass, 'top-left');

      // removing offgrid button - retaining code until DELTALAX-801
      //
      // const offGridBtn = this.createCustomMapComponent({
      //   component: OffgridButtonComponent,
      //   nodeId: 'offgrid-button-component',
      //   inputs: {
      //     selectedNavType: this.selectedNavType
      //   },
      //   outputs: {
      //     mapSelectSegment: function(changeSegment: string) {
      //       self.emitMapSelectSegment(changeSegment);
      //     }
      //   }
      // });
      // this.mapView.ui.add(offGridBtn, 'top-left');

       /** create graphics layer for segment grid */
       const segment = [];
       this.gridLayer = new GraphicsLayer({
         graphics: []
       });
       // loop through the segments data and create a polygon for each segment
       this.segments.map(d => {
         segment[d.properties.filter] = new Polygon({
           spatialReference: { wkid: 4326 },
           rings: d.geometry.coordinates
         });
         // make each polygon into a graphic
         this.segmentGraphics[d.properties.filter] = new Graphic({
           geometry: segment[d.properties.filter],
           symbol: this.segmentSymbol,
           attributes: {
             segmentId: d.properties.filter
           }
         });
         // add each graphic to the gridLayer
         this.gridLayer.add(this.segmentGraphics[d.properties.filter]);
       });
       this.map.add(this.gridLayer);

      /** create featureLayer for segment labels */
      const segmentFeatureLayer = [];
      this.segments.map(s => {
        segmentFeatureLayer.push(
          {
            geometry: {
              type: 'polygon',
              rings: s.geometry.coordinates
            },
            attributes: {
              segment_id: s.properties.shape_id
            }
          }
        );
      });

      const segmentLabels = {
        symbol: {
          type: 'text',
          color: '#6ed7d8',
          haloColor: 'white',
          font: {
            family: 'Arial',
            size: 10,
          }
        },
        labelPlacement: 'always-horizontal',
        labelExpressionInfo: {
          expression: '$feature.segment_id'
        }
      };

      const segmentPoints = new FeatureLayer({
        source: segmentFeatureLayer,
        objectIdField: this.segments[0].properties.segment_id,
        fields: [{
          name: 'objectID',
          type: 'oid'
        }, {
          name: 'segment_id',
          type: 'string'
        }],
        labelingInfo: [segmentLabels],
        renderer: {
          type: 'simple',
        }
      });

      this.map.add(segmentPoints);

      //  If there is already a selection (i.e. if you went directly to a drawing fullsize url),
      //  highlight the segment
      if (this.currentItemSegments) {
        for (const s of this.currentItemSegments) {
          this.highlightMapSegment(s);
        }
      }

      // Register user interaction events
      this.registerClickListener();
      this.registerHoverListener();
      this.registerLeaveListener();

      // watch for map extent change => map is no longer in initial state
      watchUtils.whenTrue(self.mapView, 'interacting', function() {
        if (self.mapView.extent) {
          self.emitMapInitialState(false);
        }
      });

      this.mapView.when(() => {
        this._basemap = 'gray-vector';
        this.map.basemap = this.lightBasemap;

        this.mapLoaded.emit(true);
        this.loaded = true;
      });
    } catch (error) {
      console.log('We have an error: ' + error);
    }
  }

  /**
   * Listen for click event on a segment, highlight it and emit the segment id
   * */
  registerClickListener() {
    this.mapView.on('click', event => {
      this.mapView.hitTest(event).then(response => {

        const lastSelectedSegmentId = this.clickedSegmentId;
        let newSelectedSegmentId = lastSelectedSegmentId;

        const lastSelectedItemId = this.selectedItemId;
        this.selectedItemId = null;
        let selectedItem = {
          id: null,
          url_endpoint: null,
          type: null,
          bearing: null
        };
        let selectedGeom = null;

        this.emitMapInitialState(false);

        response.results.filter(result => {
          switch (result.graphic.layer) {
            case this.gridLayer:
              newSelectedSegmentId = result.graphic.attributes.segmentId;
              this.clickedSegmentId = newSelectedSegmentId;
              selectedGeom = result.graphic.geometry;
              break;
            case this.itemsLayer:
              this.selectedItemId = result.graphic.attributes.url_endpoint;
              selectedItem = result.graphic.attributes;
              break;
          }
        });


        if (!this.selectedItemId) {
          // if the segment has been clicked on for a second time, remove the filter and highlight
          // this functionality can be replaced as part of DELTALAX-705
          // if (newSelectedSegmentId === lastSelectedSegmentId) {
          //   newSelectedSegmentId = '';
          //   this.clickedSegmentId = '';
          // }

          this.emitMapSelectSegment(newSelectedSegmentId);
          this.unhighlightMapSegment(lastSelectedSegmentId);
          this.highlightMapSegment(newSelectedSegmentId);
        }


        if (this.selectedItemId !== lastSelectedItemId) {
          this.emitMapSelectItem(selectedItem);
          this.unhighlightMapMarker(lastSelectedItemId);
          this.highlightMapMarker(this.selectedItemId);
        }

        if (this.zoomToSelection && selectedGeom) {
          this.mapView.goTo({
            target: selectedGeom,
            zoom: 22
          });
          this.emitMapInitialState(false);
        }
      });
    });
  }

  /**
   * Listen for mouse moves over the map and highlight the correct point and/or segment
   */
  registerHoverListener() {
    this.mapView.on('pointer-move', event => {
      this.mapView.hitTest(event).then(response => {
        let cursor = 'default';

        const lastSegmentHoverId = this.segmentHoverId;
        this.segmentHoverId = null;
        const lastMapMarkerHoverId = this.currentMapMarkerHoverId;

        this.currentMapMarkerHoverId = null;


        response.results.filter(result => {
          switch (result.graphic.layer) {
            case this.gridLayer:
              cursor = 'pointer';
              this.segmentHoverId = result.graphic.attributes.segmentId;
              break;
            case this.itemsLayer:
              cursor = 'pointer';
              this.currentMapMarkerHoverId =
                result.graphic.attributes.url_endpoint;
              break;
          }
        });

        if (this.segmentHoverId !== lastSegmentHoverId) {
          this.unhoverMapSegment(lastSegmentHoverId);
          this.hoverMapSegment(this.segmentHoverId);
        }

        if (this.currentMapMarkerHoverId !== lastMapMarkerHoverId) {
          this.emitMapMarkerHover(this.currentMapMarkerHoverId);
          this.unhoverMapMarker(lastMapMarkerHoverId);
          this.hoverMapMarker(this.currentMapMarkerHoverId);
        }

        this.mapViewEl.nativeElement.style.cursor = cursor;
      });
    });
  }

  /**
   * Listen for when the mouse leaves the map element and remove all highlights
   */
  registerLeaveListener() {
    this.mapView.on('pointer-leave', event => {
      this.unhoverMapSegment(this.segmentHoverId);
      this.segmentHoverId = null;
      this.unhoverMapMarker(this.currentMapMarkerHoverId);
      this.currentMapMarkerHoverId = null;
    });
  }

  ngOnInit() {
    this.initializeMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    // pass all changes to child nodes
    this.childNodes.forEach((node: any) => {
      Object.keys(node.inputs).forEach((i: string) => {
        if (changes[i]) {
          node.componentRef.instance[i] = changes[i].currentValue;
        }
      });
    });

    if (changes.selectedItemType) {
      if (this.itemsLayer) {
        this.map.remove(this.itemsLayer);
      }
      this.createMapData();
    }

    if (changes.mapData) {
      if (this.itemsLayer) {
        this.map.remove(this.itemsLayer);
      }
      if (changes.mapData.currentValue !== null) {
        this.createMapData();
      }
    }

    // if there are map markers on the map, highlight the markers when a thumbnail is hovered
    if (
      changes.mediaItemHover &&
      this.clickedSegmentId !== '' &&
      this.selectedNavType !== 'drawing'
    ) {
      this.unhoverMapMarker(changes.mediaItemHover.previousValue);
      this.hoverMapMarker(changes.mediaItemHover.currentValue);
    }

    // listen for segment selection changes
    if (changes.currentItemSegments) {
      if (changes.currentItemSegments.previousValue) {
        for (const segment of changes.currentItemSegments.previousValue) {
          this.unhighlightMapSegment(segment);
        }
      }
      if (changes.currentItemSegments.currentValue) {
        for (const segment of changes.currentItemSegments.currentValue) {
          this.highlightMapSegment(segment);
        }
      }
    }

    // listen for segment hover changes
    if (changes.hoveredItemSegments) {
      if (changes.hoveredItemSegments.previousValue &&
        changes.hoveredItemSegments.previousValue.length > 0
      ) {
        for (const segment of changes.hoveredItemSegments.previousValue) {
          this.unhoverMapSegment(segment);
        }
      }
      if (changes.hoveredItemSegments.currentValue &&
        changes.hoveredItemSegments.currentValue.length > 0
      ) {
        for (const segment of changes.hoveredItemSegments.currentValue) {
          this.hoverMapSegment(segment);
        }
      }
    }

    // if the header segment filter is changed and zoom to selected is true
    if (this.zoomToSelection && this.filteredSegment) {
      this.segments.forEach(segment => {
        if (segment.properties.segment_id === this.filteredSegment.toUpperCase()) {
          this.selectedGeom = segment.geometry.coordinates;
        }
      });
      this.mapView.goTo({
        target: this.selectedGeom,
        zoom: 19
      });
      this.emitMapInitialState(false);
    }

    // listen for outside grid button click
    if (changes.filteredSegment) {
      this.unhighlightMapSegment(changes.filteredSegment.previousValue);
      if (changes.filteredSegment.currentValue !== 'null' && changes.filteredSegment.currentValue !== '') {
        this.highlightMapSegment(changes.filteredSegment.currentValue);
      }
    }

    // if you're looking at images and a segment has been selected,
    // then highlight coordinates when fullsize image is being viewed
    if (
      changes.mediaItem &&
      changes.mediaItem.firstChange !== true &&
      this.clickedSegmentId !== ''
    ) {
      if (changes.mediaItem.previousValue && changes.mediaItem.previousValue !== changes.mediaItem.currentValue) {
        this.selectedItemId = null;
        this.unhighlightMapMarker(changes.mediaItem.previousValue.url_endpoint);
      }
      if (
        changes.mediaItem.currentValue &&
        changes.mediaItem.currentValue.type !== 'drawing'
      ) {
        this.selectedItemId = changes.mediaItem.currentValue.url_endpoint;
        this.highlightMapMarker(changes.mediaItem.currentValue.url_endpoint);
      }
    }

    // reset button was pressed...
    if (
      changes.resetMapInitialState &&
      changes.resetMapInitialState.previousValue === false &&
      changes.resetMapInitialState.currentValue === true
    ) {
      // ...with zoom to select turned on
      if (this.zoomToSelection) {
        this.mapView.goTo({
          target: this._center,
          zoom: this._zoom
        });
      }
      this.unhighlightMapSegment(this.clickedSegmentId);
      this.clickedSegmentId = '';
    }

    // check darkMode true
    if (
      changes.darkMode &&
      changes.darkMode.previousValue === false &&
      changes.darkMode.currentValue === true
    ) {
      // set basemap to dark
      this._basemap = 'custom-gray-vector';
      this.map.basemap = this.darkBasemap;
    }

    // check darkMode false
    if (
      changes.darkMode &&
      changes.darkMode.previousValue === true &&
      changes.darkMode.currentValue === false
    ) {
      // set basemap to light
      this._basemap = 'gray-vector';
      if (this.lightBasemap) {
        this.map.basemap = this.lightBasemap;
      }
    }
  }

  createCustomMapComponent(values: {
    nodeId: string;
    component: any;
    inputs: {};
    outputs: {};
  }) {
    const node = document.createElement(values.nodeId);
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      values.component
    );
    const componentRef = factory.create(this.injector, [], node);
    Object.keys(values.inputs).forEach((i: string) => {
      componentRef.instance[i] = values.inputs[i];
    });
    Object.keys(values.outputs).forEach((o: string) => {
      componentRef.instance[o].subscribe(data => values.outputs[o](data));
    });
    this.applicationRef.attachView(componentRef.hostView);
    this.childNodes.push({
      node: node,
      inputs: values.inputs,
      componentRef: componentRef
    });
    return node;
  }

  /**
   * Change the styling on the graphic to highlight it
   *
   * @param id - Id of the graphic to highlight
   */
  highlightMapMarker(id: string) {
    const currentGraphic = this.itemGraphics[id];
    if (currentGraphic) {
      const lastIndex = this.itemsLayer.graphics.length - 1;
      this.itemsLayer.graphics.reorder(currentGraphic, lastIndex);
      currentGraphic.symbol = this.highlightItemSymbol;
    }
  }

  /**
   * Change the styling on the highlighted graphic back to normal
   *
   * @param id - Id of the graphic to unhighlight
   */
  unhighlightMapMarker(id: string) {
    const currentGraphic = this.itemGraphics[id];

    if (currentGraphic) {
      currentGraphic.symbol = this.itemSymbol;
      this.itemsLayer.graphics.reorder(currentGraphic, 0);
    }
  }

  /**
   * check that the graphic does not related to the selected item,
   * If it is not, change the styling to highlight it
   *
   * @param id - Id to check against selectedItemId
   */
  hoverMapMarker(id: string) {
    if (id && id !== this.selectedItemId) {
      this.highlightMapMarker(id);
    }
  }

  /**
   * check that the graphic does not related to the selected item,
   * If it is not, change the styling to un-highlight it
   *
   * @param  id - Id to check against selectedItemId
   */
  unhoverMapMarker(id: string) {
    if (id && id !== this.selectedItemId) {
      this.unhighlightMapMarker(id);
    }
  }

  /**
   * Change the styling on the segment graphic to highlight it
   *
   * @param id - Id of the segment graphic to highlight
   */
  highlightMapSegment(id) {
    let lowerCaseId = '';
    if (id) {
      lowerCaseId = id.toLowerCase();
    }
    const currentGraphic = this.segmentGraphics[lowerCaseId];
    if (currentGraphic) {
      currentGraphic.symbol = this.highlightSegmentSymbol;
    }
  }

  /**
   * Change the styling on the segment graphic to unhighlight it
   *
   * @param id - Id of the segment graphic to unhighlight
   */
  unhighlightMapSegment(id) {
    let lowerCaseId = '';
    if (id) {
      lowerCaseId = id.toLowerCase();
    }
    const currentGraphic = this.segmentGraphics[lowerCaseId];
    if (currentGraphic) {
      currentGraphic.symbol = this.segmentSymbol;
    }
  }

  /**
   * check that the segment id provided is not the same as the selected segment
   * If it is not, change the styling to highlight it
   *
   * @param id - Id to check against selectedSegment
   */
  hoverMapSegment(id) {
    if (this.currentItemSegments.indexOf(id) < 0 && id !== this.clickedSegmentId) {
      this.highlightMapSegment(id);
    }
  }

  /**
   * check that the segment id provided is not the same as the selected segment
   * If it is not, change the styling to unhighlight it
   *
   * @param id - Id to check against selectedSegment
   */
  unhoverMapSegment(id) {
    if (this.currentItemSegments.indexOf(id) < 0 && id !== this.clickedSegmentId) {
      this.unhighlightMapSegment(id);
    }
  }

  loopThroughItems(feature: MapFeature) {
    const thisGraphic = new this.Graphic({
      geometry: new this.Point({
        x: feature.geometry.coordinates[0],
        y: feature.geometry.coordinates[1]
      }),
      symbol: this.itemSymbol,
      attributes: feature.properties
    });
    this.itemGraphics[feature.properties.url_endpoint] = thisGraphic;
    this.itemsLayer.add(thisGraphic);
  }

  createMapData() {
    if (this.mapData && this.mapData.features && this.loaded) {
      this.itemsLayer = new this.GraphicsLayer({
        graphics: []
      });
      if (this.selectedNavType === 'media') {
        Object.keys(this.mapData.features).map(marker => {
          if (
            this.selectedItemType ===
            this.mapData.features[marker].properties.type
          ) {
            this.loopThroughItems(this.mapData.features[marker]);
          }
        });
      }
      this.map.add(this.itemsLayer);
    }
  }

  emitMapSelectItem(item: MapItem) {
    this.selectItem.emit({ mediaItem: item, selectedNavType: item.type });
  }

  emitMapSelectSegment(id) {
    this.mapSelectSegment.emit(id);
  }

  /**
   * Emit the id of the map marker currently being hovered over to the map container
   *
   * @param id - id (url_endpoint) of map marker
   */
  emitMapMarkerHover(mapMarkerHoverId: string) {
    this.mapMarkerHover.emit(mapMarkerHoverId);
  }

  emitMapInitialState(init: boolean) {
    this.mapInitialState.emit({ init: init });
  }

  emitSetZoomToSelection(zoomToSelection: boolean) {
    // console.log(zoomToSelection);
    this.setZoomToSelection.emit(zoomToSelection);
  }

}
