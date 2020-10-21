import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
// google analytics
declare let ga: Function;


@Component({
  selector: 'app-zoom-to-selection',
  templateUrl: './zoom-to-selection.component.html',
  styleUrls: ['./zoom-to-selection.component.css']
})
export class ZoomToSelectionComponent implements OnInit {
  @Output() setZoomToSelection = new EventEmitter();

  zoomToSelection = false;

  constructor() { }

  ngOnInit() {
  }

  changeZoomToSelection() {
    this.setZoomToSelection.emit(this.zoomToSelection);
    // google analytics
    ga('send', 'event', {
      eventCategory: 'Zoom to selection',
      eventLabel: 'Toggle zoom to selection',
      eventAction: 'Toggle'
    });
  }

}
