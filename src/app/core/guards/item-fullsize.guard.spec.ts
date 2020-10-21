import { TestBed, async, inject } from '@angular/core/testing';

import { ItemFullsizeGuard } from './item-fullsize.guard';

xdescribe('ItemFullsizeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemFullsizeGuard]
    });
  });

  it('should ...', inject([ItemFullsizeGuard], (guard: ItemFullsizeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
