import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// google analytics
declare let ga: Function;

@Component({
  selector: 'app-zoom-to-selection-btn',
  templateUrl: './zoom-to-selection-btn.component.html',
  styleUrls: ['./zoom-to-selection-btn.component.css']
})
export class ZoomToSelectionBtnComponent implements OnInit {
  @Output() setZoomToSelection = new EventEmitter();

  zoomToSelection = false;

  constructor() { }

  ngOnInit() {
  }

  changeZoomToSelection() {
    this.setZoomToSelection.emit(!this.zoomToSelection);
    this.zoomToSelection = !this.zoomToSelection;
    ga('send', 'event', {
      eventCategory: 'Zoom to selection',
      eventLabel: 'Toggle zoom to selection',
      eventAction: 'Toggle'
    });
  }

}
