import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-start-date-filter',
  templateUrl: './start-date-filter.component.html',
  styleUrls: ['./start-date-filter.component.css']
})
export class StartDateFilterComponent implements OnInit, OnChanges {

  @Input() selectedStartDate: string;
  @Input() selectedEndDate: string;
  @Output() changeStartDateSelection = new EventEmitter();

  datePipe: DatePipe = new DatePipe('en-US');
  displayStartDate: any;
  minDate = new Date(1960, 2, 22); // 03-22-1960
  maxDate = new Date(); // max date is the current date

  constructor() { }

   ngOnInit() {
     this.displayStartDate = this.minDate;
     if (this.selectedStartDate) {
       this.displayStartDate = new Date(this.selectedStartDate.replace(/-/g, '\/'));
     }
   }

   ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedStartDate) {
      if (changes.selectedStartDate.currentValue === '') {
        this.displayStartDate = this.minDate;
      }
    }
    if (changes.selectedEndDate) {
      if (changes.selectedEndDate.currentValue !== '') {
        this.maxDate = new Date(this.selectedEndDate);
      }
    }
   }

  emitChangeStartDate(e) {
    this.displayStartDate = e.value;
    let startDate = this.datePipe.transform(new Date(e.value), 'yyyy-MM-dd');
    if (e.value === null) {
      startDate = '';
    }
    this.changeStartDateSelection.emit({ selectedStartDate: startDate });
  }

}
