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
  selector: 'app-end-date-filter',
  templateUrl: './end-date-filter.component.html',
  styleUrls: ['./end-date-filter.component.css']
})
export class EndDateFilterComponent implements OnInit, OnChanges {

  @Input() selectedEndDate: string;
  @Input() selectedStartDate: string;
  @Output() changeEndDateSelection = new EventEmitter();

  datePipe: DatePipe = new DatePipe('en-US');
  displayEndDate: any;
  minDate = new Date(1960, 2, 22); // 03-22-1960
  maxDate = new Date(); // max date is the current date

  constructor() { }

  ngOnInit() {
    this.displayEndDate = this.maxDate;
    if (this.selectedEndDate) {
      this.displayEndDate = new Date(this.selectedEndDate.replace(/-/g, '\/'));
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedEndDate) {
      if (changes.selectedEndDate.currentValue === '') {
        this.displayEndDate = this.maxDate;
      }
    }
    if (changes.selectedStartDate) {
      if (changes.selectedStartDate.currentValue !== '') {
        this.minDate = new Date(this.selectedStartDate);
      }
    }
   }

   emitChangeEndDate(e) {
    this.displayEndDate = e.value;
    let endDate = this.datePipe.transform(new Date(e.value), 'yyyy-MM-dd');
    if (e.value === null) {
      endDate = '';
    }
    this.changeEndDateSelection.emit({ selectedEndDate: endDate });
  }

}
