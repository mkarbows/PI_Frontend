import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offgrid-button',
  templateUrl: './offgrid-button.component.html',
  styleUrls: ['./offgrid-button.component.css']
})
export class OffgridButtonComponent implements OnInit {

  @Input() selectedNavType: string;
  @Output() mapSelectSegment = new EventEmitter();

  constructor(
    private router: Router
  ) {  }

  ngOnInit() {
  }

  selectOffGridItems() {
    this.mapSelectSegment.emit('null');
    this.router.navigate(['/dashboard', this.selectedNavType]);
  }

}
