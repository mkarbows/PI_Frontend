import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA,
  SimpleChange
} from '@angular/core';

import { FullsizeHeaderComponent } from './fullsize-header.component';

// xdescribe('FullsizeHeaderComponent', () => {
//   let component: FullsizeHeaderComponent;
//   let fixture: ComponentFixture<FullsizeHeaderComponent>;
//   const pagingInputs = [
//     [
//       {
//         title: '20190104_102556',
//         type: 'photo',
//         url_endpoint: 'c28aa3e4e8c0123240b8fff60001193e'
//       },
//       {
//         title: '20190104_102513',
//         type: 'photo',
//         url_endpoint: 'bbab890b01169a13dee610faef00187e'
//       }
//     ],
//     [
//       {
//         title: '20190104_102612',
//         url_endpoint: '185148d9c9aaabc89077671a5df22f8e',
//         type: 'photo'
//       },
//       {
//         title: '20190104_102556',
//         url_endpoint: 'c28aa3e4e8c0123240b8fff60001193e',
//         type: 'photo'
//       },
//       {
//         title: '20190104_101609',
//         url_endpoint: 'f03f07016171f90100f800ff1fffe000',
//         type: 'photo'
//       },
//       {
//         title: '20190104_101544',
//         url_endpoint: '3f004f59796d0dfcff0700dea3c9fff0',
//         type: 'photo'
//       }
//     ],
//     1,
//     11
//   ];
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [FullsizeHeaderComponent],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(FullsizeHeaderComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   xdescribe('previous & next buttons', () => {
//     it('should disable the previous button if prevDisabled is true', () => {
//       const leftButton = fixture.debugElement.query(By.css('.left-button'));
//       const leftButtonElement = leftButton.nativeElement;
//       const tempInputs = [
//         [],
//         pagingInputs[1],
//         pagingInputs[2],
//         pagingInputs[3]
//       ];
//       component.ngOnChanges({
//         pagingInputs: new SimpleChange(null, tempInputs, false)
//       });
//       fixture.detectChanges();
//       expect(leftButtonElement.disabled).toBeTruthy();
//     });

//     it('should disable the next button if nextDisabled is true', () => {
//       const rightButton = fixture.debugElement.query(By.css('.right-button'));
//       const rightButtonElement = rightButton.nativeElement;
//       const tempInputs = [
//         [],
//         pagingInputs[1],
//         pagingInputs[2],
//         pagingInputs[3]
//       ];
//       component.ngOnChanges({
//         pagingInputs: new SimpleChange(null, tempInputs, false)
//       });
//       fixture.detectChanges();
//       expect(rightButtonElement.disabled).toBeTruthy();
//     });

//     it('should set the previous item endpoint', () => {
//       component.ngOnChanges({
//         pagingInputs: new SimpleChange(null, pagingInputs, false)
//       });
//       expect(component.previousItemEndpoint).toEqual(
//         pagingInputs[0][0].url_endpoint
//       );
//     });

//     it('should set the next item endpoint', () => {
//       component.ngOnChanges({
//         pagingInputs: new SimpleChange(null, pagingInputs, false)
//       });
//       expect(component.nextItemEndpoint).toEqual(
//         pagingInputs[0][1].url_endpoint
//       );
//     });
//   });

//   describe('ngOnChanges ', () => {
//     it('should have paging inputs undefined', () => {
//       fixture.detectChanges();
//       expect(component.pagingInputs).toBeUndefined();
//     });

//     it('should have paging inputs defined', () => {
//       component.pagingInputs = pagingInputs;
//       fixture.detectChanges();
//       expect(component.pagingInputs).toBeDefined();
//     });
//   });
// });
